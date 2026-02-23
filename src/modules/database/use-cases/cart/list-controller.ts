import { container } from 'tsyringe';

import { CartListUseCase } from '@/modules/database/use-cases/cart/list-use-case';

import { ISearch } from '@/interfaces/shared';

export class CartListController {
  handle = async ({ page, pageSize, params, search }: ISearch) => {
    const result = await container.resolve(CartListUseCase).execute({
      search,
      page,
      pageSize,
      params,
    });

    return result;
  };
}
