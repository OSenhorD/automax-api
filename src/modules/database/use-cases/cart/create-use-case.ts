import { inject, injectable } from 'tsyringe';

import { ICartRepository } from '@/modules/database/repositories/i-cart';

import {
  ICartCreateUseCaseParam,
  ICartCreateUseCaseRes,
} from '@/modules/database/dtos/i-carts-dto';

import { HttpResponse } from '@/shared/helpers';

@injectable()
export class CartCreateUseCase {
  constructor(
    @inject('CartRepository')
    private readonly _repository: ICartRepository
  ) {}

  execute = async (body: ICartCreateUseCaseParam): Promise<HttpResponse<ICartCreateUseCaseRes>> => {
    const newItem = await this._repository.create({ ...body });
    if (newItem.statusCode != 200) return newItem;

    return newItem;
  };
}
