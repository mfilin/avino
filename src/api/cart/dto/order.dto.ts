import { CartProductDto } from './cart.product.dto';

export class OrderDto {
  name: string;
  phone: string;
  email: string;
  products: CartProductDto[];
}
