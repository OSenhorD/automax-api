import { inject, injectable } from 'tsyringe';

import { ICartListUseCaseRes } from '@/modules/database/dtos/i-carts-dto';
import { ICartRepository } from '@/modules/database/repositories/i-cart';

import { HttpResponseList } from '@/shared/helpers';

import { ISearch } from '@/interfaces/shared';

@injectable()
export class CartListUseCase {
  constructor(
    @inject('CartRepository')
    private readonly _cartRepository: ICartRepository
  ) {}

  execute = async (page: ISearch): Promise<HttpResponseList<ICartListUseCaseRes[]>> => {
    const items = await this._cartRepository.list({
      search: page?.search,
      page: page?.page,
      pageSize: page?.pageSize,
      params: page?.params,
    });
    if (items.statusCode != 200) return items;

    return items;
  };
}
