import util from 'node:util';
import { Injectable, Logger } from '@nestjs/common';
import { ILoadProductOptions } from '../product/types';
import { ProductEntityDaoImpl } from '../core/dao/product.entity.dao.impl';
import { ProductDto } from '../core/dto/product/product.dto';

@Injectable()
export class AdminService {
  private readonly logger: Logger = new Logger(AdminService.name);

  constructor(private readonly productEntityDAOImpl: ProductEntityDaoImpl) {}

  async updateProduct(product: ProductDto) {
    await this.productEntityDAOImpl.updateProduct(product);
  }

  async loadProductsAdmin(
    options: ILoadProductOptions,
    filtersMap: Record<string, string[] | string> = {},
  ) {
    const products = await this.productEntityDAOImpl.loadProductsByFilters(
      options,
      filtersMap,
      true,
    );
    return products;
  }

  async loadProductGroupById(id: string) {
    const group = await this.productEntityDAOImpl.loadProductGroupByProductId(
      id,
      true,
    );
    return group;
  }
}
