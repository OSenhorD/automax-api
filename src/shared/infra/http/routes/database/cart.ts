import { Request, Response, Router } from 'express';

import { ensureId } from '@/shared/infra/http/middlewares/ensure-id';

import { IParams } from '@/interfaces/shared';

import { CategoryGetController } from '@/modules/database/use-cases/cart/get-controller';
import { CartListController } from '@/modules/database/use-cases/cart/list-controller';

const category = Router();

category.get('/:id', [ensureId], async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await new CategoryGetController().handle(Number(id));

  return res.status(result.statusCode).json(result);
});

category.get('/', async (req: Request, res: Response) => {
  const { search, page, pageSize } = req.query as IParams;

  const result = await new CartListController().handle({
    search: search as string,
    page: Number(page || 0),
    pageSize: Number(pageSize || 15),
    params: req.query as IParams,
  });

  return res.status(result.statusCode).json(result);
});

export default category;
