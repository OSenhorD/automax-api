import {
  ICartGetRepositoryRes,
  ICartListRepositoryRes,
  ICartCreateRepositoryParam,
  ICartCreateRepositoryRes,
} from '@/modules/database/dtos/i-carts-dto';

import { HttpResponse, HttpResponseList } from '@/shared/helpers';

import { ISearch } from '@/interfaces/shared';

export interface ICartRepository {
  list(data: ISearch): Promise<HttpResponseList<ICartListRepositoryRes[]>>;
  get(id: number): Promise<HttpResponse<ICartGetRepositoryRes>>;

  create(item: ICartCreateRepositoryParam): Promise<HttpResponse<ICartCreateRepositoryRes>>;
}
