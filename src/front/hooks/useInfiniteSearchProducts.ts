import React from 'react';
import {
  useInfiniteQuery,
  useQueryClient,
  InfiniteData,
} from '@tanstack/react-query';
import Api from '../api';
import { IProduct } from '../api/types/product';
import { IPagingResponse } from '../api/types/shared';
import { PAGE_COUNT_SETTING } from '../../const';

export function useInfiniteSearchProducts(
  query: string,
  page: string = undefined,
  order: string = undefined,
  orderDesc: string = undefined,
  size: number = PAGE_COUNT_SETTING[0],
) {
  const queryClient = useQueryClient();
  const searchQueryKey = [
    'search-products-mobile',
    query || '',
    page || '',
    order || '',
    orderDesc || '',
    size,
  ];

  const {
    data: productPages,
    fetchNextPage,
    isLoading,
    isFetching,
    error,
  } = useInfiniteQuery(
    searchQueryKey,
    async ({ pageParam = 1 }) => {
      const queryPage = pageParam || 1;
      const cache: InfiniteData<IPagingResponse<IProduct>> =
        queryClient.getQueryData<InfiniteData<IPagingResponse<IProduct>>>(
          searchQueryKey,
        );

      if (cache?.pages[queryPage - 1]) {
        return cache.pages[queryPage - 1];
      }

      const result = await Api.instance.product.queryProducts(query, {
        page: queryPage,
        order,
        orderDesc,
        size,
      });

      return result;
    },
    {
      getNextPageParam(
        lastPage: IPagingResponse<IProduct>,
        allPages: Array<IPagingResponse<IProduct>>,
      ) {
        if (!lastPage) {
          return undefined;
        }
        const lastPageIndex = Number(lastPage.page);
        const total = Number(lastPage.total);
        const maxPages = Math.ceil(total / size);

        if (lastPageIndex < maxPages) {
          return lastPageIndex + 1;
        }
        return undefined;
      },
      getPreviousPageParam(
        firstPage: IPagingResponse<IProduct>,
        allPages: Array<IPagingResponse<IProduct>>,
      ) {
        if (!firstPage) {
          return undefined;
        }
        return Number(firstPage.page) - 1;
      },
    },
  );

  const productsPage = React.useMemo(() => {
    const res = {
      page: 1,
      total: productPages?.pages?.[0].total || 0,
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
    isLoading,
    error,
  };
}
