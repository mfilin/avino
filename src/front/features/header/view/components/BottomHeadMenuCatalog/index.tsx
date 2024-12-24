import React from 'react';
import clsx from 'clsx';
import {
  IClientCatalog,
  IMenuCatalog,
  TPopularProducts,
} from '../../../../../../types/portal/client';
import BottomHeadMenuCatalogBlocks from '../BottomHeadMenuCatalogBlocks';

import styles from './BottomHeadMenuCatalog.module.scss';

interface IOwnProps {
  menuCatalog: IClientCatalog['menu'];
  popularProducts: TPopularProducts;
  selectedItem: string | undefined;
  onClickMenuItem(): void;
}

const BottomHeadMenuCatalog: React.FC<IOwnProps> = (props) => {
  const { menuCatalog, selectedItem, popularProducts, onClickMenuItem } = props;

  return (
    <div className={styles.BottomHeadMenuCatalog}>
      {Object.entries(menuCatalog || {}).map((entry) => {
        const [key, item]: [string, IMenuCatalog] = entry;

        return (
          <div
            key={key}
            className={clsx(styles.BlocksArea, {
              [styles.BlocksArea_selected]: key === selectedItem,
            })}
          >
            <div className={styles.BlocksAreaContent}>
              <BottomHeadMenuCatalogBlocks
                items={item.items}
                active={key === selectedItem}
                catalogKey={key}
                popularProducts={popularProducts[key]}
                onClickMenuItem={onClickMenuItem}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BottomHeadMenuCatalog;
