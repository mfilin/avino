import { IProductSuggest } from '../api/types/product';

export function getSingleProductRef(product: IProductSuggest) {
  return `/${product.slug}`;
}
