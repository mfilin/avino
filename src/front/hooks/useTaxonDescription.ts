import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Api from '../api';

export function useTaxonDescription(...descriptionKeys: string[]) {
  const queryClient = useQueryClient();
  const queryKey = ['descriptions', descriptionKeys];

  const defaultTaxonDescription = React.useMemo(() => {
    const result = {};

    Array.from(descriptionKeys)
      .flat()
      .forEach((slug) => {
        result[slug] = result[slug] || {
          descr: null,
          site_url: null,
        };
      });

    return result;
  }, [descriptionKeys]);

  const { data: taxonsDescription, isLoading } = useQuery(
    queryKey,
    async () => {
      const cached = queryClient.getQueryData(queryKey);

      if (cached) {
        return cached;
      }

      const result = await Api.instance.portal.decodeTaxons(descriptionKeys);

      // If needed, we can fulfill output object (undefined properties read safe)

      // Array.from(descriptionKeys).flat().forEach(slug => {
      //   result[slug] = result[slug] || {
      //     descr: null,
      //     site_url: null,
      //   };
      // });

      return result;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 10 * 60 * 1000, // 10 minutes
      initialData: () => {
        return queryClient.getQueryData(queryKey);
      },
      onSuccess: (data: Record<string, string>) => {
        queryClient.setQueryData(queryKey, data);
      },
    },
  );

  return {
    description: taxonsDescription || defaultTaxonDescription,
    isLoading,
  };
}
