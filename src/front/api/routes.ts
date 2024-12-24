import { TRoutesMap } from './types/routes';

export const routesMap: TRoutesMap = {
  product: {
    suggest: () => '/product/suggest',
    load: () => `/product/load`,
    search: () => `/product/search`,
    loadGroupForProduct: (id: number) => `/product/item/${id}`,
  },
  portal: {
    loadStatic: () => `/portal/portal-static`,
    decodeSlug: () => `/portal/decode-slug`,
    decodeTaxons: () => `/portal/decode-taxons`,
  },
  cart: {
    fullForm: () => `/cart/full-form`,
    shortForm: () => `/cart/short-form`,
  },
  cache: {
    status: () => `/cache/status`,
  },
};
