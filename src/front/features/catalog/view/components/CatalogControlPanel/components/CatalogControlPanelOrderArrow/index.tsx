import React from 'react';
import clsx from 'clsx';
import ArrowUp from '../../../../../../../images/arrow-up.svg';
import { TOrderType } from '../../../../../../../../types/portal/client';

import styles from './CatalogControlPanelOrderArrow.module.scss';

interface IOwnProps {
  orderType: undefined | TOrderType | 'ascdesc';
  className?: string;
}

const CatalogControlPanelOrderArrow: React.FC<IOwnProps> = (props) => {
  const { orderType, className } = props;

  switch (orderType) {
    case 'asc':
      return (
        <div className={clsx(styles.CatalogControlPanelOrderArrow, className)}>
          <ArrowUp />
        </div>
      );
    case 'desc':
      return (
        <div className={clsx(styles.CatalogControlPanelOrderArrow, className)}>
          <ArrowUp className={styles.ArrowDown} />
        </div>
      );
    case 'ascdesc':
      return (
        <div className={clsx(styles.CatalogControlPanelOrderArrow, className)}>
          <ArrowUp />
          <ArrowUp className={styles.ArrowDown} />
        </div>
      );
  }

  return null;
};

export default CatalogControlPanelOrderArrow;
