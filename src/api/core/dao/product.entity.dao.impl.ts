import util from 'node:util';
import { QueryProductResultDto } from '../dto/query.product.result.dto';
import { ILoadProductOptions, ISortOrder } from '../../product/types';
import {
  PRODUCT_GROUPS_ELASTIC_INDEX_NAME,
  PRODUCTS_ELASTIC_INDEX_NAME,
} from '../const';
import { Injectable, Logger } from '@nestjs/common';
import { ProductGroup } from '../../database/class/ProductGroup';
import {
  SearchHit,
  SearchTotalHits,
} from '@elastic/elasticsearch/lib/api/types';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { taxonQueryBuilder } from '../utils/elastic';
import { Product } from '../../database/models/Product';
import { ProductDto } from '../dto/product/product.dto';
import { ElasticUtilService } from '../../elastic/elastic.util.service';

/**
 * Allowed fields for marketplace user
 * Be careful when editing this fields! Some fields should be hidden
 * for client's
 */
export const ALLOWED_CLIENT_FIELDS = [
  'name',
  'id',
  'name',
  'name_en',
  'name_ru',
  'sku',
  'sku2',
  'slug',
  'price',
  'is_hit',
  'is_new',
  'stock',
  'in_stock',
  'media.id',
  'media.disk',
  'media.file_name',
  'media.mime_type',
  'taxons',
  'properties',
  // 'products.id',
  // 'products.taxons.category',
  // 'products.taxons.country',
  // 'products.properties',
];

export const FULLL_PRODUCT_FIELDS = [
  ...ALLOWED_CLIENT_FIELDS,
  'food_text',
  'aroma_text',
  'color_text',
  'smack_text',
  'description',
];

/**
 * Restricted fields for marketplace user
 */
export const PRODUCT_EXCLUDE_FIELDS = ['taxons.importer'];

export interface IProductGroupResponse {
  name: string;
  products: Product[];
}

@Injectable()
export class ProductEntityDaoImpl {
  private readonly logger: Logger = new Logger(ProductEntityDaoImpl.name);

  constructor(
    private readonly elastic: ElasticsearchService,
    private readonly elasticUtil: ElasticUtilService,
  ) {}

  /**
   * Elastic query date range builder
   * @param dateFrom ISO date string: 2014-10-21T10:00:00
   * @param dateTo ISO date string 2014-10-21T10:00:00
   * @private
   */
  private getDateRangeTerm(dateFrom?: string, dateTo?: string) {
    const finalDateFrom = dateFrom
      ? Math.floor(new Date(dateFrom).getTime() / 1000)
      : dateFrom;
    const finalDateTo = dateTo
      ? Math.floor(new Date(dateTo).getTime() / 1000)
      : dateTo;

    const searchField = 'updated_at';

    let res = undefined;

    if (finalDateFrom || finalDateTo) {
      res = {
        range: {
          [searchField]: {
            // time_zone: 'Z',
            boost: 1,
          },
        },
      };

      if (finalDateFrom) {
        res.range[searchField]['gt'] = finalDateFrom;
      }
      if (finalDateTo) {
        res.range[searchField]['lt'] = finalDateTo;
      }
    }

    return res;
  }

  private getPriceTerm(
    priceFrom: number | undefined,
    priceTo: number | undefined,
  ) {
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

  async loadProductGroupByProductId(
    id: string,
    isAdmin: boolean = false,
  ): Promise<IProductGroupResponse | null> {
    const index = PRODUCTS_ELASTIC_INDEX_NAME;

    const productGroup = await this.loadProductGroup(id);

    if (productGroup) {
      const query = {
        ids: {
          values: productGroup.ids,
        },
        // bool: {
        //   filter: [{ terms: { id: productGroup.ids } }],
        // },
      };
      const result = await this.elastic.search({
        index,
        query,
        size: productGroup.ids.length, // By default, response size is 10!
        _source: isAdmin
          ? undefined
          : {
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
  }

  async loadProductsByFilters(
    options: ILoadProductOptions,
    filtersMap: Record<string, string[] | string> = {},
    isAdmin: boolean = false,
  ): Promise<QueryProductResultDto> {
    const {
      page = 1,
      pageSize = 10,
      sort,
      priceFrom,
      priceTo,
      dateFrom,
      dateTo,
      query: queryStr,
    } = options;
    const index = PRODUCTS_ELASTIC_INDEX_NAME;

    // Search answer here
    // https://stackoverflow.com/a/40755927

    // OR is spelled should
    // AND is spelled must
    // NOR is spelled should_not

    // const { ['product.price']: productPrice, ...restFilterMap} = filtersMap;

    const strictTerms = taxonQueryBuilder(filtersMap, [
      'taxons.root',
      'taxons.category',
    ]);
    const shouldTerms = taxonQueryBuilder(
      filtersMap,
      ['taxons.root', 'taxons.category'],
      true,
    );
    const otherTokens = [];
    if (queryStr) {
      otherTokens.push({
        query_string: {
          query: queryStr,
        },
      });
    }
    if (!isAdmin) {
      otherTokens.push({
        term: { 'state.keyword': 'active' },
      });
    }

    // const query = {
    //   bool: {
    //     filter: [...terms],
    //   },
    // };

    const sortFields = {};
    sort?.forEach((item: ISortOrder) => {
      // sortFields[`${item.fieldName}.keyword`] = {
      sortFields[`${item.fieldName}`] = {
        order: item.order,
      };
    });

    const priceRange = this.getPriceTerm(priceFrom, priceTo);
    const dateRange = this.getDateRangeTerm(dateFrom, dateTo);
    // console.log('dateRange: ', dateRange);

    // When all slug will be unique, you can change [should] to [must] and
    // results will be more correct
    const query = {
      bool: {
        must: [
          ...strictTerms,
          ...otherTokens,
          {
            bool: {
              should: [...shouldTerms],
              boost: 1,
            },
          },
        ]
          .concat(priceRange ? [priceRange] : [])
          .concat(dateRange ? [dateRange] : []),
        boost: 1,
      },
    };

    this.logger.debug(
      util.inspect(
        {
          query,
        },
        { depth: null, colors: true },
      ),
    );

    const result = await this.elastic.search({
      index,
      query,
      // scroll: '1m',
      size: pageSize,
      from: pageSize * (page - 1),
      sort: [
        {
          in_stock: {
            order: 'desc',
          },
          ...sortFields,
        },
      ],
      _source: isAdmin
        ? undefined
        : {
            // WARNING! BE CAREFUL! NOT ALL FIELDS SHOULD BE VISIBLE FOR CLIENTS!!!
            include: ALLOWED_CLIENT_FIELDS,
            exclude: PRODUCT_EXCLUDE_FIELDS,
          },
    });

    // console.log(result.hits.hits.length, 'hits');

    const total = result.hits.total?.hasOwnProperty('value')
      ? (result.hits.total as SearchTotalHits).value
      : (result.hits.total as number);

    this.logger.debug(
      util.inspect({ filtersMap, query }, { depth: null, colors: true }),
      `${result.hits.hits.length} hits, ${total} total`,
    );

    // console.log(util.inspect(result, { depth: null, colors: true }));

    const res: QueryProductResultDto = new QueryProductResultDto();
    res.total = total;
    res.page = page;
    res.items = result.hits.hits.map(
      (res: SearchHit<ProductGroup>) => res._source,
    );
    return res;
  }

  async updateProduct(product: ProductDto) {
    const index = PRODUCTS_ELASTIC_INDEX_NAME;
    const res = await this.elastic.update({
      index,
      id: product.id,
      doc: product,
      doc_as_upsert: true,
    });

    this.logger.verbose(`Product "${product.id}" has been updated successful`);
    await this.elasticUtil.refreshIndex(index);
  }
}
