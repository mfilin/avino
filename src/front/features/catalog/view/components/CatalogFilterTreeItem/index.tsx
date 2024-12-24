import React from 'react';
import { IClientFiltersCatalogItemsCatalog } from '../../../../../../types/portal/client';
// import CatalogFilterTree from './components/CatalogFilterTree';
import CatalogFilterTreeTopLevel from './components/CatalogFilterTreeTopLevel';
import { useDeviceInfo } from '../../../../../hooks/device';

import styles from './CatalogFilterTreeItem.module.scss';

interface IOwnProps {
  category: string;
  addr: string;
  visibleCount?: number;
  filters: IClientFiltersCatalogItemsCatalog;
  onOpenCountryModal?(slug: string | undefined, addr: string): void;
}

const CatalogFilterTreeItem: React.FC<IOwnProps> = (props) => {
  const {
    category,
    addr,
    visibleCount = 6,
    filters,
    onOpenCountryModal,
  } = props;

  const { isMobile } = useDeviceInfo();

  const hasMore = React.useMemo(() => {
    return Object.keys(filters.tree).length > visibleCount;
  }, [filters.items, visibleCount]);

  const handleOpenCountryModalForSlug = React.useCallback(
    (slug?: string) => {
      onOpenCountryModal?.(slug, addr);
    },
    [onOpenCountryModal, addr],
  );

  const handleOpenCountryModal = React.useCallback(() => {
    onOpenCountryModal?.(undefined, addr);
  }, [onOpenCountryModal, addr]);

  return (
    <div className={styles.CatalogFilterTreeItem}>
      {!isMobile && <div className={styles.Label}>{filters.label}</div>}
      <div className={styles.Content}>
        <CatalogFilterTreeTopLevel
          treeItems={filters.tree}
          category={category}
          addr={addr}
          visibleCount={visibleCount}
          onOpenCountryModal={handleOpenCountryModalForSlug}
        />
        {/*<CatalogFilterTree*/}
        {/*items={filters.tree}*/}
        {/*category={category}*/}
        {/*addr={addr}*/}
        {/*/>*/}
      </div>
      {hasMore ? (
        <div onClick={handleOpenCountryModal} className={styles.MoreButton}>
          Еще
        </div>
      ) : null}
    </div>
  );
};

export default CatalogFilterTreeItem;
