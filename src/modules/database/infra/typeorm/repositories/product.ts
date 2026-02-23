import { Product } from '@/modules/database/infra/typeorm/entities/products';

import {
  IProductGetRepositoryRes,
  IProductCreateRepositoryParam,
  IProductCreateRepositoryRes,
} from '@/modules/database/dtos/i-products-dto';

import { IProductRepository } from '@/modules/database/repositories/i-product';

import AppDataSource from '@/shared/infra/typeorm';

import { ok, noContent, serverError, HttpResponse } from '@/shared/helpers';

export class ProductRepository implements IProductRepository {
  private readonly _repository = AppDataSource.getRepository(Product);

  get = async (id: number): Promise<HttpResponse<IProductGetRepositoryRes>> => {
    try {
      let query = this._repository
        .createQueryBuilder('product')
        .select([
          `product.id as "id"`,
          //
        ])
        .where('product.id = :id', { id });

      const item = await query.getRawOne();
      if (typeof item === 'undefined') return noContent();

      return ok(item);
    } catch (error) {
      return serverError(error, 'ProductRepository get');
    }
  };

  has = async (id: number): Promise<boolean> => {
    return await this._repository.existsBy({ id });
  };

  create = async (
    item: IProductCreateRepositoryParam
  ): Promise<HttpResponse<IProductCreateRepositoryRes>> => {
    try {
      const newItem = this._repository.create({
        id: item?.id,
      });

      const result = await this._repository.save(newItem);

      return ok(result);
    } catch (error) {
      return serverError(error, 'ProductRepository create');
    }
  };
}
