export enum ECatalog {
  product = 'product',
  portal = 'portal',
  cart = 'cart',
  cache = 'cache',
}

export type TCatalog = keyof typeof ECatalog;

export type TRouteCallback = (...args: Array<string | number>) => string;

export interface ICatalogRestList {
  [key: string]: TRouteCallback;
}

export type TRoutesMap = Record<TCatalog, ICatalogRestList>;
