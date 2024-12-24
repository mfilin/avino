import util from 'node:util';
import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import {
  SearchHit,
  SearchTotalHits,
} from '@elastic/elasticsearch/lib/api/types';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { Taxonomies } from '../database/models/Taxonomies';
import { Taxons } from '../database/models/Taxons';
import { Properties } from '../database/models/Properties';
import {
  DICTIONARY_INDEX_NAME,
  SETTINGS_ELASTIC_INDEX_NAME,
  TAXON_DESCR_INDEX_NAME,
  TAXON_PROPERTY_REVERSE_SLUG_ADDR,
  TAXON_TREE_INDEX_NAME,
} from '../core/const';
import {
  ICatalogConfigItem,
  IProductCatalog,
  ISettingsItem,
  ITaxonTreeMapItem,
  TCatalog,
  TCatalogType,
  TProductDictionary,
  TTaxonCountryTree,
  TTaxonsTreeRoot,
  TTaxonTreeMap,
} from '../../types/portal/server';
import { TCatalogConfig } from '../database/models/TCatalogConfig';
import { PopularProduct } from '../database/class/PopularProduct';
import { Product } from '../database/models/Product';
import { VSlugAddr } from '../database/models/VSlugAddr';
import { VTaxonsTree } from '../database/models/VTaxonsTree';
import { ElasticUtilService } from '../elastic/elastic.util.service';
import { SlugTaxonomyDto } from './dto/slug.taxonomy.dto';

@Injectable()
export class PortalService {
  private readonly logger: Logger = new Logger(PortalService.name);

  constructor(
    private readonly sequelize: Sequelize,
    private readonly elastic: ElasticsearchService,
    private readonly configService: ConfigService,
    private readonly elasticUtilService: ElasticUtilService,
  ) {}

  async updateElasticCategories(tree: IProductCatalog) {
    this.logger.verbose('Upload categories to elastic');
    await this.elastic.index({
      index: SETTINGS_ELASTIC_INDEX_NAME,
      id: 'categories',
      document: {
        type: 'categories',
        value: tree, // due to text index, JSON structure too large
      },
    });
    await this.elastic.indices.refresh({ index: SETTINGS_ELASTIC_INDEX_NAME });
    this.logger.verbose(`Categories uploaded`);
  }

  async updateElasticDictionaries(dict: TProductDictionary) {
    this.logger.verbose('Upload taxons/properties dictionaries');
    await this.elastic.index({
      index: SETTINGS_ELASTIC_INDEX_NAME,
      id: 'dict',
      document: {
        type: 'dict',
        value: dict,
      },
    });
    this.logger.verbose(`Taxons/properties dictionary uploaded`);
  }

  async exportTreeDictionary(dictCode: string) {
    const index = DICTIONARY_INDEX_NAME;
    const res = await this.sequelize.model('Taxons').findAll({
      include: [
        { model: Taxonomies, attributes: [] },
        { model: Taxons, attributes: [['slug', 'slug']] },
      ],
      attributes: ['name', 'slug', 'priority'],
      where: { '$taxonomies.slug$': dictCode },
      order: ['priority'],
      raw: true,
      nest: true,
    });

    const operations = [];
    res.forEach((row: Taxons & { taxon_parent: { slug: string } }) => {
      const id = `${dictCode}-${row.slug}`;
      const parentId = row.taxon_parent?.slug
        ? `${dictCode}-${row.taxon_parent.slug}`
        : undefined;
      operations.push(
        { index: { _index: index, _id: id } },
        {
          code: dictCode,
          slug: row.slug,
          order: row.priority,
          parent: parentId,
          props: {
            name: row.name,
          },
        },
      );
    });

    await this.elastic.bulk({
      index,
      refresh: true,
      operations,
    });
  }

  async exportBrandsDictionary() {
    const index = DICTIONARY_INDEX_NAME;
    const res = await this.sequelize.model('Taxons').findAll({
      include: [{ model: Taxonomies, attributes: [] }],
      attributes: ['name', 'slug'],
      where: { '$taxonomies.slug$': 'importer' },
      order: ['priority'],
      raw: true,
    });

    const operations = [];
    res.forEach((row: Taxons) => {
      operations.push(
        { index: { _index: index, _id: `brands-${row.slug}` } },
        {
          code: 'brands',
          slug: row.slug,
          parent: undefined,
          props: { name: row.name },
        },
      );
    });

    await this.elastic.bulk({
      index,
      refresh: true,
      operations,
    });

    this.logger.verbose(`Dictionary [brands] exported`);
  }

  async loadSlugParents(
    slug: string[] | string,
  ): Promise<Record<string, Array<string>>> {
    const slugArray = Array.isArray(slug) ? slug : [slug];
    const index = TAXON_TREE_INDEX_NAME;

    const result: Map<string, Array<string>> = new Map();

    const allSlugIds = await this.elastic.search({
      index,
      query: { bool: { filter: [{ terms: { ['slug']: slugArray } }] } },
    });

    if (allSlugIds.hits.hits.length) {
      const slugsMapById = new Map<string, Set<string>>();
      const allIds = allSlugIds.hits.hits
        .map((hit: SearchHit<ITaxonTreeMapItem>) => {
          // collect slugs for each parent ID (
          //   wine.parent = ['4'],
          //   orange-wine.parent = ['4']
          //      =>  { '4': ['wine', 'orange-wine'] }
          // )
          result.set(hit._source.slug, []);
          hit._source.parent.forEach((parentId) => {
            if (!slugsMapById.has(parentId)) {
              slugsMapById.set(parentId, new Set());
            }
            slugsMapById.get(parentId).add(hit._source.slug);
          });
          return hit._source.parent;
        })
        .flat();

      const allParentSlugsQueryRes = await this.elastic.search({
        index,
        query: { ids: { values: allIds } },
      });

      allParentSlugsQueryRes.hits.hits.forEach(
        (hit: SearchHit<ITaxonTreeMapItem>) => {
          const childSlugs = slugsMapById.get(hit._id);
          Array.from(childSlugs).forEach((slug) => {
            result.get(slug).push(hit._source.slug);
          });
        },
      );
    }

    return Object.fromEntries(result.entries());
  }

  async loadSlugChilds(
    slug: string[] | string,
  ): Promise<[string[], Map<string, string>]> {
    const slugArray = Array.isArray(slug) ? slug : [slug];
    const index = TAXON_TREE_INDEX_NAME;

    const keyMap = new Map();
    const resMap = new Map();
    slugArray.forEach((slug) => {
      resMap.set(slug, new Set());
    });

    const allSlugIds = await this.elastic.search({
      index,
      query: {
        bool: {
          filter: [{ terms: { [`slug`]: slugArray } }],
        },
      },
    });

    if (allSlugIds.hits.hits.length) {
      const allIds = allSlugIds.hits.hits
        .map((hit: SearchHit<ITaxonTreeMapItem>) => {
          keyMap.set(`${hit._id}`, hit._source.slug);
          return hit._source.all_childs;
        })
        .flat();

      const allChildSlugsQueryRes = await this.elastic.search({
        index,
        query: {
          ids: {
            values: allIds,
          },
        },
      });

      const allChildSlugs = allChildSlugsQueryRes.hits.hits.map(
        (hit: SearchHit<ITaxonTreeMapItem>) => {
          hit._source.parent?.forEach((parentId) => {
            const parentSlug = keyMap.get(parentId);
            if (parentSlug) {
              resMap.get(parentSlug)?.add(hit._source.slug);
            }
          });

          return hit._source.slug;
        },
      );

      return [allChildSlugs, resMap];
    }

    return [[], new Map()];
  }

  async updateElasticReverseAddrs(bufSize: number = 3000) {
    const index = TAXON_PROPERTY_REVERSE_SLUG_ADDR;
    this.logger.verbose('Upload reverse taxons/properties addresses');

    const start = Date.now();
    let count = 0;

    while (true) {
      const addrs = await this.loadReverseTaxonAndPropertyAddrs(bufSize, count);
      count += addrs.length;
      if (!addrs.length) {
        break;
      }

      const operations = [];

      for (let i = 0; i < addrs.length; i++) {
        operations.push(
          {
            index: { _index: index, _id: addrs[i].slug },
          },
          {
            addrs: addrs[i].addr,
          },
        );
      }

      await this.elastic.bulk({
        index,
        refresh: true,
        operations,
      });
      this.logger.verbose(
        `Uploaded ${addrs.length} reverse addr records, total uploaded: ${count}`,
      );

      if (addrs.length < bufSize) {
        break;
      }
    }

    this.logger.verbose(
      `Uploaded ${count} reverse addresses in ${Math.floor(
        (Date.now() - start) / 1000,
      )} sec`,
    );
  }

  async decodeSlugToTaxonomy(
    slug: string[] = [],
    reverseIndexExtending: boolean = false,
  ): Promise<SlugTaxonomyDto> {
    const acc = {};

    const slugParents: Record<
      string,
      Array<string>
    > = await this.loadSlugParents(slug);

    let parents: Set<string> = new Set();
    Object.values(slugParents).forEach((slugParentsArray: string[]) => {
      parents = new Set([...parents, ...slugParentsArray]);
    });

    // price value decoding. price-to-500 should be converted to product.price
    const priceSet = new Set<string>();
    slug?.forEach((slug) => {
      if (slug.indexOf('price-') === 0) {
        priceSet.add(slug);
      }
    });
    if (priceSet.size) {
      acc['product.price'] = priceSet;
    }
    // end of price decode

    const slugsForDecode = [...slug, ...parents];

    const res = await this.elastic.search<{ addrs: string[] }>({
      index: TAXON_PROPERTY_REVERSE_SLUG_ADDR,
      query: {
        ids: {
          values: slugsForDecode,
        },
      },
      size: slugsForDecode.length,
    });

    // console.log(util.inspect(res, { depth: null, colors: true }));

    res.hits.hits.forEach((item) => {
      (item._source.addrs as string[]).forEach((addr: string) => {
        acc[addr] = acc[addr] || new Set();
        acc[addr].add(item._id);
        if (reverseIndexExtending) {
          acc[item._id] = acc[item._id] || new Set();
          acc[item._id].add(addr);
        }
      });
    });

    Object.keys(acc).forEach((key) => {
      acc[key] = Array.from(acc[key]);
    });

    // console.log(util.inspect(acc, { depth: null, colors: true }));

    return {
      slug: acc,
      parent: slugParents,
    };
  }

  async updateElasticPopularProducts(
    popularProducts: Record<string, PopularProduct[]>,
  ) {
    this.logger.verbose('Upload popular products to elastic');
    await this.elastic.index({
      index: SETTINGS_ELASTIC_INDEX_NAME,
      id: 'popular_products',
      document: {
        type: 'popular_products',
        value: popularProducts,
      },
    });
    await this.elastic.indices.refresh({ index: SETTINGS_ELASTIC_INDEX_NAME });
    this.logger.verbose(`Popular products exported`);
  }

  // Get catalog menu categories
  async getTopMenuItems(raw: boolean = false) {
    const res = await this.sequelize.model('Taxons').findAll({
      include: [{ model: Taxonomies, attributes: [] }],
      attributes: ['name', 'title_menu', 'slug'],
      where: { '$taxonomies.slug$': 'category', in_menu: 1 },
      order: ['id'],
      raw,
    });

    return res;
  }

  // Get portal pages (top menu row)
  async getPortalPages(raw: boolean = false) {
    const res = await this.sequelize.model('Taxons').findAll({
      include: [{ model: Taxonomies, attributes: [] }],
      attributes: ['name', 'title_menu', 'slug'],
      where: { '$taxonomies.slug$': 'pages', in_menu: 1 },
      order: ['id'],
      raw,
    });
    return res;
  }

  // Get any taxon by category
  async getCrmTaxons(dict: string) {
    const res = await this.sequelize.model('Taxons').findAll({
      include: [{ model: Taxonomies, attributes: [] }],
      // attributes: [ 'id', 'name', 'code', 'slug' ],
      where: { '$taxonomies.slug$': dict },
      raw: true,
    });
    return res;
  }

  async updateElasticTaxonDescriptions() {
    // SELECT t2.name, t2.slug, t.name, t.slug, t.descr
    // FROM taxons t
    // LEFT JOIN taxonomies t2 ON t2.id = t.taxonomy_id
    // WHERE t.descr > ''

    const index = TAXON_DESCR_INDEX_NAME;
    const res = await this.sequelize.model('Taxons').findAll({
      include: [{ model: Taxonomies, attributes: [] }],
      attributes: ['slug', 'descr', 'site_url'],
      where: { descr: { [Op.not]: null } },
      // raw: true,
    });

    const operations = [];
    // TODO: Implement bufferization

    for (let row of res as Taxons[]) {
      operations.push(
        {
          index: { _index: index, _id: row.slug },
        },
        {
          descr: row.descr,
          site_url: row.site_url,
        },
      );
    }

    await this.elastic.bulk({
      index,
      refresh: true,
      operations,
    });
    this.logger.verbose('Taxon description dictionary uploaded successful');
  }

  async loadTaxonsDescription(taxons: string[]) {
    const index = TAXON_DESCR_INDEX_NAME;

    const query = {
      ids: {
        values: taxons,
      },
    };

    const res = await this.elastic.search({
      index,
      query,
      size: taxons.length,
    });

    const total = res.hits.total?.hasOwnProperty('value')
      ? (res.hits.total as SearchTotalHits).value
      : (res.hits.total as number);

    this.logger.debug(
      util.inspect({ query }, { depth: null, colors: true }),
      `${res.hits.hits.length} hits, ${total} total`,
    );
    const acc = {};
    res.hits.hits.forEach((item) => {
      const { descr, site_url } = item._source as {
        descr: string;
        site_url: string;
      };
      acc[item._id] = {
        descr,
        site_url,
      };
    });

    return acc;
  }

  async loadPopularProducts(
    popularIDs: Record<Partial<TCatalogType>, Array<number>>,
  ): Promise<Record<string, PopularProduct[]>> {
    const reverseRecord: Record<number, string> = {};
    const catalogs = Object.keys(popularIDs);

    for (const catalog of catalogs) {
      const ids = popularIDs[catalog];
      ids.forEach((id) => (reverseRecord[id] = catalog));
    }

    const res: Record<string, PopularProduct[]> = {};
    const products: Product[] = (await this.sequelize.model('Product').findAll({
      attributes: ['id', 'name', 'price'],
      include: Product.asJson,
      where: {
        id: Object.keys(reverseRecord),
      },
    })) as Product[];

    for (const product of products) {
      const category = reverseRecord[product.id] as TCatalogType;
      res[category] = res[category] || [];
      res[category].push(new PopularProduct(category, product as Product));
    }

    return res;
  }

  async loadPopularProductIDs(): Promise<Record<string, Array<number>>> {
    const res: Record<string, Array<number>> = {};
    const mocks = this.configService.get('mocks')?.mock_popular_goods || {};

    if (mocks) {
      Object.keys(mocks).forEach((catalog) => {
        res[catalog] = mocks[catalog];
      });
    }
    return res;
  }

  async loadProductDictionary(): Promise<TProductDictionary> {
    const res: TProductDictionary = {};

    const taxonomies = await this.sequelize.model('Taxonomies').findAll({
      attributes: ['slug', 'name'],
    });
    taxonomies.forEach((t: Taxonomies) => {
      res[`taxons.${t.slug}`] = t.name;
    });
    const properties = await this.sequelize.model('Properties').findAll({
      attributes: ['slug', 'name'],
    });
    properties.forEach((p: Properties) => {
      res[`properties.${p.slug}`] = p.name;
    });

    return res;
  }

  async loadReverseTaxonAndPropertyAddrs(
    limit: number,
    offset: number = 0,
  ): Promise<VSlugAddr[]> {
    const slugAddrs = await this.sequelize.model('VSlugAddr').findAll({
      limit,
      offset,
    });
    return slugAddrs as VSlugAddr[];
  }

  async loadCatalogConfig(): Promise<TCatalog> {
    const catalogConfig: TCatalogConfig[] = (await this.sequelize
      .model('TCatalogConfig')
      .findAll()) as TCatalogConfig[];

    // console.log(util.inspect(catalogConfig, { depth: null, colors: true }));

    const res: TCatalog = {};

    for (const item of catalogConfig) {
      const category = item.category.toLowerCase();
      res[category] = res[category] || {
        catalog: [],
        filters: [],
        menu: [],
      };

      const configItem: ICatalogConfigItem = {
        order: item.order,
        slug: item.slug,
        source: item.source,
        name: item.name,
        configuration: item.configuration,
      };

      res[category][item.type] =
        res[category][item.type] || ([] as ICatalogConfigItem[]);
      res[category][item.type].push(configItem);
    }

    // Fix broken types
    // const defaultCatalogConfig = res[DEFAULT_CONFIG_CATALOG_KEY];
    // if (defaultCatalogConfig) {
    //   for (const [key, conf] of Object.entries(res)) {
    //     if (!conf.catalog.length) {
    //       this.logger.warn(`Catalog indexer config ${key} has no "catalog" field, using default. Fix t_catalog_config, add record type catalog for category ${key}`);
    //       conf.catalog = [...defaultCatalogConfig.catalog];
    //     }
    //   }
    // }

    return res;
  }

  async loadCategoriesFromElastic() {
    const result = await this.elastic.search<ISettingsItem<string>>({
      index: SETTINGS_ELASTIC_INDEX_NAME,
      query: {
        match_all: {},
      },
    });

    const res = {};

    result.hits?.hits.forEach((doc) => {
      res[doc._source.type] = doc._source.value;
    });

    return res;
  }

  async pageProps(raw: boolean = false) {
    const pages = await this.getPortalPages(raw);
    const topMenuItems = await this.getTopMenuItems(raw);
    const settings = await this.loadCategoriesFromElastic();

    return {
      pages,
      topMenuItems,
      settings,
    };
  }

  public extractCountries(tree: TTaxonsTreeRoot): TTaxonCountryTree {
    const drillDown = (tree: TTaxonsTreeRoot) => {
      const res = {};
      for (const id of Object.keys(tree)) {
        const item = tree[id];
        const block: { label: string; items?: object } = {
          label: item.label,
        };
        if (Object.keys(item.childs).length) {
          block.items = drillDown(item.childs);
        }
        res[item.slug] = block;
      }
      return res;
    };

    const root = {};
    for (const id of Object.keys(tree)) {
      const item = tree[id];
      if (item.taxonomy === 'country') {
        const block: { label: string; items?: object } = {
          label: item.label,
        };
        // console.log(item.slug, Object.keys(item.childs).length);
        if (Object.keys(item.childs).length) {
          block.items = drillDown(item.childs);
        }
        root[item.slug] = block;
      }
    }

    return root;
  }

  async updateElasticCountries(tree: TTaxonsTreeRoot) {
    // 1. Get all root elements with taxonomy "country"
    // 2. Compile it with childs to tree
    // 3. Result should contains labels
    this.logger.verbose('Compile and update countries');
    const countries = this.extractCountries(tree);
    const type = 'countries';
    await this.elastic.index({
      index: SETTINGS_ELASTIC_INDEX_NAME,
      id: type,
      document: {
        type,
        value: countries,
      },
    });
    this.logger.verbose('Countries saved');
  }

  async updateElasticTaxonsTreeMap(treeMap: TTaxonTreeMap) {
    const index = TAXON_TREE_INDEX_NAME;
    const operations = [];
    for (const id of Object.keys(treeMap)) {
      const row = treeMap[id];
      operations.push(
        {
          index: { _index: index, _id: id },
        },
        {
          slug: row.slug,
          parent: row.parent,
          all_childs: row.all_childs,
        },
      );
    }

    await this.elastic.bulk({
      index,
      refresh: true,
      operations,
    });
  }

  async updateElasticWithTaxonsTree(): Promise<
    [TTaxonsTreeRoot, TTaxonTreeMap]
  > {
    const [tree, treeMap] = await this.getTaxonsTree();

    // 1. Extract countries to single container and save them to settings index
    await this.updateElasticCountries(tree);
    // 2. Update taxons treeMap (fast childs search)
    await this.updateElasticTaxonsTreeMap(treeMap);
    return [tree, treeMap];
  }

  /**
   * Compile taxons tree and store reverse addresses
   * @return {Promise<{}>}
   */
  async getTaxonsTree(): Promise<[TTaxonsTreeRoot, TTaxonTreeMap]> {
    const res = (await this.sequelize
      .model('VTaxonsTree')
      .findAll()) as VTaxonsTree[];

    // Each child connected to his parent
    const parents = new Map();
    const recordset = new Map();
    const root: TTaxonsTreeRoot = {};
    const slugs = new Map();

    // Get all parents as array
    const getParents = (nearParentId: string) => {
      const res = [];
      let cptr = nearParentId;
      while (cptr) {
        res.push(String(cptr));
        cptr = parents.get(cptr);
      }
      return res;
    };

    for (const record of res) {
      slugs.set(String(record.id), record.slug);

      record.ids.forEach((id) => {
        parents.set(String(id), String(record.id));
      });

      const parentsArray = getParents(String(record.id));

      // Register slug in global store
      recordset.set(String(record.id), record);

      // Drill down through tree from root to record leaf
      let level = root;
      for (let i = parentsArray.length - 1; i >= 0; i--) {
        const levelRecord = recordset.get(String(parentsArray[i]));
        level[parentsArray[i]] = level[parentsArray[i]] || {
          slug: levelRecord?.slug,
          taxonomy: levelRecord?.taxonomy,
          label: levelRecord?.name,
          childs: {},
        };
        level = level[parentsArray[i]].childs;
      }

      // Register each leaf in current level
      record.ids.forEach((id, index) => {
        slugs.set(String(id), record.child_slugs[index]);

        level[id] = level[id] || {
          slug: record.child_slugs[index],
          taxonomy: record.child_taxonomies[index],
          label: record.child_names[index],
          childs: {},
        };
      });
    }

    const recursiveDrill = (
      root: object,
      childsMap: Map<string, Set<string>> = new Map(),
      parentsMap: Map<string, string[]> = new Map(),
      parentId: string | null = null,
      parents: string[] = [],
    ) => {
      let levelSet = childsMap.get(parentId);
      if (!childsMap.has(parentId)) {
        levelSet = new Set<string>();
        childsMap.set(parentId, levelSet);
      }

      let levelIds: string[] = [];
      for (const id of Object.keys(root)) {
        levelIds.push(id);
        parentsMap.set(id, parents);

        const childs = Object.entries(root[id].childs);

        if (childs.length) {
          levelIds = [
            ...levelIds,
            ...recursiveDrill(root[id].childs, childsMap, parentsMap, id, [
              ...parents,
              id,
            ]),
          ];
        }
      }

      childsMap.set(
        parentId,
        new Set<string>([...Array.from(levelSet), ...levelIds]),
      );

      return levelIds;
    };

    // All childs concentrate in single map (record.id => [child1, child2, child3])
    const childIdsMap = new Map<string, Set<string>>();
    const parentIdsMap = new Map<string, string[]>();
    recursiveDrill(root, childIdsMap, parentIdsMap);

    // Remove unattached elements
    childIdsMap.delete(null);

    const fullResultSet: TTaxonTreeMap = {};
    for (const id of parentIdsMap.keys()) {
      fullResultSet[id] = {
        slug: slugs.get(id),
        parent: Array.from(parentIdsMap.get(id) || []),
        childs: recordset.get(id)?.ids || [],
        all_childs: Array.from(childIdsMap.get(id) || []),
      };
    }

    return [root, fullResultSet];
  }

  // TODO: Implement reindex or forcemerge
  async mergeElasticIndices() {
    this.logger.log(`Forcemerge elastic indices`);
    await this.elasticUtilService.mergeElasticIndices();
    this.logger.log(`Forcemerge done`);
  }
}
