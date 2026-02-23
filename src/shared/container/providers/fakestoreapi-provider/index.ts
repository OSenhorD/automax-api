import { container } from 'tsyringe';

import { FakeStoreApiProvider } from '@/shared/container/providers/fakestoreapi-provider/implementations/fakestoreapi.provider';

type StoreCartProducts = {
  productId: number;
  quantity: number;
};

export type StoreCarts = {
  id: number;
  userId: number;
  date: string;
  products: StoreCartProducts[];
};

export type IStoreProvider = {
  getCarts: () => Promise<StoreCarts[]>;
};

type Provider = {
  fakestoreapi: typeof FakeStoreApiProvider;
};

const providers = {
  fakestoreapi: container.resolve(FakeStoreApiProvider),
};

const provider = (process.env.PROVIDER_STORE_API || 'fakestoreapi') as keyof Provider;

container.registerInstance<IStoreProvider>('fakestoreapi', providers[provider]);
