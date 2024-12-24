import React from 'react';
import memoize from 'fast-memoize';
import { ISlugTree } from '../../../../../../../../types/portal/client';
import CatalogFilterTreeRow from '../CatalogFilterTreeRow';
import { FiltersContext } from '../../../../../context/filters';
import { IFiltersControl } from '../../../../../../../types/filters';
import { ICheckboxChangeEvent } from '../../../../../../../elements/Checkbox';
import CatalogFilterTreeTopLevelSubtreeSelected from './components/CatalogFilterTreeTopLevelSubtreeSelected';
import { useTopVisibleRows } from '../../../../../hooks/useTopVisibleRows';

import styles from './CatalogFilterTreeTopLevel.module.scss';
import { useFiltersState } from '../../../../../hooks/useFiltersState';

interface IOwnProps {
  category: string;
  addr: string;
  treeItems: ISlugTree['items'];
  visibleCount?: number;
  onOpenCountryModal(slug: string): void;
}

const CatalogFilterTreeTopLevel: React.FC<IOwnProps> = (props) => {
  const {
    category,
    addr,
    treeItems,
    visibleCount = 6,
    onOpenCountryModal,
  } = props;

  const filtersControl: IFiltersControl = React.useContext(FiltersContext);
  const filtersState = useFiltersState(filtersControl);

  const allLevelsSelectedSlugs = React.useMemo(
    () => filtersControl.getAllLevelsSelectedSlugs(category, addr),
    [filtersControl, category, addr, filtersState],
  );

  const topVisibleRows = useTopVisibleRows(
    treeItems,
    category,
    addr,
    visibleCount,
  );
  // const topVisibleRows = useTopVisibleRows(treeItems, category, addr);

  const handleSelectRow = React.useMemo(() => {
    return memoize((slug) => (e: ICheckboxChangeEvent) => {
      if (e.target.checked) {
        filtersControl.addFilterValue(category, addr, slug);
      } else {
        filtersControl.deleteFilterValue(category, addr, slug);
      }
      filtersControl.push(true);
    });
  }, [filtersControl, category, addr]);

  const checkSlugChecked = React.useCallback(
    (slug: string) => {
      return filtersControl.has(category, addr, slug);
    },
    [category, addr, filtersControl],
  );

  const handleOpenCountryModal = React.useMemo(() => {
    return memoize((slug: string) => () => {
      onOpenCountryModal(slug);
    });
  }, [onOpenCountryModal]);

  // console.log(filtersControl.get(category, addr));
  // Array.from(filtersControl.get(category, addr)).forEach((slug) => {
  //   console.log(slug, filtersControl.getParents(category, addr, slug));
  // });

  const subtreeClassNamePrefix = 'virtual-tree';
  return (
    <div className={styles.CatalogFilterTreeTopLevel}>
      {(topVisibleRows || []).map((item) => {
        return (
          <div key={item.slug}>
            <CatalogFilterTreeRow
              checked={filtersControl.has(category, addr, item.slug)}
              label={item.label}
              count={item.count}
              hasChilds={Boolean(Object.keys(item.items || {}).length)}
              isBold={allLevelsSelectedSlugs.has(item.slug)}
              // isOpen={allLevelsSelectedSlugs.has(item.slug)}
              classNamePrefix={subtreeClassNamePrefix}
              onCheck={handleSelectRow(item.slug)}
              onChangeOpenState={handleOpenCountryModal(item.slug)}
            />
            {allLevelsSelectedSlugs.has(item.slug) ? (
              <div className={styles.Childs}>
                <CatalogFilterTreeTopLevelSubtreeSelected
                  branch={item.items}
                  selectedSlugs={allLevelsSelectedSlugs}
                  checkIsChecked={checkSlugChecked}
                  handleSelectRow={handleSelectRow}
                  classNamePrefix={subtreeClassNamePrefix}
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default CatalogFilterTreeTopLevel;
