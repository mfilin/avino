import { Taxons } from '../../api/database/models/Taxons';
import { IClientCatalog } from './client';
import { ISlugTree } from '../../api/core/utils/tree';

export interface IQueryProps {
  order: string;
  orderDesc: string;
}

export interface IPageProps {
  pages: Taxons[];
  topMenuItems: Taxons[];
  settings: {
    categories: IClientCatalog;
    popular_products: any; // TODO: Implement type
    dict: TProductDictionary;
  };
  queryProps: IQueryProps;
}

export interface IPageMenuItem {
  name: string;
  slug: string;
  title_menu: string;
}

export interface ISubCategoryItem {
  label: string;
  count: number;
}

export interface ISubCategory {
  label: string;
  count: number;
  hasMore?: boolean;
  items: Record<string, ISubCategoryItem>;
  tree?: Record<string, ISlugTree>;
  min?: number;
  max?: number;
}

export interface ICategoryTreeItem {
  label: string;
  count: number;
  items: { [key: string]: ISubCategory };
  brands: ISubCategory;
  countries: ISubCategory;
}

export interface IFilterAndMenuTreeItem {
  items: { [key: string]: ISubCategory };
  tree?: Record<string, ISlugTree>;
}

export type TCategoryTree = Record<string, ICategoryTreeItem>;

export interface IProductCatalog {
  catalog: TCategoryTree;
  filters: IFilterAndMenuTreeItem;
  menu: IFilterAndMenuTreeItem;
}

export interface ISettingsItem<T> {
  type: string;
  value: T;
}

export interface IProductPropItem {
  slug: string;
  value: string;
  sorted?: number;
}

export type TProductProperties = Record<string, IProductPropItem>;

export interface IProductMedia {
  id: number;
  disk: string;
  name: string;
  size: number;
  file_name: string;
  mime_type: string;
  collection_name: string;
  custom_properties: string;
  generated_conversions: string;
}

export type TProductMedia = Array<IProductMedia>;

export interface IProductJSONPropertiesDescriptior {
  model_id: number;
  json: TProductProperties;
}

export interface IJSONRowDescriptior<T> {
  model_id: number;
  json: T;
}

export interface IProductKey {
  catalog: string;
  addr: string;
  value: string;
  slug: string;
  label?: string;
}

export interface ICatalogConfigItem {
  source: string;
  slug: string;
  order: number;
  name: string;
  configuration: object;
}

export interface ICatalog {
  menu: ICatalogConfigItem[];
  catalog: ICatalogConfigItem[];
  filters: ICatalogConfigItem[];
}

export type TCatalog = { [key: string]: ICatalog };

export type TProductDictionary = Record<string, string>;

export type TCatalogType =
  | 'wine-all'
  | 'spirits'
  | 'mixology'
  | 'cognac-all'
  | 'champagne-and-sparkling-wines'
  | 'whisky'
  | 'vodka-all';

export interface ITaxonCountryTree {
  label: string;
  items: { [key: string]: ITaxonCountryTree };
}

export type TTaxonCountryTree = { [key: string]: ITaxonCountryTree };

export interface ITaxonTreeLevel {
  slug: string;
  taxonomy: string;
  label: string;
  childs: { [key: string]: ITaxonTreeLevel };
}

export type TTaxonsTreeRoot = { [key: string]: ITaxonTreeLevel };

export type ITaxonTreeMapItem = {
  slug: string;
  parent: string[];
  childs: string[];
  all_childs: string[];
};

export type TTaxonTreeMap = { [key: string]: ITaxonTreeMapItem };
