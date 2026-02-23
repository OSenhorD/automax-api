import { inject, injectable } from 'tsyringe';

import { Result } from '@/interfaces/shared';

import { IStoreProvider } from '@/shared/container/providers/storeapi-provider';

import { IUserRepository } from '@/modules/database/repositories/i-user';
import { IProductRepository } from '@/modules/database/repositories/i-product';

@injectable()
export class CronSyncCartsUseCase {
  constructor(
    @inject('UserRepository')
    private readonly _userRepository: IUserRepository,
    @inject('ProductRepository')
    private readonly _productRepository: IProductRepository,
    @inject('IStoreApiProvider')
    private readonly _store: IStoreProvider
  ) {}

  execute = async (): Promise<Result<number>> => {
    console.log('[CRON]: Iniciando CronSyncCartsUseCase');

    const result = await this._store.getCarts();

    // Cria os usuários
    const uniqueUserIds = [...new Set(result.map((item) => item.userId))];
    for await (const userId of uniqueUserIds) {
      const item = await this._userRepository.get(userId);
      if (item.data?.id) continue;

      await this._userRepository.create({
        id: userId,
      });
    }

    // Cria os produtos
    const uniqueProductIds = [
      ...new Set(result.flatMap((item) => item.products.map((p) => p.productId))),
    ];
    for await (const productId of uniqueProductIds) {
      const item = await this._productRepository.get(productId);
      if (item.data?.id) continue;

      await this._productRepository.create({
        id: productId,
      });
    }

    console.log('[CRON]: Finalizado CronSyncCartsUseCase');
    return { data: 0 };
  };
}
