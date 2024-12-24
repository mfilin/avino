import React from 'react';
import clsx from 'clsx';
import memoize from 'fast-memoize';
import { IClientFiltersCatalogItemExtended } from '../../../../../../../../types/portal/client';
import Checkbox, {
  ICheckboxChangeEvent,
} from '../../../../../../../elements/Checkbox';
import { IFiltersControl } from '../../../../../../../types/filters';
import { useFiltersState } from '../../../../../hooks/useFiltersState';
import { useDeviceInfo } from '../../../../../../../hooks/device';

import styles from './CatalogFilterModalColumn.module.scss';

interface IOwnProps {
  items: Array<IClientFiltersCatalogItemExtended>;
  category: string;
  addr: string;
  filtersControl: IFiltersControl;
}

const CatalogFilterModalColumn: React.FC<IOwnProps> = (props) => {
  const { items, category, addr, filtersControl } = props;
  const { isMobile } = useDeviceInfo();
  const filtersState = useFiltersState(filtersControl);
  // Checkbox change handler
  const handleSelectRow = React.useMemo(() => {
    return memoize((slug) => (e: ICheckboxChangeEvent) => {
      if (e.target.checked) {
        filtersControl.addFilterValue(category, addr, slug, true);
      } else {
        filtersControl.deleteFilterValue(category, addr, slug, true);
      }
    });
  }, [addr, filtersControl]);

  const rows = React.useMemo(() => {
    return items.map((item: IClientFiltersCatalogItemExtended) => {
      return (
        <div key={item.slug} className={styles.Row}>
          <Checkbox
            className={styles.CheckBox}
            checked={filtersControl.has(category, addr, item.slug)}
            onChange={handleSelectRow(item.slug)}
          />
          {item.label} <span className={styles.Count}>{item.count}</span>
        </div>
      );
    });
  }, [items, category, addr, filtersState]);

  return (
    <div
      className={clsx(styles.CatalogFilterModalColumn, {
        [styles.MobileView]: isMobile,
      })}
    >
      {rows}
    </div>
  );
};

export default CatalogFilterModalColumn;
