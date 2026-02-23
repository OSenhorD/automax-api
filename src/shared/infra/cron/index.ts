import { start as startCarts } from '@/shared/infra/cron/carts';

export function startCron() {
  startCarts();
}
