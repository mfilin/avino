import React from 'react';
import memoize from 'fast-memoize';
import { ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import { useFiltersState } from '../../../hooks/useFiltersState';
import {
  IClientFiltersCatalogItemsCatalog,
  ISlugTree,
} from '../../../../../../types/portal/client';
import { FiltersContext } from '../../../context/filters';
import Input from '../../../../../elements/Input';
import { Button } from '../../../../../elements';
import CatalogFilterTreeRow from '../CatalogFilterTreeItem/components/CatalogFilterTreeRow';
import { ICheckboxChangeEvent } from '../../../../../elements/Checkbox';
import ArrowLeftForBreadcrumbSvg from '../../../../../images/arrow-left-for-breadcrumb.svg';
import CrossInCircleSvg from '../../../../../images/cross-in-circle.svg';
import CatalogFilterTreeTopLevelSubtreeSelected from '../CatalogFilterTreeItem/components/CatalogFilterTreeTopLevel/components/CatalogFilterTreeTopLevelSubtreeSelected';
import { useTopVisibleRows } from '../../../hooks/useTopVisibleRows';
import { IFiltersControl } from '../../../../../types/filters';

import styles from './CatalogFilterChooseCountryModalContent.module.scss';

interface IBreadcrumbPart {
  slug: string;
  label: string;
}

interface IOWnProps {
  catalog: IClientFiltersCatalogItemsCatalog;
  categoryKey: string;
  addr: string;
  selectedSlug: string;
  onClose(): void;
}

const CatalogFilterChooseCountryModalContent: React.FC<IOWnProps> = (props) => {
  const { catalog, categoryKey, addr, selectedSlug, onClose } = props;

  const [queryString, setQueryString] = React.useState('');
  const [currentPath, setCurrentPath] = React.useState(
    selectedSlug
      ? [{ slug: selectedSlug, label: catalog.tree[selectedSlug].label }]
      : [],
  );

  const filtersControl: IFiltersControl = React.useContext(FiltersContext);
  const filtersState = useFiltersState(filtersControl);

  const allLevelsSelectedSlugs = React.useMemo(
    () => filtersControl.getAllLevelsSelectedSlugs(categoryKey, addr),
    [filtersControl, categoryKey, addr],
  );

  const handleInputChange = React.useCallback((newValue: string) => {
    setQueryString(newValue.toLowerCase());
  }, []);

  const pathControl = React.useMemo(() => {
    let path: IBreadcrumbPart[] = [];

    return {
      next(slug: string, label: string) {
        path = path.concat({ slug, label } as IBreadcrumbPart);
        setCurrentPath(path);
      },
      setTo(index: number) {
        if (index > 0) {
          path = path.slice(0, index);
        } else {
          path = [];
        }
        setCurrentPath(path);
      },
      prev() {
        path = path.slice(0, -1);
        setCurrentPath(path);
      },
      reset() {
        path = [];
        setCurrentPath(path);
      },
    };
  }, [setCurrentPath]);

  const levelItems: ISlugTree['items'] = React.useMemo(() => {
    let cptr = catalog.tree;
    for (const part of currentPath) {
      cptr = cptr[part.slug].items;
    }
    return cptr as ISlugTree['items'];
  }, [currentPath]);

  const handleSelectRow = React.useMemo(() => {
    return memoize((slug) => (e: ICheckboxChangeEvent) => {
      if (e.target.checked) {
        filtersControl.addFilterValue(categoryKey, addr, slug, true);
      } else {
        filtersControl.deleteFilterValue(categoryKey, addr, slug, true);
      }
      // filtersControl.push(true);
    });
  }, [filtersControl, categoryKey, addr]);

  const handleApplyFilters = React.useCallback(() => {
    filtersControl.push(true);
    onClose();
  }, [filtersControl, onClose]);

  const handleChangeOpenState = React.useMemo(() => {
    return memoize((slug: string, label: string) => () => {
      pathControl.next(slug, label);
    });
  }, [pathControl]);

  const handleSelectBreadcrumb = React.useMemo(() => {
    return memoize((index: number) => () => {
      pathControl.setTo(index);
    });
  }, [pathControl]);

  const handleClearFilter = React.useCallback(() => {
    filtersControl.clearCategory(categoryKey, addr);
    onClose();
  }, [filtersControl, categoryKey, addr, onClose]);

  const checkSlugChecked = React.useCallback(
    (slug: string) => {
      return filtersControl.has(categoryKey, addr, slug);
    },
    [categoryKey, addr, filtersControl],
  );

  const sortedRows = useTopVisibleRows(levelItems, categoryKey, addr);

  const levelRows = React.useMemo(() => {
    return sortedRows
      .filter(
        (item: ISlugTree) => item.label.toLowerCase().indexOf(queryString) >= 0,
      )
      .map((item: ISlugTree) => {
        return (
          <div>
            <CatalogFilterTreeRow
              key={item.slug}
              checked={filtersControl.has(categoryKey, addr, item.slug)}
              label={item.label}
              count={item.count}
              hasChilds={Boolean(Object.keys(item.items || {}).length)}
              onCheck={handleSelectRow(item.slug)}
              onChangeOpenState={handleChangeOpenState(item.slug, item.label)}
            />
            {allLevelsSelectedSlugs.has(item.slug) ? (
              <div className={styles.RowChilds}>
                <CatalogFilterTreeTopLevelSubtreeSelected
                  branch={item.items}
                  selectedSlugs={allLevelsSelectedSlugs}
                  checkIsChecked={checkSlugChecked}
                  handleSelectRow={handleSelectRow}
                />
              </div>
            ) : null}
          </div>
        );
      });
  }, [
    sortedRows,
    levelItems,
    filtersState,
    filtersControl,
    handleSelectRow,
    handleChangeOpenState,
    queryString,
    checkSlugChecked,
  ]);

  return (
    <>
      <ModalHeader>Выберите страну</ModalHeader>
      <ModalBody className={styles.CatalogFilterChooseCountryModalContent}>
        <div className={styles.Breadcrumbs}>
          {currentPath.map((part: IBreadcrumbPart, index: number) => {
            return (
              <div
                key={part.slug}
                className={styles.Label}
                onClick={handleSelectBreadcrumb(index)}
              >
                <ArrowLeftForBreadcrumbSvg />
                <span>{part.label}</span>
              </div>
            );
          })}
        </div>
        <div>
          <Input onChange={handleInputChange} value={queryString} />
        </div>
        <div className={styles.SearchResultContent}>{levelRows}</div>
      </ModalBody>
      <ModalFooter className={styles.Actions}>
        <Button onClick={handleApplyFilters}>Применить фильтр</Button>
        <Button onClick={handleClearFilter} color={'orange-outline'}>
          <CrossInCircleSvg />
          Очистить фильтр
        </Button>
      </ModalFooter>
    </>
  );
};

export default CatalogFilterChooseCountryModalContent;
