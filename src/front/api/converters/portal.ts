import {
  IClientCatalog,
  IClientFiltersCatalog,
  IClientFiltersCatalogItemsCatalog,
} from '../../../types/portal/client';

/**
 * Convert server side response to client by extracting some date from
 * base response object
 *
 * 1. Extract parent addresses for each slug in countries (fast navigation inside
 * render components)
 *
 * @param {IClientCatalog["filters"]} filters
 * @return {IClientCatalog["filters"]}
 */
export function extractTreeData(
  filters: IClientCatalog['filters'],
): IClientCatalog['filters'] {
  const drillDown = (
    tree: IClientFiltersCatalogItemsCatalog['tree'],
    categoryItems: IClientFiltersCatalogItemsCatalog['items'],
    parent: Set<string> = new Set(),
  ) => {
    for (const slug of Object.keys(tree)) {
      // Why if? Due to tree may contain full region address (from region to country),
      // but list of slugs can contain only regions (without countries)
      if (categoryItems.hasOwnProperty(slug)) {
        // if (slug === 'kolchagua') {
        //   console.log({
        //     slug,
        //     parent,
        //   });
        // }
        // Output slugs should be unique, for to make different ways to
        // locate slug in tree (due to slugs any time is not unique...)
        categoryItems[slug].parent = Array.from(
          new Set([...(categoryItems[slug].parent || []), ...parent]),
        );
      }
      drillDown(
        tree[slug].items,
        categoryItems,
        new Set([...Array.from(parent), slug]),
      );
    }
  };

  Object.keys(filters).forEach((key) => {
    const topItems: IClientFiltersCatalog['items'] = filters[key].items;
    Object.keys(topItems).forEach((addr) => {
      const addrBlock: IClientFiltersCatalogItemsCatalog = topItems[addr];
      if (addrBlock.tree) {
        const { tree, items } = addrBlock;
        drillDown(tree, items);
      }
    });
  });

  return filters;
}
