import React from 'react';
import clsx from 'clsx';
import memoize from 'fast-memoize';
import { TCatalogListType } from '../../../namespace';

import ItemsAsHorizontalBlocksSvg from '../../../../../images/catalog/items-as-horizontal-blocks.svg';
import ItemsAsRectBlocksSvg from '../../../../../images/catalog/items-as-rect-blocks.svg';

import styles from './CatalogSettingsBar.module.scss';

interface IOwnProps {
  pageCountSetting: number[];
  pageSize: number;
  listType: TCatalogListType;
  onChangePageSize(pageSize: number): void;
  onChangeListType(listType: TCatalogListType): void;
}

const CatalogSettingsBar: React.FC<IOwnProps> = (props) => {
  const {
    pageCountSetting,
    listType,
    pageSize,
    onChangePageSize,
    onChangeListType,
  } = props;

  const handleChangePageSize = React.useMemo(() => {
    return memoize((pageSizeNum: number) => () => {
      onChangePageSize(pageSizeNum);
    });
  }, [onChangePageSize]);

  const handleChangeListType = React.useMemo(() => {
    return memoize((listType: TCatalogListType) => () => {
      onChangeListType(listType);
    });
  }, [onChangeListType]);

  return (
    <div className={styles.CatalogSettingsBar}>
      <div className={styles.PageCounter}>
        Товаров на странице:
        {pageCountSetting.map((num) => {
          return (
            <div
              key={num}
              className={clsx(styles.PageSizeBtn, {
                [styles.PageSizeBtn_selected]: num == pageSize,
              })}
              onClick={handleChangePageSize(num)}
            >
              {num}
            </div>
          );
        })}
      </div>

      <div className={styles.CatalogTypeBtns}>
        <ItemsAsRectBlocksSvg
          className={clsx(styles.CatalogTypeBtn, {
            [styles.CatalogTypeBtn_selected]: listType === 'blocks',
          })}
          onClick={handleChangeListType('blocks')}
        />
        <ItemsAsHorizontalBlocksSvg
          className={clsx(styles.CatalogTypeBtn, {
            [styles.CatalogTypeBtn_selected]: listType === 'hor-cards',
          })}
          onClick={handleChangeListType('hor-cards')}
        />
      </div>
    </div>
  );
};

export default CatalogSettingsBar;
