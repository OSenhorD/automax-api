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

import { getValidParams } from '@/utils/utils';

import { insertWhereParams } from '@/utils/typeorm-utils';

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
    const validParams = getValidParams(params);

    try {
      let query = this._repository.createQueryBuilder('cart').select([
        `cart.id as "id"`,
        `cart.userId as "userId"`,
        `cart.createdAt as "createdAt"`,
        //
      ]);

      query = insertWhereParams(query, validParams);

      if (search) {
        query = query.andWhere(
          new Brackets((qb) => {
            qb.where('CAST(cart.userId AS VARCHAR) ilike :search', { search: `%${search}%` });
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
      let query = this._repository
        .createQueryBuilder('cart')
        .select([
          `cart.id as "id"`,
          `cart.userId as "userId"`,
          `cart.createdAt as "createdAt"`,
          //
        ])
        .where('cart.id = :id', { id });

      const item = await query.getRawOne();
      if (typeof item === 'undefined') return noContent();

      return ok(item);
    } catch (error) {
      return serverError(error, 'CartRepository get');
    }
  };

  delete = async (id: number): Promise<HttpResponse> => {
    try {
      await this._repository.delete(id);

      return ok();
    } catch (error) {
      return serverError(error, 'CartRepository delete');
    }
  };

  create = async (item: ICartCreateRepositoryParam): Promise<HttpResponse> => {
    try {
      await AppDataSource.transaction(async (trx) => {
        const cart = trx.getRepository(Cart);
        const cartProduct = trx.getRepository(CartProduct);

        const result = await cart.save(
          cart.create({
            id: item.id,
            userId: item.userId,
          })
        );

        const products = item.products.map((prod) => ({
          ...prod,
          cartId: result.id,
        }));

        await cartProduct.save(cartProduct.create(products));
      });

      return ok();
    } catch (error) {
      return serverError(error, 'CartRepository create');
    }
  };
}
