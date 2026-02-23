import { inject, injectable } from 'tsyringe';

import { ICategoryRepository } from '@/modules/database/repositories/i-category';
import { Result } from '@/interfaces/shared';

@injectable()
export class CronSyncCartsUseCase {
  constructor(
    @inject('CategoryRepository')
    private readonly _repository: ICategoryRepository
  ) {}

  execute = async (): Promise<Result<number>> => {
    // const result = await this._repository.closePublishedExpired();
    // if (result?.error) {
    //   return result;
    // }

    return { data: 0 };
  };
}
