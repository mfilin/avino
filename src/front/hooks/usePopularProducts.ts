import React from 'react';
import Api from '../api';
import { IPagingResponse } from '../api/types/shared';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IProduct } from '../api/types/product';
import { PAGE_COUNT_SETTING } from '../../const';

export function usePopularProducts(
  category: string,
  pageSize: number = PAGE_COUNT_SETTING[0],
) {
  const queryClient = useQueryClient();
  const catalogKey = ['popular-products', category, pageSize];

  const {
    data: productsPageSource,
    isLoading,
    error,
    refetch,
    isStale,
    isLoadingError,
  } = useQuery<IPagingResponse<IProduct>>(
    catalogKey,
    async (): Promise<IPagingResponse<IProduct>> => {
      const cached = queryClient.getQueryData(catalogKey);

      if (cached) {
        return cached as IPagingResponse<IProduct>;
      }

      const result = await Api.instance.product.loadProducts([category], {
        page: 1,
        order: 'is_hit',
        size: pageSize,
      });

      return result;
    },
    {
      initialData: (): IPagingResponse<IProduct> => {
        const serverSideData = queryClient.getQueryData(catalogKey);
        return serverSideData as IPagingResponse<IProduct>;
      },
      onSuccess: (data: IPagingResponse<IProduct>) => {
        queryClient.setQueryData(catalogKey, data);
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 10 * 60 * 1000,
      networkMode: 'always', // TODO: Implement offline plugin screen
    },
  );

  const products: IProduct[] = React.useMemo(() => {
    return productsPageSource?.items || [];
  }, [productsPageSource?.items]);

  return {
    products,
    isLoading,
    error,
    refetch,
  };
}
