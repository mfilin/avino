import { ProductMediaDto } from './product.media.dto';
import { ProductTaxonDto } from './product.taxon.dto';
import { ProductPropertyDto } from './product.property.dto';

export class ProductDto {
  id: string;
  state: string;
  name: string;
  bpl: number;
  sku: string;
  sku2: string;
  sku3: string;
  slug: string;
  price: number;
  stock: number;
  dprice: number;
  is_hit: number;
  is_new: number;
  name_en: string;
  name_ru: string;
  discount: number;
  in_stock: number;
  rf_price: number;
  food_text: string;
  aroma_text: string;
  color_text: string;
  is_quanted: number;
  reqcounter: number;
  smack_text: string;
  brand_price: string;
  description: string;
  factory_price: string;
  media: ProductMediaDto[];
  taxons: Record<string, ProductTaxonDto>;
  properties: Record<string, ProductPropertyDto[]>;
}
