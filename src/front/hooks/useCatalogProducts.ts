import React from 'react';
import Api from '../api';
import { IPagingResponse } from '../api/types/shared';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IProduct } from '../api/types/product';
import { PAGE_COUNT_SETTING } from '../../const';

export function useCatalogProducts(
  filters: string[],
  page: string = '',
  order: string = '',
  orderDesc: string = '',
  pageSize: number = PAGE_COUNT_SETTING[0],
) {
  const queryClient = useQueryClient();
  const catalogKey = ['products', filters, page, order, orderDesc, pageSize];

  const {
    data: productsPage,
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

      const result = await Api.instance.product.loadProducts(filters, {
        page: page as string,
        order: order as string,
        orderDesc: orderDesc as string,
        size: pageSize,
      });

      return result;
    },
    {
      initialData: (): IPagingResponse<IProduct> => {
        const serverSideData = queryClient.getQueryData(catalogKey);
        return serverSideData as IPagingResponse<IProduct>;
      },
      networkMode: 'always', // TODO: Implement offline plugin screen
    },
  );

  return {
    productsPage,
    isLoading,
    error,
    refetch,
  };
}
