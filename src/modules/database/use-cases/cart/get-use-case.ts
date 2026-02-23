import { inject, injectable } from 'tsyringe';

import { ICartRepository } from '@/modules/database/repositories/i-cart';
import { ICartGetUseCaseRes } from '@/modules/database/dtos/i-carts-dto';

import { HttpResponse } from '@/shared/helpers';

@injectable()
export class CartGetUseCase {
  constructor(
    @inject('CartRepository')
    private readonly _cartRepository: ICartRepository
  ) {}

  execute = async (id: number): Promise<HttpResponse<ICartGetUseCaseRes>> => {
    const item = await this._cartRepository.get(id);
    if (item.statusCode != 200) return item;

    return item;
  };
}
