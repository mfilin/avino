import {
  ICatalog,
  ICatalogConfigItem,
  IProductKey,
} from '../../types/portal/server';
import { ProductSTD } from '../database/class/ProductSTD';
import { arrayQntSearchIndexer } from './utils';

import util from 'node:util';

// type TProductGetter = (product: Product) => void;
// type TStackAccumulator = Record<string, Array<IProductKey>>;
type TStackAccumulator = Array<IProductKey>;
export type TCatStats = Record<string, number>;

export class ProductConfigGetter {
  private commandsStack: Array<
    (
      acc: TStackAccumulator,
      product: ProductSTD,
      stats: Record<string, number>,
    ) => void
  > = [];
  private statsTemplate: TCatStats = {};

  constructor(private readonly catalogConfig: ICatalog) {
    Object.keys(catalogConfig).forEach((cat: string) => {
      (catalogConfig[cat] as Array<ICatalogConfigItem>)
        .sort((a: ICatalogConfigItem, b: ICatalogConfigItem) => {
          if (a.order < b.order) {
            return -1;
          }
        })
        .forEach((item: ICatalogConfigItem) => {
          const addr = `${item.source}.${item.slug}`;
          const catalog = cat;

          this.statsTemplate[catalog] = 0;

          switch (item.source) {
            case 'product':
              this.productGetter(catalog, addr, item);
              break;
            case 'properties':
              this.propertyGetter(catalog, addr, item);
              break;
            default:
              this.defaultGetter(catalog, addr, item);
          }
        });
    });
  }

  private productGetter(
    catalog: string,
    addr: string,
    item: ICatalogConfigItem,
  ) {
    switch (item.slug) {
      case 'price':
        const indexer = arrayQntSearchIndexer(
          item.configuration['price_steps'],
          1000,
          undefined,
        );
        this.commandsStack.push(
          (acc: TStackAccumulator, product: ProductSTD, stats: TCatStats) => {
            stats[catalog] += 1;
            acc.push({
              catalog,
              addr,
              value: indexer(product[item.slug]),
              slug: item.slug,
              label: item.name,
            });
          },
        );
        break;
      case 'is_hit':
        this.commandsStack.push(
          (acc: TStackAccumulator, product: ProductSTD, stats: TCatStats) => {
            stats[catalog] += 1;

            // console.log(util.inspect({
            //   catalog,
            //   addr,
            //   value: product.name,
            //   slug: product.slug,
            //   label: item.name,
            // }, { depth: null, colors: true }));

            acc.push({
              catalog,
              addr,
              value: product.name,
              slug: product.slug,
              label: item.name,
            });
          },
        );
        // console.log(item);
        break;
      default:
        this.commandsStack.push(
          (acc: TStackAccumulator, product: ProductSTD, stats: TCatStats) => {
            stats[catalog] += 1;
            acc.push({
              catalog,
              addr,
              value: product[item.slug],
              slug: item.slug,
            });
          },
        );
    }
  }

  private propertyGetter(
    catalog: string,
    addr: string,
    item: ICatalogConfigItem,
  ) {
    this.commandsStack.push(
      (acc: TStackAccumulator, product: ProductSTD, stats: TCatStats) => {
        // console.log('[propertyGetter]', `[addr: ${addr}]`, `[item.source: ${item.source}] [item.slug: ${item.slug}]`);

        product[item.source][item.slug]?.forEach((property) => {
          stats[catalog] += 1;
          // console.log(` >   >   >   >   [addr:${addr}] [slug:${property.value_slug}]`, { property });
          acc.push({
            catalog,
            addr,
            value: property.value,
            slug: property.slug,
          });
        });
      },
    );
  }

  private defaultGetter(
    catalog: string,
    addr: string,
    item: ICatalogConfigItem,
  ) {
    this.commandsStack.push(
      (acc: TStackAccumulator, product: ProductSTD, stats: TCatStats) => {
        // console.log([item.source, item.slug]);
        const row = product[item.source][item.slug];
        if (row) {
          stats[catalog] += 1;
          acc.push({
            catalog,
            addr,
            value: row.value,
            slug: row.slug,
          });
        }
      },
    );
  }

  /**
   * Returns array of Product configuration rows (taxons and properties) and
   * counted statistics (how many rows counted for each category)
   *
   * @param {Product} product
   * @return {[IProductKey[] , Record<string, number>]}
   */
  public parse(product: ProductSTD): [IProductKey[], Record<string, number>] {
    const acc: TStackAccumulator = [];
    const stats: TCatStats = { ...this.statsTemplate };
    this.commandsStack.forEach((callBack) => {
      callBack(acc, product, stats);
    });
    return [acc, stats];
  }

  public parseDemo(product: ProductSTD) {
    return {
      catalog: [product.properties['ptype']],
      filters: [
        product.properties['age'],
        product.properties['ptype'],
        product.taxons['brand'],
        product.taxons['country'],
      ],
      menu: [
        product.is_hit,
        product.properties.pack,
        product.properties.ptype,
        product.taxons.category,
        product.taxons.country,
      ],
    };
  }
}
