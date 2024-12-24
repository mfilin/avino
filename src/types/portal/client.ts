export interface IClientCatalogCategoryItem {
  label: string;
  addr: string;
  count: number;
}

export interface IClientCatalogCategory {
  label: string;
  addr: string;
  count: number;
  hasMore?: boolean;
  items: { [key: string]: IClientCatalogCategoryItem };
}

export interface ICluentCatalogCategoryCountryItem {
  label: string;
  count: number;
}

export interface IClientCatalogCategoryCountry {
  count: number;
  items: { [key: string]: ICluentCatalogCategoryCountryItem };
}

export interface IClientCatalogCategoryBrandsItem {
  label: string;
  count: number;
}

export interface IClientCatalogCategoryBrands {
  count: number;
  items: { [key: string]: IClientCatalogCategoryBrandsItem };
}

export interface TClientCatalogItem {
  label: string;
  count: number;
  items: { [key: string]: IClientCatalogCategory };
  countries: { [key: string]: IClientCatalogCategoryCountry };
  brands: { [key: string]: IClientCatalogCategoryBrands };
}

// export type TClientCatalogDict = { [key: string]: TClientCatalogItem };

export interface IClientFiltersCatalogItem {
  label: string;
  count: number;
  parent?: string[]; // Client only type! Does not exists on server!
}

export interface IClientFiltersCatalogItemExtended
  extends IClientFiltersCatalogItem {
  slug: string;
}

export interface ISlugTree {
  label: string;
  count: number;
  slug?: string; // Client side type
  items: { [key: string]: ISlugTree };
}

export interface IClientFiltersCatalogItemsCatalog {
  label: string;
  cat: string;
  count: number;
  items: { [key: string]: IClientFiltersCatalogItem };
  tree?: Record<string, ISlugTree>;
  min?: number;
  max?: number;
}

export interface IClientFiltersCatalog {
  items: { [key: string]: IClientFiltersCatalogItemsCatalog };
}

export interface IMenuCatalogItem {
  label: string;
  count: number;
}

export interface IMenuCatalogItemCatalog {
  label: string;
  cat: string;
  count: number;
  items: { [key: string]: IMenuCatalogItem };
}

export interface IMenuCatalog {
  items: { [key: string]: IMenuCatalogItemCatalog };
}

export interface IClientCatalog {
  catalog: { [key: string]: TClientCatalogItem };
  menu: { [key: string]: IMenuCatalog };
  filters: { [key: string]: IClientFiltersCatalog };
}

export interface IPopularProductItem {
  id: number;
  name: string;
  slug: string;
  price: number;
  media: string[];
  subtitle: string;
}

export type TPopularProducts = { [key: string]: Array<IPopularProductItem> };

export type TOrderType = 'asc' | 'desc';
