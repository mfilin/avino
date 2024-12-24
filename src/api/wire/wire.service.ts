import util from 'node:util';
import fs from 'fs';
import { Injectable, Logger } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { Product } from '../database/models/Product';
import { PortalService } from '../portal/portal.service';

import { ProductGroup } from '../database/class/ProductGroup';
import { CategoryTreeIndex } from '../core/category.tree.index';

import {
  IProductCatalog,
  ISubCategory,
  TProductDictionary,
  TTaxonCountryTree,
  TTaxonsTreeRoot,
} from '../../types/portal/server';
import { CatalogWalker } from '../core/utils/CatalogWalker';
import { countriesTreeWalk, ISlugTree } from '../core/utils/tree';
import { ProductGenerator } from '../../class/ProductGenerator';
import { ElasticUtilService } from '../elastic/elastic.util.service';
import { NextService } from '../next/next.service';
import { ElasticMigrationService } from '../elastic/elastic.migration.service';

@Injectable()
export class WireService {
  private readonly logger: Logger = new Logger(WireService.name);
  constructor(
    private readonly productService: ProductService,
    private readonly portalService: PortalService,
    private readonly elasticUtilService: ElasticUtilService,
    private readonly nextService: NextService,
    private readonly elasticMigrationService: ElasticMigrationService,
  ) {}

  async exportCatalogJson(destFile: string, bufSize: number = 2000) {
    this.logger.verbose('Start catalog to JSON exporting');
    const start = Date.now();
    let count = 0;
    let leadSeparator = '';

    const writableStream = fs.createWriteStream(destFile);
    try {
      writableStream.write('[\n');
      while (true) {
        const products: Product[] = await this.productService.getCrmProducts(
          bufSize,
          count,
        );

        const buf = [];

        products.forEach((product) => {
          buf.push(
            JSON.stringify({
              id: product.id,
              taxons: product.taxons,
              properties: product.properties,
            }),
          );
        });

        writableStream.write(leadSeparator + buf.join(',\n'));
        leadSeparator = ',';

        count += products.length;

        if (products.length < bufSize) {
          break;
        }
      }
      writableStream.write('\n]');
    } finally {
      writableStream.end();
    }

    this.logger.verbose(
      `Done, ${count} rows exported in ${Math.floor(
        (Date.now() - start) / 1000,
      )} sec.`,
    );
  }

  catalogPostProcessing(
    tree: IProductCatalog,
    taxonTreeRoot: TTaxonsTreeRoot,
    maxCategoryItems: number = 6,
  ): IProductCatalog {
    const catalogWalker = new CatalogWalker(tree);

    const countries: TTaxonCountryTree =
      this.portalService.extractCountries(taxonTreeRoot);

    const filtersCallback = (
      filterCategoryKey: string,
      taxon: string,
      catalog: ISubCategory,
    ) => {
      switch (taxon) {
        case 'taxons.country':
          const filteredCountries: Record<string, ISlugTree> =
            countriesTreeWalk(countries, catalog.items);

          catalog.tree = filteredCountries;

          break;
        case 'product.price':
          // Remove temporary properties
          const { _minmax, ...restCatalog } = catalog as ISubCategory & {
            _minmax: number;
          };
          return restCatalog;
      }
      return catalog;
    };

    const catalogCallback = (
      catalogKey: string,
      taxon: string,
      catalog: ISubCategory,
    ) => {
      const entries = Object.entries(catalog.items);
      // Slice large catalog to small
      if (entries.length > maxCategoryItems) {
        catalog.hasMore = true;
      }

      catalog.items = entries
        .filter((entry) => Boolean(entry[0]) && entry[0] !== '-') // Clear catalog empty labels
        .slice(0, maxCategoryItems)
        .reduce((acc, entry) => {
          acc[entry[0]] = entry[1];
          return acc;
        }, {});

      // if (taxon == 'taxons.country') {
      //   console.log('----------------------- out ----------------------');
      //   console.log(util.inspect(catalog, { depth: null, colors: true }));
      // }

      return catalog;
    };

    const processedTaxons =
      catalogWalker.walkThroughCatalogTaxons(catalogCallback);

    return catalogWalker.walkThroughFilterTaxons(
      filtersCallback,
      processedTaxons,
    );
  }

  async catalogExportDebug(bufSize: number = 2000, maxCount?: number) {
    let count = 0;

    const [tree, treeMap] = await this.portalService.getTaxonsTree();

    const catalogConfig = await this.portalService.loadCatalogConfig();
    const productDictionary: TProductDictionary =
      await this.portalService.loadProductDictionary();

    const productTree: CategoryTreeIndex = new CategoryTreeIndex(
      catalogConfig,
      productDictionary,
    );

    while (true) {
      const productGroups: ProductGroup[] =
        await this.productService.loadProductsJSON(bufSize, count);

      // Increment tree stats
      productTree.process(productGroups);

      count += productGroups.length;

      if (productGroups.length < bufSize) {
        break;
      }

      if (maxCount > 0 && count > maxCount) {
        break;
      }

      // TODO: Remove
      // break;
    }

    const outTree = this.catalogPostProcessing(
      productTree.cache.valueOf(),
      tree,
    );

    console.log(
      util.inspect(outTree, {
        depth: null,
        colors: true,
      }),
    );
  }

  async updateElasticCatalog(bufSize: number = 2000, maxCount?: number) {
    this.logger.verbose('Start catalog exporting');
    const start = Date.now();
    let count = 0;

    await this.elasticUtilService.prepareAllIndices();

    // TODO: Remove BEFORE RELEASE
    // if (Math.random() * 1000 > 0) {
    //   await this.portalService.mergeElasticIndices();
    //   return null;
    // }

    // await this.portalService.exportBrandsDictionary();
    await this.portalService.exportTreeDictionary('country');
    await this.portalService.exportTreeDictionary('brand');
    await this.portalService.exportTreeDictionary('factory');
    await this.portalService.exportTreeDictionary('importer');
    await this.portalService.exportTreeDictionary('category');
    await this.elasticMigrationService.migrate();

    // TODO: Remove BEFORE RELEASE
    // if (Math.random() * 1000 > 0) {
    //   await this.portalService.mergeElasticIndices();
    //   return null;
    // }

    const [tree, treeMap] =
      await this.portalService.updateElasticWithTaxonsTree();

    await this.portalService.updateElasticTaxonDescriptions();

    const catalogConfig = await this.portalService.loadCatalogConfig();
    const popularProductIDs: Record<string, number[]> =
      await this.portalService.loadPopularProductIDs();
    const popularProducts = await this.portalService.loadPopularProducts(
      popularProductIDs,
    );

    await this.portalService.updateElasticReverseAddrs();

    await this.portalService.updateElasticPopularProducts(popularProducts);

    const productDictionary: TProductDictionary =
      await this.portalService.loadProductDictionary();
    const productTree: CategoryTreeIndex = new CategoryTreeIndex(
      catalogConfig,
      productDictionary,
    );

    // console.log(util.inspect({
    //   catalogConfig
    // }, { depth: null, colors: true }));

    while (true) {
      // const products: Product[] = await this.productService.getCrmProducts(
      //   bufSize,
      //   count,
      // );
      const productGroups: ProductGroup[] =
        await this.productService.loadProductsJSON(bufSize, count);
      await this.productService.updateElasticProducts(productGroups);

      // Increment tree stats
      productTree.process(productGroups);

      count += productGroups.length;

      this.logger.verbose(
        `Uploaded ${productGroups.length} records, total uploaded: ${count}`,
      );

      if (productGroups.length < bufSize) {
        break;
      }

      if (maxCount > 0 && count > maxCount) {
        break;
      }

      // TODO: Remove
      // break;
    }

    const processedCache = this.catalogPostProcessing(
      productTree.cache.valueOf(),
      tree,
    );

    this.logger.debug(
      'Product catalog tree',
      util.inspect(processedCache, { depth: null, colors: true }),
    );

    // console.log(productTree.cache.valueOf());

    // console.log(util.inspect(productTree.cache.valueOf(), { depth: null, colors: true }));
    // this.logger.verbose(util.inspect(productTree.cache.valueOf(), { depth: null, colors: true }));

    await this.portalService.updateElasticCategories(processedCache);

    await this.portalService.updateElasticDictionaries(productDictionary);

    await this.portalService.mergeElasticIndices();

    // Now, when database has new changes, we need to clear old NEXT cache
    await this.nextService.callRevalidate();

    this.logger.verbose(
      `Done, ${count} rows exported in ${Math.floor(
        (Date.now() - start) / 1000,
      )} sec.`,
    );
  }

  async generateFakeProducts(bufSize: number = 10000, count: number) {
    const start = Date.now();
    const productGenerator = new ProductGenerator();

    let buf = [];
    for (let i = 0; i < count; i++) {
      buf.push(productGenerator.get(100000 + i));
      if (buf.length % bufSize === 0) {
        await this.productService.pushElasticProducts(buf);
        buf = [];
      }
    }

    if (buf.length > 0) {
      await this.productService.pushElasticProducts(buf);
    }

    await this.portalService.mergeElasticIndices();
    this.logger.verbose(
      `Done, ${count} rows exported in ${Math.floor(
        (Date.now() - start) / 1000,
      )} sec.`,
    );
  }
}
