import { container } from 'tsyringe';

import '@/shared/container/providers';

import { UserRepository } from '@/modules/database/infra/typeorm/repositories/user';
import { ProductRepository } from '@/modules/database/infra/typeorm/repositories/product';
import { CartRepository } from '@/modules/database/infra/typeorm/repositories/cart';

container.registerSingleton('UserRepository', UserRepository);
container.registerSingleton('ProductRepository', ProductRepository);
container.registerSingleton('CartRepository', CartRepository);
