import { container } from 'tsyringe';

import '@/shared/container/providers';

import { UserRepository } from '@/modules/database/infra/typeorm/repositories/user';

container.registerSingleton('UserRepository', UserRepository);
