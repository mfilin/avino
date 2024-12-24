import { Logger } from '@nestjs/common';
import {
  type ICatalog,
  type IProductKey,
  type IProductPropItem,
  TCatalog,
  TProductDictionary,
} from '../../types/portal/server';
import { bind } from 'bind-decorator';
import util from 'node:util';
import { ProductConfigGetter, TCatStats } from './product.config.getter';
import ProxyStruct from './utils/ProxyStruct';
import { DEFAULT_CONFIG_CATALOG_KEY } from './const';
import { avaliableKeysAsMap } from './utils';
import { ProductSTD } from '../database/class/ProductSTD';
import { ProductGroup } from '../database/class/ProductGroup';

type TIndexerFunction = (
  product: ProductSTD,
  root: IProductPropItem,
  sub: IProductPropItem,
  config: ICatalog,
  row: IProductKey,
) => void;

const NOT_FOUND_ROOT: IProductPropItem = {
  slug: '_NO_ROOT',
  value: '_NO_ROOT',
};

const NOT_FOUND_CATEGORY: IProductPropItem = {
  slug: '_NO_CATEGORY',
  value: '_NO_CATEGORY',
};

export class CategoryTreeIndex {
  private logger: Logger = new Logger(CategoryTreeIndex.name);
  private configGetters: Record<string | undefined, ProductConfigGetter> = {};
  private configGettersIndex = {
    [undefined as any]: '_default',
  };

  private indexer: Record<string | undefined, TIndexerFunction> = {
    catalog: this.processCatalog,
    [undefined as any]: this.processDefaultIndex,
  };
  private indexerKeys = avaliableKeysAsMap(this.indexer);

  private customTaxonIndexer: Record<string | undefined, TIndexerFunction> = {
    'product.price': this.processPriceIndex,
    // 'product.is_hit': this.processProductPropertyIndex,
    'product.is_hit': this.processProductHitPropertyIndex,
    [undefined as any]: this.processOtherPropertiesIndex,
  };
  private customTaxonIndexerKeys = avaliableKeysAsMap(this.customTaxonIndexer);

  public cache: any = new ProxyStruct();

  constructor(
    private readonly catalogConfig: TCatalog,
    private readonly productDictionary: TProductDictionary, // Тут справочник 'taxons.type' => 'Тип'
  ) {
    if (!this.catalogConfig[DEFAULT_CONFIG_CATALOG_KEY]) {
      throw new Error(
        `Default catalog indexer (key: ${DEFAULT_CONFIG_CATALOG_KEY}) not found in t_catalog_config`,
      );
    }
    Object.keys(this.catalogConfig).forEach((root) => {
      this.configGetters[root] = new ProductConfigGetter(
        this.catalogConfig[root],
      );
      this.configGettersIndex[root] = root;
    });

    this.configGetters[undefined as any] = new ProductConfigGetter(
      this.catalogConfig[DEFAULT_CONFIG_CATALOG_KEY],
    );
  }

  public process(groups: ProductGroup[]) {
    groups.forEach((group: ProductGroup) => {
      group.products.forEach((product: ProductSTD) => {
        try {
          const [root, sub] = this.getProductCategoryIndex(product);
          //if (!root || !sub) {
          if (!root) {
            this.logger.verbose(
              util.inspect({ root, sub }, { depth: null, colors: true }),
            );
            this.logger.error(`Product ${product.id} not indexed due to error`);
            return;
          }

          const config = this.catalogConfig[root.slug];

          this.processProduct(product, root, sub, config);
        } catch (error) {
          this.logger.verbose(
            `Process product ${group.name} -> ${product.id} failed`,
          );
          this.logger.error(error, error.stack);
        }
      });
    });

    // console.log(util.inspect(this.cache.menu.valueOf(), { depth: null, colors: true }));
  }

  private logCatalogIndexError(
    product: ProductSTD,
    root: IProductPropItem,
    sub: IProductPropItem,
  ) {
    const config = this.catalogConfig[root.slug];
    const catalogIndexes = config?.catalog.map(
      (cat) => `${cat.source}.${cat.slug}`,
    );
    const productDump = util.inspect(
      {
        taxons: product.taxons,
        properties: product.properties,
      },
      { depth: null, colors: true },
    );
    const message = `Product ${product.id} was not indexed in catalog ${
      root.slug
    }.${sub.slug} due to wrong taxon configuration [${catalogIndexes.join(
      ', ',
    )}] not found in`;
    this.logger.error(message, productDump);
  }

  private processProduct(
    product: ProductSTD,
    root: IProductPropItem,
    sub: IProductPropItem,
    config: ICatalog,
  ) {
    const [catalog, stats]: [IProductKey[], TCatStats] =
      this.configGetters[this.configGettersIndex[root.slug]]?.parse(product);

    if (
      !this.configGettersIndex[root.slug] &&
      root.slug !== NOT_FOUND_ROOT.slug
    ) {
      this.logger.warn(
        `Category ${root.slug} has no own config, using _default. Product: ${product.id}`,
      );
    }

    this.cache.catalog[root.slug].label = root.value;
    this.cache.catalog[root.slug].asNumber('count').increment(1);

    // Для некоторых товаров могут быть допущены ошибки в каталогизации, в частности
    // настройки индикатора могут не найти ключевое поле для товара, что приведёт к
    // наличию товара в каталоге, но отсутствию корректного адреса.
    // Эта ошибка в данном случае не исправляется, её нужно контролировать на
    // уровне админки.

    // Пример поломки: товар с кодом gancia-gancha не имеет поля taxons.category
    // по этой причине addr внутри группы у него не будет заполнен
    // ID продукта: 2197
    // if (sub.slug == 'gancia-gancha') {
    //   this.debugProduct(product);
    //   console.log(util.inspect({
    //     root: root.slug,
    //     sub: sub.slug,
    //     catalog
    //   }, { depth: null, colors: true }));
    // }

    for (const row of catalog) {
      // Here we will go to catalog indexer or default indexer (below)
      this.indexer[this.indexerKeys[row.catalog]](
        product,
        root,
        sub,
        config,
        row,
      );
    }
  }

  @bind
  private processDefaultIndex(
    product: ProductSTD,
    root: IProductPropItem,
    sub: IProductPropItem,
    config: ICatalog,
    row: IProductKey,
  ) {
    // Switch between different indexers
    // Made for to get custom indexers
    this.customTaxonIndexer[this.customTaxonIndexerKeys[row.addr]](
      product,
      root,
      sub,
      config,
      row,
    );
  }

  @bind
  private processPriceIndex(
    product: ProductSTD,
    root: IProductPropItem,
    sub: IProductPropItem,
    config: ICatalog,
    row: IProductKey,
  ) {
    // product.price
    const { catalog, addr, value, slug, label } = row;

    const destItem = this.cache[catalog][root.slug].items[addr];

    destItem.label = label;
    destItem.cat = addr;
    destItem.asNumber('count').increment(1);

    const valItem = destItem.items[value];

    valItem.label = value;
    valItem.asNumber('count').increment(1);

    const minmax = destItem.asNumber('_minmax');
    minmax.set(product.price);

    destItem.asNumber('min').set(minmax.min);
    destItem.asNumber('max').set(minmax.max);
  }

  @bind
  private processProductHitPropertyIndex(
    product: ProductSTD,
    root: IProductPropItem,
    sub: IProductPropItem,
    config: ICatalog,
    row: IProductKey,
  ) {
    const { catalog, addr, value, slug, label } = row;
    // is_hit indexer
    // TODO: index product.taxons.factory via is_hit flag
    this.cache[catalog][root.slug].items[addr].label = label;
    this.cache[catalog][root.slug].items[addr].cat = 'product.taxons';
    // this.cache[catalog][root.slug].items[addr].cat = addr;
    const count = this.cache[catalog][root.slug].items[addr]
      .asNumber('count')
      .increment(1)
      .valueOf();

    if (count < 10 && product.taxons?.factory) {
      const { slug: factorySlug, value: factoryValue } =
        product.taxons?.factory;
      this.cache[catalog][root.slug].items[addr].items[factorySlug].label =
        factoryValue;
      this.cache[catalog][root.slug].items[addr].items[factorySlug]
        .asNumber('count')
        .increment(1);
    }
  }

  @bind
  private processProductPropertyIndex(
    product: ProductSTD,
    root: IProductPropItem,
    sub: IProductPropItem,
    config: ICatalog,
    row: IProductKey,
  ) {
    // product.is_hit
    const { catalog, addr, value, slug, label } = row;
    // console.log(`this.cache[${catalog}][${root.slug}].items[${addr}]=${label}`);
    this.cache[catalog][root.slug].items[addr].label = label;
    this.cache[catalog][root.slug].items[addr].cat = addr;
    const count = this.cache[catalog][root.slug].items[addr]
      .asNumber('count')
      .increment(1)
      .valueOf();

    if (count < 10) {
      // console.log(util.inspect({
      //   product,
      // }, { depth: null, colors: true }));
      this.cache[catalog][root.slug].items[addr].items[product.slug].label =
        product.name;
      this.cache[catalog][root.slug].items[addr].items[product.slug].id =
        product.id;
    }
  }

  @bind
  private processOtherPropertiesIndex(
    product: ProductSTD,
    root: IProductPropItem,
    sub: IProductPropItem,
    config: ICatalog,
    row: IProductKey,
  ) {
    // all not custom properties will be passed here
    const { catalog, addr, value, slug } = row;

    this.cache[catalog][root.slug].items[addr].label =
      this.productDictionary[addr];
    this.cache[catalog][root.slug].items[addr].cat = addr;
    this.cache[catalog][root.slug].items[addr].asNumber('count').increment(1);
    this.cache[catalog][root.slug].items[addr].items[slug].label = value;
    this.cache[catalog][root.slug].items[addr].items[slug]
      .asNumber('count')
      .increment(1);
  }

  @bind
  private processCatalog(
    product: ProductSTD,
    root: IProductPropItem,
    sub: IProductPropItem,
    config: ICatalog,
    row: IProductKey,
  ) {
    const { catalog, addr, value, slug } = row;

    const brand: IProductPropItem = product.taxons.brand;
    const country: IProductPropItem = product.taxons.country;

    this.cache[catalog][root.slug].items[addr].label =
      this.productDictionary[addr];
    this.cache[catalog][root.slug].items[addr].asNumber('count').increment(1);
    this.cache[catalog][root.slug].items[addr].items[slug].label = value;
    this.cache[catalog][root.slug].items[addr].items[slug]
      .asNumber('count')
      .increment(1);

    if (country) {
      const countriesIndex = this.cache[catalog][root.slug].countries;
      countriesIndex.asNumber('count').increment(1);
      countriesIndex.items[country.slug].label = country.value;
      countriesIndex.items[country.slug].asNumber('count').increment(1);
    }

    if (brand) {
      const brandsIndex = this.cache[catalog][root.slug].brands;
      brandsIndex.asNumber('count').increment(1);
      brandsIndex.items[brand.slug].label = brand.value;
      brandsIndex.items[brand.slug].asNumber('count').increment(1);
    }
  }

  private getProductCategoryIndex(
    product: ProductSTD,
  ): [] | [IProductPropItem, IProductPropItem] {
    let { root, category } = product.taxons;

    if (!root) {
      root = NOT_FOUND_ROOT;
    }

    if (!category) {
      // If top category not found, let's index product by brand
      category = product.taxons.brand;
    }

    if (!category) {
      category = NOT_FOUND_CATEGORY;
      // Some products doesn't have subcategory... This is error
      // this.logger.error(
      //   `Product ${product.id} has no subcategory`,
      //   util.inspect(
      //     { id: product.id, taxons: product.taxons },
      //     { depth: null },
      //   ),
      // );

      // return [];
    }

    return [root, category];
  }

  private debugProduct(product: ProductSTD) {
    const [root, sub] = this.getProductCategoryIndex(product);
    console.log(
      util.inspect(
        {
          id: product.id,
          path: `${root.value} -> ${sub.value}`,
          taxons: product.taxons,
          properties: product.properties,
        },
        { depth: null, colors: true },
      ),
    );
  }
}
