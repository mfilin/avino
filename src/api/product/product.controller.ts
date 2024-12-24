import util from 'node:util';
import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
  BadRequestException,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { PRODUCTS_ELASTIC_INDEX_NAME } from '../core/const';
import { PortalService } from '../portal/portal.service';
import { ISortOrder } from './types';
import { priceParser } from '../../utils/priceParser';
import { ascDescOrderParser, orderParser } from '../../utils/orderParser';
import { SlugTaxonomyDto } from '../portal/dto/slug.taxonomy.dto';
import { QueryProductDto } from '../core/dto/query.product.dto';

@Controller('/product')
export class ProductController {
  private readonly logger: Logger = new Logger(ProductController.name);

  constructor(
    private readonly productService: ProductService,
    private readonly portalService: PortalService,
  ) {}

  @Get('check/:key')
  async checkLoad(@Param('key') key: string) {
    // const result = await this.productService.loadProductsByOwnProperty({
    //   product: {
    //     is_hit: 1
    //   },
    //   taxons: {
    //     slug: 'wine-all'
    //   }
    // });
    // const result = await this.productService.loadProductsJSON(10, 6500);
    //
    // return result;
    return null;
  }

  @Get('admin/:id')
  async loadAdminProduct(@Param('id') id: string) {
    const result = await this.productService.getCrmProductById(id);
    return result;
  }

  @Get('item/:id')
  async loadSingleProduct(@Param('id') id: string) {
    // const product = await this.productService.getCrmProductById(id);
    const product = await this.productService.getSingleProductForMarket(id);

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`, {
        cause: new Error(),
        description: `Product ${id} not found`,
      });
    }

    return product;
  }

  @Get('suggest')
  async suggestProducts(@Query('query') query: string = '') {
    const result = await this.productService.suggestProducts(
      PRODUCTS_ELASTIC_INDEX_NAME,
      query,
    );

    return {
      total: result.total,
      query,
      result: result.result,
    };
  }

  @Get('search')
  async searchProducts(
    @Query('query') query: string = '',
    @Query('order') order?: string,
    @Query('orderDesc') orderDesc?: string,
    @Query('size') size: number = 10,
    @Query('page') page: number = 1,
  ) {
    const maxSize = 50;
    // Check parameters first
    if (size < 0) {
      throw new BadRequestException(`Size cannot be least than zero`);
    }
    if (page <= 0) {
      throw new BadRequestException(`Page should be positive integer`);
    }
    if (size > maxSize) {
      throw new BadRequestException(`Page size more than allowed`, {
        cause: new Error(),
        description: `Page size ${size} not allowed, max value: ${maxSize}`,
      });
    }

    const sort = ascDescOrderParser(order, orderDesc, {
      onFieldNotAllowed: (field, message) => {
        this.logger.error(message);
      },
    });

    const products = await this.productService.queryProducts(query, {
      page,
      pageSize: size,
      sort,
    });

    return products;
  }

  @Get('load')
  async loadProducts(
    @Query(new ValidationPipe()) queryProductDto: QueryProductDto,
  ) {
    const decodedFilters: SlugTaxonomyDto =
      await this.portalService.decodeSlugToTaxonomy(queryProductDto.filters);

    const { from: priceFrom, to: priceTo } = priceParser(
      (decodedFilters['product.price'] as string[]) || [],
    );

    const {
      ['product.price']: _productPriceFilter,
      ...outDecodedFilters
    }: Record<string, string[] | string> = decodedFilters.slug;

    const {
      ['taxons.root']: _taxonsRoot,
      ['product.price']: _productPrices,
      ...restTaxons
    } = outDecodedFilters;

    const finalTaxonMapSet = new Map();
    const reverseMap = Object.keys(restTaxons).reduce((map, taxonKey) => {
      finalTaxonMapSet.set(taxonKey, new Set(restTaxons[taxonKey]));
      for (const slug of restTaxons[taxonKey] as string[]) {
        map.set(slug, taxonKey);
      }
      return map;
    }, new Map());

    const [, childSlugMap] = await this.portalService.loadSlugChilds(
      (Object.values(restTaxons) as string[][]).flat(),
    );

    for (const entry of childSlugMap.entries()) {
      const [parentSlug, slugSet] = entry;
      const taxonAddr = reverseMap.get(parentSlug);
      const finalSet = new Set([
        ...finalTaxonMapSet.get(taxonAddr),
        ...slugSet,
      ]);

      outDecodedFilters[taxonAddr] = Array.from(finalSet);
    }

    const sort = ascDescOrderParser(
      queryProductDto.order,
      queryProductDto.orderDesc,
      {
        onFieldNotAllowed: (field, message) => {
          this.logger.error(message);
        },
      },
    );

    const products = await this.productService.loadProductsElastic(
      {
        page: queryProductDto.page,
        pageSize: queryProductDto.size,
        sort,
        priceFrom,
        priceTo,
      },
      outDecodedFilters,
    );

    // console.log(util.inspect({
    //   products
    // }, { depth: null, colors: true }));

    return products;
  }
}
