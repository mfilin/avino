import { IProduct } from './product';

export interface ICartProduct {
  id: IProduct['id'];
  sku: IProduct['sku'];
  slug: IProduct['slug'];
  count: number;
}

export interface ICartRequestFullForm {
  email: string;
  name: string;
  phone: string;
  products: ICartProduct[];
}

export interface ICartRequestShortForm {
  phone: string;
  name: string;
}
