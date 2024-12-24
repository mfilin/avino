import React from 'react';
import styles from './CatalogFilterBlockDropdown.module.scss';
import { IClientFiltersCatalogItemsCatalog } from '../../../../../../types/portal/client';
import Text from '../../../../../components/Typography/Text';
import CaretIcon from '../../../../../images/caret-down-14-7.svg';
import CatalogFilterTreeItem from '../CatalogFilterTreeItem/index';
import CatalogFilterBlockItem from '../CatalogFilterBlockItem/index';
import clsx from 'clsx';
import CatalogFilterTree from '../CatalogFilterTreeItem/components/CatalogFilterTree';
import { IFiltersControl } from '../../../../../types/filters';
import { FiltersContext } from '../../../context/filters';

interface IOwnProps {
  categoryKey: string;
  addr: string;
  filters: IClientFiltersCatalogItemsCatalog;
  visibleCount?: number;
  onOpenDictionary(blockKey: string): void;
  onSelectItem?(blockKey: string, slug: string, checked: boolean): void;
}

const CatalogFilterBlockDropdown: React.FC<IOwnProps> = ({
  addr,
  filters,
  categoryKey,
  visibleCount = 6,
  onSelectItem,
  onOpenDictionary,
}) => {
  const [openDropdown, setOpenDropdown] = React.useState<boolean>(false);
  const handleToggleDropdown = React.useCallback(() => {
    setOpenDropdown((prev) => !prev);
  }, []);

  const filtersControl: IFiltersControl = React.useContext(FiltersContext);

  return (
    <div
      className={clsx(styles.CatalogFilterBlockDropdown, {
        [styles.Opened]: openDropdown,
      })}
    >
      <div className={styles.Header} onClick={handleToggleDropdown}>
        <Text level="s15h15w700" colorMode="grey">
          {filters.label}
        </Text>
        <CaretIcon />
      </div>

      {openDropdown && (
        <div className={styles.DropdownContent}>
          {addr === 'taxons.country' || filters.tree ? (
            <>
              <CatalogFilterTree
                categoryKey={categoryKey}
                addr={addr}
                items={filters.tree}
                filtersControl={filtersControl}
              />
              {/*<CatalogFilterTreeItem*/}
              {/*key={addr}*/}
              {/*addr={addr}*/}
              {/*category={category}*/}
              {/*filters={filters}*/}
              {/*visibleCount={visibleCount}*/}
              {/*/>*/}
            </>
          ) : (
            <CatalogFilterBlockItem
              key={addr}
              category={categoryKey}
              addr={addr}
              filters={filters}
              onOpenDictionary={onOpenDictionary}
              visibleCount={visibleCount}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default CatalogFilterBlockDropdown;
