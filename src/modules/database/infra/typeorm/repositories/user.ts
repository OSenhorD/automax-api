import { User } from '@/modules/database/infra/typeorm/entities/users';

import {
  IUserGetRepositoryRes,
  IUserCreateRepositoryParam,
  IUserCreateRepositoryRes,
} from '@/modules/database/dtos/i-users-dto';

import { IUserRepository } from '@/modules/database/repositories/i-user';

import AppDataSource from '@/shared/infra/typeorm';

import { ok, noContent, serverError, HttpResponse } from '@/shared/helpers';

export class UserRepository implements IUserRepository {
  private readonly _repository = AppDataSource.getRepository(User);

  get = async (id: number): Promise<HttpResponse<IUserGetRepositoryRes>> => {
    try {
      let query = this._repository
        .createQueryBuilder('user')
        .select([
          `user.id as "id"`,
          //
        ])
        .where('user.id = :id', { id });

      const item = await query.getRawOne();
      if (typeof item === 'undefined') return noContent();

      return ok(item);
    } catch (error) {
      return serverError(error, 'UserRepository get');
    }
  };

  has = async (id: number): Promise<boolean> => {
    return await this._repository.existsBy({ id });
  };

  create = async (
    item: IUserCreateRepositoryParam
  ): Promise<HttpResponse<IUserCreateRepositoryRes>> => {
    try {
      const newItem = this._repository.create({
        id: item?.id,
      });

      const result = await this._repository.save(newItem);

      return ok(result);
    } catch (error) {
      return serverError(error, 'UserRepository create');
    }
  };
}
