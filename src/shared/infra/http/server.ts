import { createServer } from 'http';

import { app } from '@/shared/infra/http/app';
import '@/shared/infra/http/app-routes';
import '@/shared/infra/http/app-errors';
import { startCron } from '@/shared/infra/cron';

const server = createServer(app);

const port = Number(process.env.PORT || 3333);
server.listen(port, () => {
  console.log(`Server is running in port ${port}!`);

  setTimeout(() => {
    startCron();
  }, 1000 * 5);
});
