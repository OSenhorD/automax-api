import { NextFunction, Request, Response } from 'express';

import { badRequest } from '@/shared/helpers';

export const ensureId = async (request: Request, response: Response, next: NextFunction) => {
  const id = `${request.params?.id || ''}`;
  if (!id || isNaN(Number(id))) {
    throw badRequest(new Error('Parâmetro inválido'));
  }

  return next();
};
