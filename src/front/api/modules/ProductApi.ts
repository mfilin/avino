import { IApiServices, ISuggestItem, ISuggestResult } from '../types';
import bind from 'bind-decorator';
import { routesMap } from '../routes';
import {
  ILoadProductOptions,
  IProduct,
  IProductGroup,
  IProductSuggest,
} from '../types/product';
import { IPagingResponse } from '../types/shared';

export default class ProductApi {
  constructor(private service: IApiServices) {}

  @bind
  async suggestProduct(
    query?: string,
  ): Promise<ISuggestResult<IProductSuggest>> {
    const result = await this.service.rest.root.axios.get<
      ISuggestResult<IProductSuggest>
    >(routesMap.product.suggest(), {
      params: {
        query,
      },
    });

    return result.data;
  }

  @bind
  async loadProducts(
    filters: string[],
    options?: ILoadProductOptions,
  ): Promise<IPagingResponse<IProduct>> {
    const params: Record<string, string | string[]> = {
      filters,
      order: options?.order,
      orderDesc: options?.orderDesc,
    };

    if ((options?.page as number) > 0) {
      params.page = String(options.page);
    }

    if (options?.size > 0) {
      params.size = String(options.size);
    }

    const result = await this.service.rest.root.axios.get<
      IPagingResponse<IProduct>
    >(routesMap.product.load(), {
      params,
    });

    return result.data;
  }

  @bind
  async queryProducts(
    query: string,
    options?: ILoadProductOptions,
  ): Promise<IPagingResponse<IProduct>> {
    // console.log('[queryProducts]', {
    //   query: query,
    //   page: options?.page,
    //   order: options?.order,
    //   orderDesc: options?.orderDesc,
    //   size: options?.size,
    // });

    const result = await this.service.rest.root.axios.get<
      IPagingResponse<IProduct>
    >(routesMap.product.search(), {
      params: {
        query: query,
        page: options?.page,
        order: options?.order,
        orderDesc: options?.orderDesc,
        size: options?.size,
      },
    });

    return result.data;
  }

  @bind
  async loadGroupForProduct(id: string | number): Promise<IProductGroup> {
    const result = await this.service.rest.root.axios.get<IProductGroup>(
      routesMap.product.loadGroupForProduct(id),
    );
    return result.data;
  }
}
