import React from 'react';
import clsx from 'clsx';
import ShallowLink from '../../../../../elements/ShallowLink';
import {
  IMenuCatalogItem,
  IMenuCatalogItemCatalog,
} from '../../../../../../types/portal/client';

import styles from './CatalogPriceButtons.module.scss';

type TPriceType = 'under' | 'between';

interface IPriceItem {
  label: string;
  type: TPriceType;
  key: string;
  cnt?: number;
}

interface IOwnProps {
  item: IMenuCatalogItemCatalog;
  catalogKey: string;
}

const CatalogPriceButtons: React.FC<IOwnProps> = (props) => {
  const { item, catalogKey } = props;

  const blocks: IPriceItem[] = React.useMemo(() => {
    const { ['undefined']: other, ...restItems } = item.items;

    return Object.entries(restItems)
      .sort(
        ([a]: [string, IMenuCatalogItem], [b]: [string, IMenuCatalogItem]) => {
          return a < b ? -1 : a > b ? 1 : 0;
        },
      )
      .map((entry: [string, IMenuCatalogItem], index, arr) => {
        const prev = arr[index - 1];

        const label = prev
          ? `${prev[1].label} - ${entry[1].label}`
          : entry[1].label;

        return {
          key: entry[0],
          type: prev ? 'between' : 'under',
          label,
          cnt: entry[1].count,
        };
      });
  }, [item.items]);

  return (
    <div className={styles.CatalogPriceButtons}>
      {blocks.map((block) => {
        // console.log(block.key);
        return (
          <ShallowLink
            href={`/${catalogKey}/price/${block.key}`}
            key={block.key}
          >
            <div className={styles.Button}>
              {`${block.type === 'under' ? 'до ' : ''}${block.label} ₽`}
            </div>
          </ShallowLink>
        );
      })}
      <ShallowLink href={`/${catalogKey}`}>
        <div className={clsx(styles.Button, styles.Button_other)}>
          Показать все товары
        </div>
      </ShallowLink>
    </div>
  );
};

export default CatalogPriceButtons;
