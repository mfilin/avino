import { ProductGroup } from '../../database/class/ProductGroup';

export class QueryProductResultDto {
  total: number;
  page: number;
  items: ProductGroup[];
}
