import { container } from 'tsyringe';

import { ICartCreateControllerParam } from '@/modules/database/dtos/i-carts-dto';
import { CartCreateUseCase } from '@/modules/database/use-cases/cart/create-use-case';

export class CartCreateController {
  handle = async (body: ICartCreateControllerParam) => {
    const result = await container.resolve(CartCreateUseCase).execute({
      id: body.id,
      userId: body.userId,
      products: body.products,
    });

    return result;
  };
}
