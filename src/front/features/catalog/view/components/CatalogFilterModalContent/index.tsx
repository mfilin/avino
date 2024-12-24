import React from 'react';
import {
  IClientFiltersCatalogItem,
  IClientFiltersCatalogItemExtended,
  IClientFiltersCatalogItemsCatalog,
} from '../../../../../../types/portal/client';
import { ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import { Button } from '../../../../../elements';
import CatalogFilterModalColumn from './components/CatalogFilterModalColumn';
import { FiltersContext } from '../../../context/filters';
import { IFiltersControl } from '../../../../../types/filters';
import Input from '../../../../../elements/Input';

import styles from './CatalogFilterModalContent.module.scss';

interface IOwnProps {
  catalog: IClientFiltersCatalogItemsCatalog;
  categoryKey: string;
  addr: string;
  onClose(): void;
}

const CatalogFilterModalContent: React.FC<IOwnProps> = (props) => {
  const { catalog, categoryKey, addr, onClose } = props;

  const filtersControl: IFiltersControl = React.useContext(FiltersContext);

  const oneColumnVisibleCount = 8;
  const doubleRowsColumn = oneColumnVisibleCount * 2;
  const [queryString, setQueryString] = React.useState('');

  React.useEffect(() => {
    return () => {
      filtersControl.resetVirtualFilters();
    };
  }, [filtersControl]);

  const filteredRows: IClientFiltersCatalogItemExtended[] =
    React.useMemo(() => {
      let entries = Object.entries(catalog.items);
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
    }, [queryString]);

  const handleInputChange = React.useCallback((newValue: string) => {
    setQueryString(newValue);
  }, []);

  const handleApplyFilters = React.useCallback(() => {
    filtersControl.push(true);
    onClose();
  }, [filtersControl, onClose]);

  const handleClearFilters = React.useCallback(() => {
    filtersControl.clearCategory(categoryKey, addr);
  }, [categoryKey, addr]);

  return (
    <>
      <ModalHeader>
        Выберите значение {catalog.label} ({filteredRows.length})
      </ModalHeader>
      <ModalBody className={styles.CatalogFilterModalContent}>
        <div>
          <Input onChange={handleInputChange} value={queryString} />
        </div>
        <div className={styles.RowsFrame}>
          {filteredRows.length > doubleRowsColumn ? (
            <>
              <CatalogFilterModalColumn
                items={filteredRows.slice(
                  0,
                  Math.floor(filteredRows.length / 2),
                )}
                category={categoryKey}
                addr={addr}
                filtersControl={filtersControl}
              />
              <CatalogFilterModalColumn
                items={filteredRows.slice(Math.floor(filteredRows.length / 2))}
                category={categoryKey}
                addr={addr}
                filtersControl={filtersControl}
              />
            </>
          ) : (
            <CatalogFilterModalColumn
              items={filteredRows}
              category={categoryKey}
              addr={addr}
              filtersControl={filtersControl}
            />
          )}
        </div>

        <div className={styles.CatalogFilterModalContentFooter}>
          <Button onClick={handleApplyFilters}>Применить фильтр</Button>
          <div className={styles.ClearButton} onClick={handleClearFilters}>
            Очистить фильтр
          </div>
        </div>
      </ModalBody>
      <ModalFooter></ModalFooter>
    </>
  );
};

export default CatalogFilterModalContent;
