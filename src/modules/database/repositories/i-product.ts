import {
  IProductCreateRepositoryParam,
  IProductCreateRepositoryRes,
  IProductGetRepositoryRes,
} from '@/modules/database/dtos/i-products-dto';

import { HttpResponse } from '@/shared/helpers';

export interface IProductRepository {
  get(id: number): Promise<HttpResponse<IProductGetRepositoryRes>>;
  has(id: number): Promise<boolean>;

  create(item: IProductCreateRepositoryParam): Promise<HttpResponse<IProductCreateRepositoryRes>>;
}
