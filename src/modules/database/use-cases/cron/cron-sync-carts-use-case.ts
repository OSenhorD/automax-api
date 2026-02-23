import { inject, injectable } from 'tsyringe';

import { Result } from '@/interfaces/shared';

import { IStoreProvider } from '@/shared/container/providers/storeapi-provider';

import { IUserRepository } from '@/modules/database/repositories/i-user';
import { IProductRepository } from '@/modules/database/repositories/i-product';
import { ICartRepository } from '@/modules/database/repositories/i-cart';

import { CartCreateController } from '@/modules/database/use-cases/cart/create-controller';

@injectable()
export class CronSyncCartsUseCase {
  constructor(
    @inject('UserRepository')
    private readonly _userRepository: IUserRepository,
    @inject('ProductRepository')
    private readonly _productRepository: IProductRepository,
    @inject('CartRepository')
    private readonly _cartRepository: ICartRepository,
    @inject('IStoreApiProvider')
    private readonly _store: IStoreProvider
  ) {}

  execute = async (): Promise<Result<number>> => {
    console.log('[CRON]: Iniciando CronSyncCartsUseCase');

    const result = await this._store.getCarts();

    // Cria os usuários
    const uniqueUserIds = [...new Set(result.map((item) => item.userId))];
    for await (const userId of uniqueUserIds) {
      const has = await this._userRepository.has(userId);
      if (has) continue;

      await this._userRepository.create({
        id: userId,
      });
    }

    // Cria os produtos
    const uniqueProductIds = [
      ...new Set(result.flatMap((item) => item.products.map((p) => p.productId))),
    ];
    for await (const productId of uniqueProductIds) {
      const has = await this._productRepository.has(productId);
      if (has) continue;

      await this._productRepository.create({
        id: productId,
      });
    }

    for await (const cart of result) {
      const has = await this._cartRepository.has(cart.id);
      if (has) {
        await this._cartRepository.delete(cart.id);
      }

      await new CartCreateController().handle({
        id: cart.id,
        userId: cart.userId,
        products: cart.products,
      });
    }

    console.log('[CRON]: Finalizado CronSyncCartsUseCase');
    return { data: 0 };
  };
}
