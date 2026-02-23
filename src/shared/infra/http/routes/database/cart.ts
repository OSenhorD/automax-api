import { Request, Response, Router } from 'express';

import { CategoryGetController } from '@/modules/database/use-cases/cart/get-controller';
// import { CategoryListController } from '@/modules/database/use-cases/cart/list-controller';

import { ensureId } from '@/shared/infra/http/middlewares/ensure-id';

const category = Router();

category.get('/:id', [ensureId], async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await new CategoryGetController().handle(Number(id));

  return res.status(result.statusCode).json(result);
});

// category.get('/', new CategoryListController().handle);

export default category;
