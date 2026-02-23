import { NextFunction, Request, Response } from 'express';

import { app } from '@/shared/infra/http/app';

app.use((err: any, request: Request, response: Response, next: NextFunction) => {
  if (process.env.DEBUG) {
    console.log('app-errors.ts', JSON.stringify(err));
  }

  return response.status(err?.statusCode || 500).json({
    data: null,
    error: {
      name: err?.name || err?.error?.name || 'Internal server error',
      message: err?.message || err?.error?.message,
      stack: '',
    },
    statusCode: err?.statusCode || 500,
  });
});
