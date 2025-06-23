import React from 'react';
import clsx from 'clsx';
import { IOrderControl } from '../../../../../../../types/filters';
import CatalogControlPanelOrderArrow from '../CatalogControlPanelOrderArrow';

import styles from './CatalogControlPanelSwitchers.module.scss';

interface ISortType {
  label: string;
  value: string[];
}

interface IOwnProps {
  sortTypes: Array<ISortType>;
  orderControl: IOrderControl;
}

const CatalogControlPanelSwitchers: React.FC<IOwnProps> = (props) => {
  const { sortTypes, orderControl } = props;

  return (
    <div className={styles.CatalogControlPanelSwitchers}>
      {sortTypes.map((type) => {
        return (
          <div
            key={type.label}
            className={clsx(styles.TransparentButton, {
              [styles.TransparentButton_checked]: orderControl.has(type.value),
            })}
            onClick={orderControl.handlerSwitch(type.value)}
          >
            {type.label}
            <CatalogControlPanelOrderArrow
              className={styles.ArrowIcon}
              orderType={orderControl.getFieldTypes(type.value)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CatalogControlPanelSwitchers;
