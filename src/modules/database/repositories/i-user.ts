import {
  IUserCreateRepositoryParam,
  IUserCreateRepositoryRes,
  IUserGetRepositoryRes,
} from '@/modules/database/dtos/i-users-dto';

import { HttpResponse } from '@/shared/helpers';

export interface IUserRepository {
  get(id: number): Promise<HttpResponse<IUserGetRepositoryRes>>;
  has(id: number): Promise<boolean>;

  create(item: IUserCreateRepositoryParam): Promise<HttpResponse<IUserCreateRepositoryRes>>;
}
