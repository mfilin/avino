import React from 'react';
import Api from '../api';
import { IPagingResponse } from '../api/types/shared';
import {
  useInfiniteQuery,
  useQueryClient,
  InfiniteData,
} from '@tanstack/react-query';
import { IProduct } from '../api/types/product';
import { PAGE_COUNT_SETTING } from '../../const';

export function useCatalogInfiniteProducts(
  filters: string[],
  page: string = '',
  order: string = '',
  orderDesc: string = '',
  pageSize: number = PAGE_COUNT_SETTING[0],
) {
  const queryClient = useQueryClient();
  const catalogKey = ['products', filters, page, order, orderDesc, pageSize];

  // console.log('catalogKey: ', catalogKey);

  const {
    data: productPages,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
    isStale,
    isLoadingError,
  } = useInfiniteQuery(
    // <IPagingResponse<IProduct>>
    catalogKey,
    async ({ pageParam = 1 }): Promise<IPagingResponse<IProduct>> => {
      const cache: InfiniteData<IPagingResponse<IProduct>> =
        queryClient.getQueryData<InfiniteData<IPagingResponse<IProduct>>>(
          catalogKey,
        );
      const queryPage = pageParam || 1;

      if (cache?.pages[queryPage - 1]) {
        return cache.pages[queryPage - 1];
      }

      const result = await Api.instance.product.loadProducts(filters, {
        page: queryPage,
        order: order as string,
        orderDesc: orderDesc as string,
        size: pageSize,
      });

      return result;
    },
    {
      getNextPageParam: (
        lastPage: IPagingResponse<IProduct>,
        allPages: Array<IPagingResponse<IProduct>>,
      ) => {
        if (!lastPage) {
          return undefined;
        }
        const lastPageIndex = Number(lastPage.page);
        const total = Number(lastPage.total);
        const maxPages = Math.ceil(total / pageSize);

        if (lastPageIndex < maxPages) {
          return lastPageIndex + 1;
        }
        return undefined;
      },
      getPreviousPageParam: (
        firstPage: IPagingResponse<IProduct>,
        allPages: Array<IPagingResponse<IProduct>>,
      ) => {
        if (!firstPage) {
          return undefined;
        }
        return Number(firstPage.page) - 1;
      },
      initialData: () => {
        const serverSideData = queryClient.getQueryData(catalogKey);

        return {
          pageParams: undefined,
          pages: serverSideData ? [serverSideData] : [],
        } as InfiniteData<IPagingResponse<IProduct>>;
      },
      // onSuccess: () => {},
      networkMode: 'always', // TODO: Implement offline plugin screen
    },
  );

  const productsPage: IPagingResponse<IProduct> = React.useMemo(() => {
    const res: IPagingResponse<IProduct> = {
      page: 1,
      total: productPages?.pages?.[0]?.total || 0,
      items:
        productPages?.pages
          ?.map((page) => {
            return page.items;
          })
          .flat() || [],
    };
    return res;
  }, [productPages?.pageParams]);

  return {
    productsPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
  };
}
