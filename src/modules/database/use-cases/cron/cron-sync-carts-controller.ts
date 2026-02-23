import { container } from 'tsyringe';

import { CronSyncCartsUseCase } from '@/modules/database/use-cases/cron/cron-sync-carts-use-case';

export class CronSyncCartsController {
  handle = async () => {
    const result = await container.resolve(CronSyncCartsUseCase).execute();
    return result;
  };
}
