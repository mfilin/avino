import React from 'react';
import clsx from 'clsx';
import memoize from 'fast-memoize';
import { IClientCatalog } from '../../../../../../types/portal/client';
import { CatalogIcon } from '../../../../../elements';
import CatalogBlocks from '../CatalogBlocks';
import RightBracket from '../../../../../images/right-bracket.svg';
import { TIcon } from '../../../../../elements/CatalogIcon';

import styles from './CatalogMenu.module.scss';

interface IOwnProps {
  cache: IClientCatalog;
  onSelect(): void;
  isVisible: boolean;
}
const catalogSlugOrdered = [
  'whisky',
  'cognac-all',
  'vodka-all',
  'wine-all',
  'champagne-and-sparkling-wines',
  'spirits',
  'mixology',
  'waters',
  'glass-all',
];

const CatalogMenu: React.FC<IOwnProps> = (props) => {
  const { cache, isVisible, onSelect } = props;

  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(
    catalogSlugOrdered[0],
  );

  const connectSlugSelector = React.useMemo(() => {
    return memoize((slug) => () => {
      setSelectedSlug(slug);
    });
  }, [setSelectedSlug]);

  return (
    <div
      className={clsx(styles.CatalogMenu, {
        [styles.CatalogMenu_visible]: isVisible,
      })}
    >
      <div className={styles.MenuList}>
        {catalogSlugOrdered.map((code) => {
          const item = cache?.catalog[code];
          const selected = code === selectedSlug;
          if (!item) {
            return null;
          }
          return (
            <div
              key={code}
              className={clsx(styles.Row, { [styles.Row_selected]: selected })}
              onMouseEnter={connectSlugSelector(code)}
            >
              <div className={styles.Icon}>
                <CatalogIcon icon={code as TIcon} />
              </div>
              <div className={styles.Caption}>{item.label}</div>
              {selected && (
                <div className={styles.SelectedIndicator}>
                  <RightBracket />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className={styles.Blocks}>
        {selectedSlug && (
          <CatalogBlocks
            catalog={(cache?.catalog || {})[selectedSlug]}
            catalogKey={selectedSlug}
            onSelect={onSelect}
          />
        )}
      </div>
    </div>
  );
};

export default CatalogMenu;
