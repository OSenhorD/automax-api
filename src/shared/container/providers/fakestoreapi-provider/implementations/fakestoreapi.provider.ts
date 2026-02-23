import axios from 'axios';

import { StoreCarts, IStoreProvider } from '@/shared/container/providers/fakestoreapi-provider';

type FakeStoreApiCartProducts = {
  productId: number;
  quantity: number;
};

type FakeStoreApiCarts = {
  id: number;
  userId: number;
  date: string;
  products: FakeStoreApiCartProducts[];
};

export class FakeStoreApiProvider implements IStoreProvider {
  getCarts = async (): Promise<StoreCarts[]> => {
    try {
      const urlCep = `https://fakestoreapi.com/carts`;
      const { data } = await axios.get<FakeStoreApiCarts[]>(urlCep);
      if (!data) {
        throw new Error('Erro ao consultar a API');
      }

      return data;
    } catch (error) {
      console.log(error, `FakeStoreApiProvider getCarts`);
      return [];
    }
  };
}
