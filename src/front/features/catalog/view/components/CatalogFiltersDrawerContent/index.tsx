import React from 'react';
import styles from './CatalogFiltersDrawerContent.module.scss';
import FilterIcon from '../../../../../images/filter-icon.svg';
import CrossIcon from '../../../../../images/cross-16.svg';
import Text from '../../../../../components/Typography/Text';
import {
  IClientFiltersCatalog,
  IClientFiltersCatalogItemsCatalog,
} from '../../../../../../types/portal/client';
import CatalogFilterBlockDropdown from '../CatalogFilterBlockDropdown/index';
import Button from 'src/front/components/Button';
import { IFiltersControl } from '../../../../../types/filters';
import CatalogFiltersDrawerSingleFilterContent from './components/CatalogFiltersDrawerSingleFilterContent';

interface IOwnProps {
  categoryKey: string;
  category: IClientFiltersCatalog;
  filtersControl: IFiltersControl;
  onClose: () => void;
}

const CatalogFiltersDrawerContent: React.FC<IOwnProps> = ({
  categoryKey,
  category,
  filtersControl,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const handleClearFilter = React.useCallback(() => {
    Object.keys(category.items).forEach((key) => {
      filtersControl.clearCategory(categoryKey, key);
    });
  }, [filtersControl]);

  const handleSubmitFilter = React.useCallback(() => {
    filtersControl.push(true);
  }, []);

  const handleCloseFilters = React.useCallback(() => {
    filtersControl.resetVirtualFilters();
    onClose();
  }, [onClose]);

  const handleClickMore = React.useCallback((blockKey?: string) => {
    setSelectedCategory(blockKey ?? null);
  }, []);

  return (
    <div className={styles.CatalogFiltersDrawerContent}>
      <div className={styles.Header}>
        <div className={styles.IconBlock}>
          <FilterIcon />
          <Text level="s14h16w600">Фильтр</Text>
        </div>
        <Text
          level="s14h16w600"
          colorMode="orange"
          className={styles.ClearFilter}
          onClick={handleClearFilter}
        >
          Очистить фильтр
        </Text>

        <div className={styles.CloseBtn} onClick={handleCloseFilters}>
          <CrossIcon />
        </div>
      </div>
      {selectedCategory ? (
        <CatalogFiltersDrawerSingleFilterContent
          categoryKey={categoryKey}
          selectedCatalog={category?.items[selectedCategory]}
          filtersControl={filtersControl}
          onClose={() => setSelectedCategory(null)}
        />
      ) : (
        <div className={styles.FiltersList}>
          {Object.entries(category?.items || {}).map(
            ([taxonKey, categoryFilters]: [
              string,
              IClientFiltersCatalogItemsCatalog,
            ]) => {
              return (
                <CatalogFilterBlockDropdown
                  key={taxonKey}
                  categoryKey={categoryKey}
                  addr={taxonKey}
                  filters={categoryFilters}
                  onOpenDictionary={handleClickMore}
                />
              );
            },
          )}
        </div>
      )}
      <div className={styles.FilterBtn}>
        <Button stretched color="orange-outline" onClick={handleSubmitFilter}>
          Применить фильтр
        </Button>
      </div>
    </div>
  );
};
export default CatalogFiltersDrawerContent;
