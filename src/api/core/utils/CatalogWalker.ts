import {
  ICategoryTreeItem,
  IFilterAndMenuTreeItem,
  IProductCatalog,
  ISubCategory,
  ISubCategoryItem,
  TCategoryTree,
} from '../../../types/portal/server';

export class CatalogWalker {
  constructor(private readonly tree: IProductCatalog) {}

  public get catalog() {
    return this.tree.catalog;
  }

  public walkThroughCatalogTaxons(
    callback: (
      catalogKey: string,
      taxon: string,
      catalog: ISubCategory,
    ) => ISubCategory,
    outTree?: IProductCatalog,
  ) {
    outTree = outTree || {
      filters: { ...this.tree.filters },
      menu: { ...this.tree.menu },
      catalog: {} as TCategoryTree,
    };

    for (const catalogKey in this.tree.catalog) {
      const { items = {}, ...restCatalogProperties } =
        this.tree.catalog[catalogKey];

      outTree.catalog[catalogKey] = {
        ...restCatalogProperties,
        items: {} as ICategoryTreeItem['items'],
      } as ICategoryTreeItem;

      Object.keys(items).forEach((taxon) => {
        outTree.catalog[catalogKey].items[taxon] = callback(
          catalogKey,
          taxon,
          items[taxon],
        );
      });
    }

    return outTree;
  }

  public walkThroughFilterTaxons(
    callback: (
      filterCategoryKey: string,
      taxon: string,
      catalog: ISubCategory,
    ) => ISubCategory,
    outTree?: IProductCatalog,
  ) {
    outTree = outTree || {
      filters: {} as IFilterAndMenuTreeItem,
      menu: { ...this.tree.menu },
      catalog: { ...this.tree.catalog },
    };

    for (const filterCategoryKey in this.tree.filters) {
      const { items } = this.tree.filters[filterCategoryKey];

      outTree.filters[filterCategoryKey] = {
        items: {} as ISubCategory,
      };

      Object.keys(items).forEach((taxon) => {
        outTree.filters[filterCategoryKey].items[taxon] = callback(
          filterCategoryKey,
          taxon,
          items[taxon],
        );
      });
    }

    return outTree;
  }
}
