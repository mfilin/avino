import { QueryClient } from '@tanstack/react-query';
import Api from '../../api';
import { PAGE_COUNT_SETTING } from '../../../const';

export class IndexPageCache {
  constructor(private readonly queryClient: QueryClient) {}

  public async prepare() {
    //  TODO: Remove constant wine-all!
    const productsCategory = 'wine-all';
    const popularProductsQueryKey = [
      'popular-products',
      productsCategory,
      PAGE_COUNT_SETTING[0],
    ];
    await this.queryClient.prefetchQuery(popularProductsQueryKey, async () => {
      const result = await Api.instance.product.loadProducts(
        [productsCategory],
        {
          page: 1,
          order: 'is_hit',
          size: PAGE_COUNT_SETTING[0],
        },
      );

      return result;
    });

    const newProductsQueryKey = ['new-products', PAGE_COUNT_SETTING[0]];
    await this.queryClient.prefetchQuery(newProductsQueryKey, async () => {
      const result = await Api.instance.product.loadProducts([], {
        page: 1,
        order: 'is_new',
        size: PAGE_COUNT_SETTING[0],
      });

      return result;
    });

    await this.queryClient.prefetchQuery(
      ['portal-static'],
      Api.instance.portal.loadPortalStatic,
    );
  }
}
