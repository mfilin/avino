import React from 'react';
import clsx from 'clsx';
import { IClientFiltersCatalogItemsCatalog } from '../../../../../../types/portal/client';
import { FiltersContext } from '../../../context/filters';
import { IFiltersControl } from '../../../../../types/filters';
import CatalogFiltersPriceRow from './components/CatalogFiltersPriceRow';
import { useFiltersState } from '../../../hooks/useFiltersState';
import CatalogFiltersPriceSlider from './components/CatalogFiltersPriceSlider';

import styles from './CatalogFiltersPriceItem.module.scss';

interface IOwnProps {
  addr: string;
  category: string;
  filters: IClientFiltersCatalogItemsCatalog;
}

const CatalogFiltersPriceItem: React.FC<IOwnProps> = (props) => {
  const { addr, category, filters } = props;

  const filtersControl: IFiltersControl = React.useContext(FiltersContext);
  const filtersState = useFiltersState(filtersControl);

  const rows = React.useMemo(() => {
    const sortedPrices: Array<number | undefined> = Object.keys(filters.items)
      .map((value) =>
        value === 'undefined' ? (value as undefined) : (+value as number),
      )
      .sort();

    return sortedPrices.map((price: number, index: number) => {
      if (index === 0) {
        return (
          <CatalogFiltersPriceRow
            key={price}
            category={category}
            addr={addr}
            priceTo={price}
            count={filters.items[price].count}
            filtersControl={filtersControl}
          />
        );
      }

      const prev = sortedPrices[index - 1];

      if (isNaN(+price)) {
        return (
          <CatalogFiltersPriceRow
            key={price}
            category={category}
            addr={addr}
            priceFrom={prev}
            count={filters.items[price].count}
            filtersControl={filtersControl}
          />
        );
      }

      return (
        <CatalogFiltersPriceRow
          key={price}
          category={category}
          addr={addr}
          priceFrom={prev}
          priceTo={price}
          count={filters.items[price].count}
          filtersControl={filtersControl}
        />
      );
    });
  }, [filters.items, filtersControl, filtersState]);

  return (
    <div className={styles.CatalogFiltersPriceItem}>
      <div className={styles.Caption}>{filters.label}</div>
      <div>{rows}</div>
      {false ? (
        <div className={styles.RangeSlider}>
          <CatalogFiltersPriceSlider
            category={category}
            min={filters.min}
            max={filters.max}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CatalogFiltersPriceItem;
