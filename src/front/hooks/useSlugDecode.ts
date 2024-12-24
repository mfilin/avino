import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Api from '../api';
import { IDecodePortalSlugResult } from '../api/types/portal';

interface IDecodedSlugsResult {
  decodedSlugs: IDecodePortalSlugResult['slug'];
  parents: IDecodePortalSlugResult['parent'];
  isLoading: boolean;
}

export function useSlugDecode(
  ...slugs: string[] | string[][]
): IDecodedSlugsResult {
  const queryClient = useQueryClient();

  const finalSlugs = React.useMemo(() => {
    const out = (slugs || []).flat().filter(Boolean);
    return out.length ? out : null;
  }, [...slugs]);

  const queryKey = React.useMemo(() => {
    return ['slug-decode', finalSlugs].flat();
  }, [finalSlugs]);

  const { data: decodedSlugs, isLoading } = useQuery(
    queryKey,
    async () => {
      const cached = queryClient.getQueryData(queryKey);

      if (cached) {
        return cached;
      }

      const result: IDecodePortalSlugResult =
        await Api.instance.portal.decodeSlug.apply(
          Api.instance.portal,
          finalSlugs,
        );

      return result;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 10 * 60 * 1000, // 10 minutes
      initialData: () => {
        return queryClient.getQueryData(queryKey);
      },
      onSuccess: (data: IDecodePortalSlugResult) => {
        queryClient.setQueryData(queryKey, data);
      },
    },
  );

  return {
    decodedSlugs: decodedSlugs?.slug || {},
    parents: decodedSlugs?.parent || {},
    isLoading,
  };
}
