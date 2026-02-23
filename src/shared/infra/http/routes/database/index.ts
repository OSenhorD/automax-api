import { Router } from 'express';

import cart from '@/shared/infra/http/routes/database/cart';

const route = Router();

route.use('/cart', cart);

export default route;
