import React from 'react';
import { FiltersContext } from '../context/filters';
import { ISlugTree } from '../../../../types/portal/client';
import { IFiltersControl } from '../../../types/filters';

export function useTopVisibleRows(
  treeItems: ISlugTree['items'],
  category: string,
  addr: string,
  visibleCount: number | undefined = undefined,
): Array<ISlugTree> {
  const filtersControl: IFiltersControl = React.useContext(FiltersContext);

  // Needed for to reload cache when filters changed
  const currentFiltersStringCache: string = Array.from(
    filtersControl.get(category, addr),
  ).join();

  const topVisibleRows = React.useMemo(() => {
    const nextItems = { ...treeItems };
    const selectedRootSlugs = new Set();

    Array.from(filtersControl.get(category, addr)).forEach((slug: string) => {
      const rootElement =
        filtersControl.getParents(category, addr, slug)?.[0] || slug;
      delete nextItems[rootElement];
      selectedRootSlugs.add(rootElement);
    });

    const res = Array.from(selectedRootSlugs)
      .sort((slugA: string, slugB: string) => {
        const labelA = treeItems[slugA]?.label,
          labelB = treeItems[slugB]?.label;
        if (labelA < labelB) {
          return -1;
        }
        if (labelA > labelB) {
          return 1;
        }

        return 0;
      })
      .concat(Object.keys(nextItems))
      .filter((slug: string) => treeItems.hasOwnProperty(slug))
      .slice(0, visibleCount)
      .map((slug: string) => {
        return {
          ...treeItems[slug],
          slug,
        };
      });

    return res;
  }, [treeItems, visibleCount, currentFiltersStringCache]);

  return topVisibleRows;
}
