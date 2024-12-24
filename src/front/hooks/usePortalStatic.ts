import React from 'react';
import Api from '../api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IPageProps } from '../../types/portal/server';

export interface IPortalStaticRes {
  pageProps: IPageProps;
  isLoading?: boolean;
}

export function usePortalStatic(): IPortalStaticRes {
  const queryClient = useQueryClient();
  const queryKey = 'portal-static';

  const { data: pageProps, isLoading } = useQuery(
    [queryKey],
    async () => {
      const cached = queryClient.getQueryData([queryKey]);

      if (cached) {
        return cached;
      }

      const res = await Api.instance.portal.loadPortalStatic();
      return res;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 10 * 60 * 1000, // 10 minutes
      initialData: () => {
        return queryClient.getQueryData([queryKey]);
      },
      onSuccess: (data: IPageProps) => {
        queryClient.setQueryData([queryKey], data);
      },
    },
  );

  return {
    pageProps,
    isLoading,
  };
}
