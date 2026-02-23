import * as cron from 'node-cron';

import { CronSyncCartsController } from '@/modules/database/use-cases/cron/cron-sync-carts-controller';

export const start = () => {
  // new CronSyncCartsController().handle();

  // Buscar registros da API
  cron.schedule('0 * * * *', async () => {
    new CronSyncCartsController().handle();
  });
};
