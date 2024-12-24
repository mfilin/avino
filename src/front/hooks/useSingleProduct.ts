import React from 'react';
import Api from '../api';
import { IProductGroup } from '../api/types/product';
import {
  useQuery,
  useQueryClient,
  QueryFunctionContext,
  UseQueryResult,
} from '@tanstack/react-query';

export interface ISingleProductRes {
  productGroup: IProductGroup;
  isFetching: boolean;
  isLoading: boolean;
  refetch: (options: {
    throwOnError: boolean;
    cancelRefetch: boolean;
  }) => Promise<UseQueryResult>;
}

/**
 * Single product request processor
 *
 * You will get product group cached in local storage
 * Cache time (by default): 5 minutes
 *
 * If cache expired, product group will get from api
 *
 * @param {string | number} id
 * @return {ISingleProductRes}
 */
export function useSingleProduct(id: string | number): ISingleProductRes {
  const queryClient = useQueryClient();

  const { data, isFetching, isLoading, refetch } = useQuery(
    ['productGroup', String(id)],
    async (ctx: QueryFunctionContext): Promise<IProductGroup> => {
      if (Boolean(id)) {
        const cached: IProductGroup = queryClient.getQueryData<IProductGroup>([
          'productGroup',
          String(id),
        ]);

        if (cached) {
          return cached;
        }

        const res = await Api.instance.product.loadGroupForProduct(id);
        // TODO: Think about queryCache, may be it would be better to setup query cache here, nor of onSuccess callback
        return res;
      }

      return null;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      // cacheTime: Infinity,
      // TODO: Extract parameter to global config
      cacheTime: 5 * 60 * 1000, // 5 minutes
      initialData: () => {
        // Initial data will be read from the cache
        const cachedData = queryClient.getQueryData([
          'productGroup',
          String(id),
        ]);

        if (cachedData) {
          return cachedData;
        }

        return undefined;
      },
      onSuccess: (data: IProductGroup) => {
        data?.products.forEach((product) => {
          queryClient.setQueryData(['productGroup', String(product.id)], data);
        });
      },
    },
  );

  return {
    productGroup: data,
    isLoading,
    isFetching,
    refetch,
  };
}
