import React from 'react';
import Router from 'next/router';
import { FiltersControl } from '../../../../class/FiltersControl';
import { routeSlugToArray } from '../../../utils/slug';
import { useRouteSlugsDecoded } from '../../../hooks/useRouteSlugsDecoded';

export function useFilters(
  baseCategory: string,
  filterSlug: Record<string, string | string[]> = {},
) {
  const slugs = useRouteSlugsDecoded();

  const [queryCategory] = slugs;
  const [currentFilters, setCurrentFilters] = React.useState<string[]>(
    slugs || [queryCategory],
  );
  // const [ currentFilters, setCurrentFilters ] = useFiltersState(queryFilters);

  const filtersControl = React.useMemo(() => {
    return FiltersControl.forDecodedSlugs(filterSlug);
  }, [filterSlug]);

  React.useEffect(() => {
    const handler = ({ category }) => {
      setCurrentFilters(routeSlugToArray(Router.query?.slug as string[]));
    };

    filtersControl.on('routeChangeComplete', handler);

    return () => {
      filtersControl.off('routeChangeComplete', handler);
    };
  }, [filtersControl]);

  return [filtersControl, currentFilters] as const;
}
