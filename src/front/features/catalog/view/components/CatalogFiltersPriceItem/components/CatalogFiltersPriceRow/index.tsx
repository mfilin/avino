import React from 'react';
import clsx from 'clsx';
import { IFiltersControl } from '../../../../../../../types/filters';
import { formatPriceString } from '../../../../../../../utils/price';

import styles from './CatalogFiltersPriceRow.module.scss';

interface IOwnProps {
  category: string;
  addr: string;
  priceFrom?: number;
  priceTo?: number;
  count: number;
  filtersControl: IFiltersControl;
}

const CatalogFiltersPriceRow: React.FC<IOwnProps> = (props) => {
  const { category, addr, priceFrom, priceTo, count, filtersControl } = props;

  const rowType = React.useMemo(() => {
    if (!priceFrom) {
      if (priceTo) {
        return `price-to`;
      } else {
        throw new Error(`priceTo and priceFrom not defined`);
      }
    } else {
      if (priceTo) {
        return `price`;
      } else {
        return `price-from`;
      }
    }
  }, [priceFrom, priceTo]);

  const priceSlug = React.useMemo(() => {
    switch (rowType) {
      case 'price':
        return `${rowType}-${priceFrom}-${priceTo}`;
      case 'price-from':
        return `${rowType}-${priceFrom}`;
      case 'price-to':
        return `${rowType}-${priceTo}`;
    }
  }, [rowType, priceFrom, priceTo]);

  const handleClick = React.useCallback(() => {
    if (filtersControl.has(category, addr, priceSlug)) {
      filtersControl.deleteFilterValue(category, addr, priceSlug);
    } else {
      filtersControl.addFilterValue(category, addr, priceSlug);
    }
  }, [category, addr, priceSlug, filtersControl]);

  return (
    <div className={styles.CatalogFiltersPriceRow}>
      <div
        className={clsx(styles.Label, {
          [styles.Label_selected]: filtersControl.has(
            category,
            addr,
            priceSlug,
          ),
        })}
        onClick={handleClick}
      >
        {rowType === 'price-to' ? (
          <>До {formatPriceString(priceTo, { maximumFractionDigits: 0 })}</>
        ) : null}
        {rowType === 'price-from' ? (
          <>От {formatPriceString(priceFrom, { maximumFractionDigits: 0 })}</>
        ) : null}
        {rowType === 'price' ? (
          <>
            {formatPriceString(priceFrom, {
              style: 'decimal',
              maximumFractionDigits: 0,
            })}
            -{formatPriceString(priceTo, { maximumFractionDigits: 0 })}
          </>
        ) : null}
      </div>
      <span className={styles.Count}>{count}</span>
    </div>
  );
};

export default CatalogFiltersPriceRow;
