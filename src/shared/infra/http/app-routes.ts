import { app } from '@/shared/infra/http/app';

import { router } from '@/shared/infra/http/routes';

import { ensureParams } from '@/shared/infra/http/middlewares/ensure-params';

if (process.env.DEBUG) {
  app.use((request, response, next) => {
    console.log(`${request.method}: ${request.url}`);
    next();
  });
}

app.use('/api/v1', [ensureParams], router);
