import { container } from 'tsyringe';

import { CartGetUseCase } from '@/modules/database/use-cases/cart/get-use-case';

export class CategoryGetController {
  handle = async (id: number) => {
    const result = await container.resolve(CartGetUseCase).execute(id);

    return result;
  };
}
