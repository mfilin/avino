import React from 'react';
import ShallowLink from '../../../../../elements/ShallowLink';
import { IMenuCatalogItem } from '../../../../../../types/portal/client';
import { getCategoryURL } from '../../../../../utils/category';

import styles from './BottomHeadMenuCatalogBlockItem.module.scss';

interface IOwnProps {
  catalogKey: string;
  catalogSlug: string;
  listLimit?: number;
  list: { [key: string]: IMenuCatalogItem };
  onClick(): void;
}

const BottomHeadMenuCatalogBlockItem: React.FC<IOwnProps> = (props) => {
  const { list, listLimit = 6, catalogKey, catalogSlug, onClick } = props;

  const items: React.ReactElement[] = React.useMemo(() => {
    return Object.entries(list).map((entry) => {
      const [key, item]: [string, IMenuCatalogItem] = entry;

      return (
        <div key={key} onClick={onClick}>
          <ShallowLink href={getCategoryURL(catalogKey, catalogSlug, key)}>
            {item.label}
          </ShallowLink>
        </div>
      );
    });
  }, [list]);

  return (
    <div className={styles.BottomHeadMenuCatalogBlockItem}>
      {items.slice(0, listLimit)}
      {items.length > listLimit && (
        <div className={styles.LinkMore}>
          <ShallowLink href={`/${catalogKey}`} onClick={onClick}>
            посмотреть все
          </ShallowLink>
        </div>
      )}
    </div>
  );
};

export default BottomHeadMenuCatalogBlockItem;
