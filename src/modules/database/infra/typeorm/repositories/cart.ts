import { Brackets } from 'typeorm';

import { Cart } from '@/modules/database/infra/typeorm/entities/carts';

import {
  ICartListRepositoryRes,
  ICartGetRepositoryRes,
  ICartCreateRepositoryParam,
  ICartCreateRepositoryRes,
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

  create = async (
    item: ICartCreateRepositoryParam
  ): Promise<HttpResponse<ICartCreateRepositoryRes>> => {
    try {
      const newItem = this._repository.create({
        id: item?.id,
        userId: item?.userId,
      });

      const result = await this._repository.save(newItem);

      return ok(result);
    } catch (error) {
      return serverError(error, 'CartRepository create');
    }
  };
}
