import React from 'react';
import clsx from 'clsx';
import memoize from 'fast-memoize';
import {
  IClientFiltersCatalogItem,
  IClientFiltersCatalogItemsCatalog,
} from '../../../../../../types/portal/client';
import Checkbox, {
  ICheckboxChangeEvent,
} from '../../../../../elements/Checkbox';
import { FiltersContext } from '../../../context/filters';
import { useFiltersState } from '../../../hooks/useFiltersState';
import { useDeviceInfo } from '../../../../../hooks/device';
import { IFiltersControl } from '../../../../../types/filters';

import styles from './CatalogFilterBlockItem.module.scss';

interface IOwnProps {
  category: string;
  addr: string;
  filters: IClientFiltersCatalogItemsCatalog;
  visibleCount?: number;
  onOpenDictionary(blockKey: string): void;
  onSelectItem?(blockKey: string, slug: string, checked: boolean): void;
}

const CatalogFilterBlockItem: React.FC<IOwnProps> = (props) => {
  const {
    addr,
    filters,
    category,
    visibleCount = 6,
    onSelectItem,
    onOpenDictionary,
  } = props;

  const { isMobile } = useDeviceInfo();

  const filtersControl: IFiltersControl = React.useContext(FiltersContext);
  const currentFiltersState = useFiltersState(filtersControl);

  // Checkbox change handler
  const handleSelectRow = React.useMemo(() => {
    return memoize((slug) => (e: ICheckboxChangeEvent) => {
      if (e.target.checked) {
        filtersControl.addFilterValue(
          category,
          addr,
          slug,
          isMobile ? true : false,
        );
      } else {
        filtersControl.deleteFilterValue(
          category,
          addr,
          slug,
          isMobile ? true : false,
        );
      }
      if (!isMobile) {
        filtersControl.push(true);
      }

      onSelectItem?.(addr, slug, e.target.checked);
    });
  }, [addr, onSelectItem, filtersControl]);

  const handleOpenDictionary = React.useCallback(() => {
    onOpenDictionary(addr);
  }, [addr]);

  const rows = React.useMemo(() => {
    return Object.entries(filters?.items || {});
  }, [filters?.items, visibleCount, currentFiltersState]);

  // console.log('[render CatalogFilterBlockItem]', { category, addr });
  return (
    <div
      className={clsx(styles.CatalogFilterBlockItem, {
        [styles.MobileView]: isMobile,
      })}
    >
      {!isMobile && <div className={styles.Label}>{filters.label}</div>}
      <div className={styles.Content}>
        {rows
          .slice(0, visibleCount)
          .map(
            ([filterKey, filterRowItem]: [
              string,
              IClientFiltersCatalogItem,
            ]) => {
              return (
                <div key={filterKey} className={styles.Row}>
                  <Checkbox
                    onChange={handleSelectRow(filterKey)}
                    checked={filtersControl.has(category, addr, filterKey)}
                  />{' '}
                  <span className={styles.RowLabel}>
                    {filterRowItem.label}{' '}
                  </span>
                  <span className={styles.Count}>{filterRowItem.count}</span>
                </div>
              );
            },
          )}
      </div>
      {rows.length > visibleCount ? (
        <div onClick={handleOpenDictionary} className={styles.MoreButton}>
          Еще
        </div>
      ) : null}
    </div>
  );
};

export default CatalogFilterBlockItem;
