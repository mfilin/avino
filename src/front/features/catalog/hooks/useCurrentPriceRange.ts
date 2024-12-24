import React from 'react';
import { FiltersContext } from '../context/filters';
import { priceParser } from '../../../../utils/priceParser';
import { IFiltersControl } from '../../../types/filters';

export function useCurrentPriceRange(category: string): {
  from?: number;
  to?: number;
} {
  const filtersControl: IFiltersControl = React.useContext(FiltersContext);
  const filterSet = filtersControl.get(category, 'product.price');

  const prices = React.useMemo(() => {
    return priceParser(Array.from(filterSet));
  }, [Array.from(filterSet).join()]);

  return prices;
}
