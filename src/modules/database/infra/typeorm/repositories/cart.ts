import { Brackets } from 'typeorm';

import { Cart } from '@/modules/database/infra/typeorm/entities/carts';

import {
  ICartListRepositoryRes,
  ICartGetRepositoryRes,
  ICartCreateRepositoryParam,
} from '@/modules/database/dtos/i-carts-dto';

import { ICartRepository } from '@/modules/database/repositories/i-cart';

import AppDataSource from '@/shared/infra/typeorm';

import {
  ok,
  okList,
  noContent,
  serverError,
  serverErrorList,
  HttpResponse,
  HttpResponseList,
} from '@/shared/helpers';

import { ISearch } from '@/interfaces/shared';

import { CartProduct } from '@/modules/database/infra/typeorm/entities/cart_products';

export class CartRepository implements ICartRepository {
  private readonly _repository = AppDataSource.getRepository(Cart);

  list = async ({
    search,
    page,
    pageSize,
    params,
  }: ISearch): Promise<HttpResponseList<ICartListRepositoryRes[]>> => {
    try {
      let query = this._repository
        .createQueryBuilder('cart')
        .select([
          `cart.id as "id"`,
          `cart.user.id as "userId"`,
          'COALESCE(SUM(cartProduct.quantity), 0) as totalQuantity',
          `cart.createdAt as "createdAt"`,
        ])
        .leftJoin('cart.items', 'cartProduct')
        .groupBy('cart.id');

      if (search) {
        query = query.andWhere(
          new Brackets((qb) => {
            qb.where('CAST(LOWER(cart.user.id) AS VARCHAR) like :search', {
              search: `%${search.toLowerCase()}%`,
            });
          })
        );
      }

      const count = await query.getCount();

      if (!params?.noPagination) {
        query = query.offset(pageSize * page).limit(pageSize);
      }

      const items = await query.getRawMany();
      return okList(items, count);
    } catch (error) {
      return serverErrorList(error, 'CartRepository list');
    }
  };

  get = async (id: number): Promise<HttpResponse<ICartGetRepositoryRes>> => {
    try {
      const items = await this._repository.find({
        where: { id },
        relations: {
          user: true,
          items: {
            product: true,
          },
        },
      });
      if (typeof items === 'undefined' || items.length === 0) return noContent();

      const item = items[0];
      const data = {
        id: item.id,
        userId: item.user?.id,
        products: item.items.map((i) => ({
          id: i.id,
          productId: i.product?.id,
          quantity: i.quantity,
        })),
        createdAt: item.createdAt,
        totalQuantity: item.items.map((i) => i.quantity).reduce((a, b) => a + b, 0),
      };
      return ok(data);
    } catch (error) {
      return serverError(error, 'CartRepository get');
    }
  };

  has = async (id: number): Promise<boolean> => {
    return await this._repository.existsBy({ id });
  };

  delete = async (id: number): Promise<HttpResponse> => {
    try {
      await this._repository.delete(id);

      return ok();
    } catch (error) {
      return serverError(error, 'CartRepository delete');
    }
  };

  create = async (body: ICartCreateRepositoryParam): Promise<HttpResponse> => {
    try {
      await AppDataSource.transaction(async (trx) => {
        const cart = trx.getRepository(Cart);
        const cartProduct = trx.getRepository(CartProduct);

        const newItem = await cart.save(
          cart.create({
            id: body.id,
            user: { id: body.userId },
          })
        );

        await cartProduct.save(
          cartProduct.create(
            body.products.map((p) => ({
              cart: { id: newItem.id },
              quantity: p.quantity,
              product: { id: p.productId },
            }))
          )
        );
      });

      /*
      const newItem = this._repository.create({
        id: body.id,
        user: { id: body.userId },
        items: body.products.map((p) => ({
          quantity: p.quantity,
          productId: p.productId,
        })),
      });
      await this._repository.save(newItem);
      */

      return ok();
    } catch (error) {
      return serverError(error, 'CartRepository create');
    }
  };
}
