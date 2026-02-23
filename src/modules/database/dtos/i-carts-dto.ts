import { ICartProduct } from '@/modules/database/dtos/i-cart-products-dto';

export interface ICart {
  id: number;
  userId: number;
  products: ICartProduct[];
}

export type ICartListControllerParam = ICart;
export type ICartListUseCaseParam = ICart;
export type ICartListRepositoryParam = ICart;
export type ICartListRepositoryRes = ICart;
export type ICartListUseCaseRes = ICart;
export type ICartListControllerRes = ICart;

export type ICartGetControllerParam = ICart;
export type ICartGetUseCaseParam = ICart;
export type ICartGetRepositoryParam = ICart;
export type ICartGetRepositoryRes = ICart;
export type ICartGetUseCaseRes = ICart;
export type ICartGetControllerRes = ICart;

export type ICartCreateControllerParam = {
  id: number;
  userId: number;
  products: Omit<ICartProduct, 'id' | 'cartId'>[];
};
export type ICartCreateUseCaseParam = ICartCreateControllerParam;
export type ICartCreateRepositoryParam = ICartCreateUseCaseParam;
export type ICartCreateRepositoryRes = ICart;
export type ICartCreateUseCaseRes = ICart;
export type ICartCreateControllerRes = ICart;
