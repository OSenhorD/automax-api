import { ICartProduct } from '@/modules/database/dtos/i-cart-products-dto';

interface ICart {
  id: number;
  userId: number;
  totalQuantity: number;
  createdAt: string;
}

export type ICartListRepositoryRes = ICart;
export type ICartListUseCaseRes = ICart;

export type ICartGetRepositoryRes = {
  id: number;
  userId: number;
  products: {
    id: number;
    productId: number;
    quantity: number;
  }[];
  createdAt: Date;
  totalQuantity: number;
};
export type ICartGetUseCaseRes = ICartGetRepositoryRes;

export type ICartCreateControllerParam = {
  id: number;
  userId: number;
  products: Omit<ICartProduct, 'id' | 'cartId'>[];
};
export type ICartCreateUseCaseParam = ICartCreateControllerParam;
export type ICartCreateRepositoryParam = ICartCreateUseCaseParam;
export type ICartCreateRepositoryRes = ICart;
export type ICartCreateUseCaseRes = ICart;
