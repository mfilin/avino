import React from 'react';
import {
  IClientFiltersCatalogItem,
  IClientFiltersCatalogItemExtended,
  IClientFiltersCatalogItemsCatalog,
} from '../../../../../../../../types/portal/client';
import CaretToLeft from '../../../../../../../images/mobileHeader/caret-to-left.svg';
import Search from '../../../../../../../images/mobileHeader/search.svg';
import CatalogFilterModalColumn from '../../../CatalogFilterModalContent/components/CatalogFilterModalColumn';
import { useForm } from 'react-hook-form';
import Input from '../../../../../../../components/Input';
import Text from '../../../../../../../components/Typography/Text';
import { IFiltersControl } from '../../../../../../../types/filters';

import styles from './CatalogFiltersDrawerSingleFilterContent.module.scss';

interface IOwnProps {
  categoryKey: string;
  selectedCatalog: IClientFiltersCatalogItemsCatalog;
  filtersControl: IFiltersControl;
  onClose(): void;
}

const CatalogFiltersDrawerSingleFilterContent: React.FC<IOwnProps> = (
  props,
) => {
  const { onClose, selectedCatalog, categoryKey, filtersControl } = props;
  const [queryString, setQueryString] = React.useState(null);

  const { control, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const handleSubmitSearchForm = React.useCallback(
    (data: Record<string, string>) => {
      setQueryString(data.query);
    },
    [],
  );

  const handleCloseSearchBlock = React.useCallback(() => {
    onClose();
    // setSelectedFilterToSearch(null);
    setQueryString('');
  }, []);

  const filteredRows: IClientFiltersCatalogItemExtended[] =
    React.useMemo(() => {
      if (!selectedCatalog) {
        return [];
      }
      let entries = Object.entries(selectedCatalog.items);

      if (queryString) {
        entries = entries.filter(([slug, item]) => {
          return (
            item.label.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
          );
        });
      }

      return entries.map(
        ([slug, item]: [string, IClientFiltersCatalogItem]) => {
          return {
            ...item,
            slug,
          };
        },
      );
    }, [queryString, selectedCatalog]);

  return (
    <div className={styles.CatalogFiltersDrawerSingleFilterContent}>
      <div className={styles.ToMenuBtn} onClick={handleCloseSearchBlock}>
        <CaretToLeft />
        <Text level="s17h15w700" colorMode="grey">
          Фильтр
        </Text>
      </div>
      <form
        className={styles.SearchBar}
        onSubmit={handleSubmit(handleSubmitSearchForm)}
      >
        <Input
          control={control}
          name="query"
          placeholder="Поиск по фильтрам"
          className={styles.SearchInput}
        />
        <div
          className={styles.SearchIcon}
          onClick={handleSubmit(handleSubmitSearchForm)}
        >
          <Search />
        </div>
      </form>
      <Text level="s15h15w700" className={styles.CategoryTitle}>
        ВЫБЕРИТЕ ЗНАЧЕНИЕ: {selectedCatalog?.label}
      </Text>
      <div className={styles.ItemsList}>
        <CatalogFilterModalColumn
          items={filteredRows}
          category={categoryKey}
          addr={selectedCatalog?.cat}
          filtersControl={filtersControl}
        />
      </div>
    </div>
  );
};

export default CatalogFiltersDrawerSingleFilterContent;
