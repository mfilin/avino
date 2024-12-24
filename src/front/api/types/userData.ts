import { IProduct } from './product';

export interface IUserDataStore {
  favorite: IProduct[];
  comparison: IProduct[];
  cart: IProduct[];
  removedFromCart: IProduct[];
  lastAddedToCart?: IProduct;
  order: {
    discount: number;
    codeDiscount: number;
    products: IProduct[];
  } | null;
  orders: { orderId: number; products: IProduct[] }[];
  adultConfirmed: boolean;
}
