import util from 'node:util';
import { Injectable, Logger } from '@nestjs/common';
import { Op } from 'sequelize';
import { Sequelize, Model } from 'sequelize-typescript';
import { Product } from '../database/models/Product';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import {
  SearchHit,
  SearchTotalHits,
} from '@elastic/elasticsearch/lib/api/types';
import { Taxonomies } from '../database/models/Taxonomies';
import { Taxons } from '../database/models/Taxons';
import { ModelTaxons } from '../database/models/ModelTaxons';
import { VProductsJSON } from '../database/models/VModelProductsJSON';
import { ProductGroup } from '../database/class/ProductGroup';
import { ProductSTD } from '../database/class/ProductSTD';
import {
  PRODUCT_GROUPS_ELASTIC_INDEX_NAME,
  PRODUCTS_ELASTIC_INDEX_NAME,
} from '../core/const';
import { ILoadProductOptions, ISortOrder } from './types';
import {
  ALLOWED_CLIENT_FIELDS,
  FULLL_PRODUCT_FIELDS,
  PRODUCT_EXCLUDE_FIELDS,
  ProductEntityDaoImpl,
} from '../core/dao/product.entity.dao.impl';
import { QueryProductResultDto } from '../core/dto/query.product.result.dto';

export interface IProductAutocompleteResult {
  score: number;
  item: Product;
}

@Injectable()
export class ProductService {
  private readonly logger: Logger = new Logger(ProductService.name);

  constructor(
    private readonly sequelize: Sequelize,
    private readonly elastic: ElasticsearchService,
    private readonly productEntityDAOImpl: ProductEntityDaoImpl,
  ) {}

  async loadProductsByOwnProperty(props?: {
    product?: Record<string, string | number>;
    taxons?: Record<string, string | number>;
  }): Promise<Product[]> {
    const outProductProps = {};
    Object.entries(props?.product || {}).forEach((entry) => {
      const [key, value] = entry;
      outProductProps[`\$Product.${key}\$`] = value;
    });
    const taxonProps = {};
    Object.entries(props?.taxons || {}).forEach((entry) => {
      const [key, value] = entry;
      taxonProps[`\$modelTaxons->taxons.${key}\$`] = value;
    });

    const res = (await this.sequelize.model('Product').findAll({
      attributes: ['id', 'name', 'is_hit'],
      include: [
        {
          model: ModelTaxons,
          attributes: [],
          include: [
            {
              model: Taxons,
              attributes: [],
              include: [
                {
                  model: Taxonomies,
                  attributes: [],
                },
              ],
            },
          ],
        },
      ],
      where: {
        // WHERE t2.slug = 'category' AND p.is_hit = 1 AND t.parent_id IS NULL
        '$modelTaxons->taxons->taxonomies.slug$': 'category',
        '$modelTaxons->taxons.parent_id$': { [Op.is]: null },
        ...outProductProps,
        ...taxonProps,
        // '$Product.is_hit$': 1,
      },
    })) as Product[];
    // const res = await this.sequelize.model('Taxons').findAll({
    //   include: [{
    //     model: Taxonomies,
    //     include: [{
    //       model: ModelTaxons,
    //       include: [{
    //         model: Product,
    //       }]
    //     }]
    //   }]
    // });

    return res;
  }

  async loadProductsJSON(limit: number, offset: number = 0) {
    // const res: Array<{ name: string, json: Object[] }> = await this.sequelize.model('VProductsJSON').findAll({
    const res = await this.sequelize
      .model('VProductsJSON')
      .findAll<Model<VProductsJSON>>({
        limit,
        offset,
        // raw: true, // DO NOT CONVERT TO CLASS
      });

    const result = JSON.parse(
      JSON.stringify(res.map((record) => record.toJSON().product)),
    );
    // console.log(util.inspect(result, { depth: null, colors: true }));
    return result;
  }

  async getCrmProductById(id: string | number) {
    const res = await this.sequelize.model('Product').findByPk(id, {
      // include: Product.fullModel
      include: Product.asJson,
    });
    return res;
  }

  async getCrmProducts(limit: number, offset: number = 0): Promise<Product[]> {
    const res = await this.sequelize.model('Product').findAll({
      limit,
      offset,
      include: Product.asJson,
      where: {
        state: 'active',
      },
      // include: Product.fullModel
    });

    return res.map((item) => item.dataValues);
  }

  /**
   * Benchmark tests: temporary products filling method
   * @param {Array<Product>} products
   * @return {Promise<void>}
   */
  async pushElasticProducts(products: Array<Product>) {
    const productOperations = [];
    products.forEach((product) => {
      productOperations.push(
        { index: { _index: PRODUCTS_ELASTIC_INDEX_NAME, _id: product.id } },
        product,
      );
    });

    await this.elastic.bulk({
      index: PRODUCTS_ELASTIC_INDEX_NAME,
      refresh: true,
      operations: productOperations,
    });
  }

  async updateElasticProducts(groups: Array<ProductGroup>) {
    const productOperations = [];
    const groupsOperations = [];
    groups.flatMap((group) => {
      const productIds = [];
      // TODO:
      //    1. Extract each product and save it
      //    2. Group:
      //        { name: 'GROUP NAME', ids: [1,2,3,4,5] }
      group.products.forEach((product: ProductSTD) => {
        // if (product.id === 87697) {
        //   console.log('============== DEBUG PRODUCT ===================');
        //   console.log(util.inspect(product, { depth: null, colors: true }));
        //   console.log('============== DEBUG PRODUCT ===================');
        // }
        productIds.push(product.id);
        productOperations.push(
          { index: { _index: PRODUCTS_ELASTIC_INDEX_NAME, _id: product.id } },
          product,
        );
        // productOperations.push([{ index: { _index: PRODUCTS_ELASTIC_INDEX_NAME, _id: product.id } }, product]);
      });

      groupsOperations.push(
        {
          index: { _index: PRODUCT_GROUPS_ELASTIC_INDEX_NAME, _id: group.name },
        },
        {
          ids: productIds,
          // name: group.name,
          // ids: productIds
        },
      );
    });

    // console.log(util.inspect({ operations }, { depth: null, colors: true }));

    await this.elastic.bulk({
      index: PRODUCTS_ELASTIC_INDEX_NAME,
      refresh: true,
      operations: productOperations,
    });

    await this.elastic.bulk({
      index: PRODUCT_GROUPS_ELASTIC_INDEX_NAME,
      refresh: true,
      operations: groupsOperations,
    });
  }

  async loadProductGroup(
    id: string,
  ): Promise<{ name: string; ids: string[] } | null> {
    const result = await this.elastic.search({
      index: PRODUCT_GROUPS_ELASTIC_INDEX_NAME,
      query: {
        bool: {
          filter: [{ term: { ids: id } }],
        },
      },
      size: 1,
    });

    // console.log(util.inspect(result, { depth: null, colors: true }));

    const total = result.hits.total?.hasOwnProperty('value')
      ? (result.hits.total as SearchTotalHits).value
      : (result.hits.total as number);

    if (!total) {
      return null;
    }

    return {
      name: result.hits.hits[0]?._id,
      ...(result.hits.hits[0]?._source as { ids: string[] }),
    };
  }

  /**
   * Получить { Product } из быстрого хранилища
   * @param {string} index
   * @param {string} id
   * @return {Promise<Product>}
   */
  async getSingleProductForMarket(
    id: string,
  ): Promise<{ name: string; products: Product[] } | null> {
    const index = PRODUCTS_ELASTIC_INDEX_NAME;

    const productGroup = await this.loadProductGroup(id);

    if (productGroup) {
      const query = {
        bool: {
          filter: [{ terms: { id: productGroup.ids } }],
        },
      };
      const result = await this.elastic.search({
        index,
        query,
        size: productGroup.ids.length, // By default, response size is 10!
        _source: {
          excludes: PRODUCT_EXCLUDE_FIELDS,
          includes: FULLL_PRODUCT_FIELDS,
        },
      });

      const total = result.hits.total?.hasOwnProperty('value')
        ? (result.hits.total as SearchTotalHits).value
        : (result.hits.total as number);

      this.logger.debug(
        util.inspect({ query }, { depth: null, colors: true }),
        `${result.hits.hits.length} hits, ${total} total`,
      );

      return {
        name: productGroup.name,
        products: result.hits.hits.map((res) => res._source as Product),
      };
    }

    return null;
  }

  getPriceTerm(priceFrom: number | undefined, priceTo: number | undefined) {
    let res = undefined;

    if (priceFrom || priceTo) {
      res = {
        range: {
          price: {
            boost: 1,
          },
        },
      };

      if (priceFrom) {
        res.range.price.gte = priceFrom;
      }
      if (priceTo) {
        res.range.price.lte = priceTo;
      }
    }

    return res;
  }

  /**
   * Main Elastic products query engine
   *
   * @param {ILoadProductOptions} options
   * @param {Record<string, string[] | string>} filtersMap
   * @return {Promise<QueryProductResultDto>}
   *
   * Strict products query examples:
   *
   * {
   *    "query": {
   *         "bool": {
   *           "filter": [
   *             { "term": { "taxons.root.slug.keyword": "cognac-all" } },
   *             { "term": { "properties.pval.slug.keyword": "175" } }
   *           ]
   *         }
   *     },
   * }
   */
  async loadProductsElastic(
    options: ILoadProductOptions,
    filtersMap: Record<string, string[] | string> = {},
  ): Promise<QueryProductResultDto> {
    const products: QueryProductResultDto =
      await this.productEntityDAOImpl.loadProductsByFilters(
        options,
        filtersMap,
      );
    return products;
  }

  async queryProducts(query: string, options: ILoadProductOptions) {
    const { page = 1, pageSize = 10, sort } = options;
    const index = PRODUCTS_ELASTIC_INDEX_NAME;

    const sortFields = {};
    sort?.forEach((item: ISortOrder) => {
      sortFields[`${item.fieldName}`] = {
        order: item.order,
      };
    });

    const result = await this.elastic.search({
      index,
      query: {
        query_string: {
          query,
        },
      },
      size: pageSize,
      from: pageSize * (page - 1),
      sort: sortFields,
      // WARNING! BE CAREFUL! NOT ALL FIELDS SHOULD BE VISIBLE FOR CLIENTS!!!
      _source: ALLOWED_CLIENT_FIELDS,
    });

    const total = result.hits.total?.hasOwnProperty('value')
      ? (result.hits.total as SearchTotalHits).value
      : (result.hits.total as number);

    this.logger.debug(
      util.inspect({ query }, { depth: null, colors: true }),
      `${result.hits.hits.length} hits, ${total} total`,
    );

    return {
      total,
      page,
      items: result.hits.hits.map((res: SearchHit<ProductGroup>) => {
        return res._source;
      }),
    };
  }

  async suggestProducts(
    index: string,
    query: string,
  ): Promise<{ total: number; result: IProductAutocompleteResult[] }> {
    const result = await this.elastic.search<Product>({
      index,
      query: {
        query_string: {
          query,
        },
        // bool: {
        //   must: [
        //     { match: { ['products.name_en']: { query } } },
        //     { match: { ['products.name']: { query } } },
        //     { match: { ['products.name_ru']: { query } } },
        //   ],
        //   minimum_should_match: 0,
        // },
      },
      highlight: {
        pre_tags: ['<m>'],
        post_tags: ['</m>'],
        require_field_match: false,
        fields: {
          name: {},
          name_en: {},
          name_ru: {},
        },
      },
      size: 10,
      _source: [
        'name',
        'id',
        'name',
        'name_ru',
        'name_en',
        'slug',
        'price',
        'media.id',
        'media.file_name',
        'taxons.category',
        'taxons.country',

        // "id",
        // "name_ru",
        // "name",
        // "slug",
        // "sku",
        // "price"
      ],
    });

    const total =
      (result.hits.total as SearchTotalHits)?.value ||
      (result.hits.total as number);

    return {
      total,
      result: result.hits.hits
        .filter((res: SearchHit<Product>) => Boolean(res.highlight))
        .map((res: SearchHit<Product>): IProductAutocompleteResult => {
          const item: Product = {
            ...res._source,
            ...res.highlight,
          } as Product;

          return {
            item,
            score: res._score,
          } as IProductAutocompleteResult;
        }),
    };
  }
}
