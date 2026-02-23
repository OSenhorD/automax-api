import { Router } from 'express';

import database from '@/shared/infra/http/routes/database';

const router = Router();

router.use('/database', database);

export { router };
