import React from 'react';
import {
  IClientCatalogCategory,
  TClientCatalogItem,
} from '../../../../../../types/portal/client';
import ShallowLink from '../../../../../elements/ShallowLink';
import { getCategoryURL } from '../../../../../utils/category';

import styles from './CatalogBlocks.module.scss';

interface IOwnProps {
  catalogKey: string;
  catalog: TClientCatalogItem;
  onSelect(): void;
}

const CatalogBlocks: React.FC<IOwnProps> = (props) => {
  const { catalog, catalogKey, onSelect } = props;

  return (
    <div className={styles.CatalogBlocks}>
      <div className={styles.Label}>{catalog?.label}</div>
      <div className={styles.Blocks}>
        {Object.entries(catalog?.items || []).map((entry) => {
          const [subCatSlug, item]: [string, IClientCatalogCategory] = entry;

          return (
            <div key={subCatSlug} className={styles.Block}>
              <div className={styles.BlockLabel} onClick={onSelect}>
                <ShallowLink href={`/${catalogKey}`}>{item.label}</ShallowLink>
              </div>
              <div className={styles.BlockItems}>
                {Object.entries(item.items || []).map((entry) => {
                  const [categorySlug, cat] = entry;

                  return (
                    <div
                      key={categorySlug}
                      className={styles.CatEntry}
                      onClick={onSelect}
                    >
                      <ShallowLink
                        // href={`/catalog/${catalogKey}/${subCatSlug}/${categorySlug}`}
                        href={getCategoryURL(
                          catalogKey,
                          item.addr,
                          categorySlug,
                        )}
                      >
                        {cat.label}
                      </ShallowLink>
                    </div>
                  );
                })}

                {item.hasMore ? (
                  <div className={styles.MoreBtn} onClick={onSelect}>
                    <ShallowLink href={getCategoryURL(catalogKey, item.addr)}>
                      посмотреть все
                    </ShallowLink>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CatalogBlocks;
