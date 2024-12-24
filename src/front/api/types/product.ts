export interface IProductTaxon {
  slug: string;
  value: string;
}

export interface IProductSuggestTaxons {
  category: IProductTaxon;
  country?: IProductTaxon;
}

export interface IProductSuggest {
  id: number;
  name_ru: string[];
  name_en?: string[];
  name: string[];
  slug: string;
  sku: string;
  price: number;
  media: IProductMedia[];
  taxons: IProductSuggestTaxons;
}

export interface IProductSuggestSlot {
  id: string | number;
  item: IProductSuggest;
  score: number;
}

export interface IProductMedia {
  disk: string;
  id: number;
  file_name: string;
  mime_type: string;
}

export interface IProductTaxon {
  slug: string;
  value: string;
}

export interface IProductProperty {
  slug: string;
  value: string;
  sorted: number;
}

export interface IProduct {
  id: number;
  name: string;
  slug: string;
  media: IProductMedia[];
  price: number;
  is_hit: number;
  is_new: number;
  in_stock: number;
  count_in_cart?: number;
  sku: string;
  sku2: string;
  taxons: { [key: string]: IProductTaxon };
  name_en: string;
  name_ru: string;
  discount?: number;
  properties: { [key: string]: IProductProperty[] };
  in_comparison?: boolean;
  in_favorite?: boolean;
  smack_text: string;
  aroma_text: string;
  color_text: string;
  food_text: string;
  description: string;
}

export interface IProductGroup {
  name: string;
  products: IProduct[];
}

export interface ILoadProductOptions {
  page?: number | string;
  order?: string;
  orderDesc?: string;
  size?: number;
}
