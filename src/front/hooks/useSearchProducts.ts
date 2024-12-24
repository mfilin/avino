import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IPagingResponse } from '../api/types/shared';
import { IProduct } from '../api/types/product';
import Api from '../api';
import { PAGE_COUNT_SETTING } from '../../const';

export function useSearchProducts(
  query: string,
  page: string = undefined,
  order: string = undefined,
  orderDesc: string = undefined,
  size: number = PAGE_COUNT_SETTING[0],
) {
  const queryClient = useQueryClient();
  const searchQueryKey = [
    'search-products',
    query || '',
    page || '',
    order || '',
    orderDesc || '',
    size,
  ];

  const {
    data: productsPage,
    isLoading,
    error,
    isStale,
    isLoadingError,
  } = useQuery<IPagingResponse<IProduct>>(
    searchQueryKey,
    async (): Promise<IPagingResponse<IProduct>> => {
      const cached =
        queryClient.getQueryData<IPagingResponse<IProduct>>(searchQueryKey);

      if (cached) {
        return cached as IPagingResponse<IProduct>;
      }

      const result = await Api.instance.product.queryProducts(query, {
        page,
        order,
        orderDesc,
        size,
      });

      return result;
    },
    {
      initialData: (): IPagingResponse<IProduct> => {
        const serverSideData = queryClient.getQueryData(searchQueryKey);
        return serverSideData as IPagingResponse<IProduct>;
      },
      networkMode: 'always', // TODO: Implement offline plugin screen
    },
  );

  return {
    productsPage,
    isLoading,
    error,
  };
}
