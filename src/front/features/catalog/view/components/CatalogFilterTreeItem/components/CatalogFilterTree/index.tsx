import React from 'react';
import clsx from 'clsx';
import { ISlugTree } from '../../../../../../../../types/portal/client';
import { ICheckboxChangeEvent } from '../../../../../../../elements/Checkbox';
import { IFiltersControl } from '../../../../../../../types/filters';
import CatalogFilterTreeRow from '../CatalogFilterTreeRow';
import { useFiltersState } from '../../../../../hooks/useFiltersState';

import styles from './CatalogFilterTree.module.scss';

interface IOwnProps {
  categoryKey: string;
  addr: string;
  slug?: string;
  slugTree?: Omit<ISlugTree, 'items'>;
  items: ISlugTree['items'];
  filtersControl: IFiltersControl;
}

const CatalogFilterTree: React.FC<IOwnProps> = (props) => {
  const { items, slugTree, categoryKey, addr, slug, filtersControl } = props;
  const { count, label } = slugTree || {};
  const [isOpen, setIsOpen] = React.useState(false);
  const filtersState = useFiltersState(filtersControl, categoryKey, slug);

  const allLevelsSelectedSlugs: Set<string> = React.useMemo(
    () => filtersControl.getAllLevelsSelectedSlugs(categoryKey, addr),
    [filtersControl, categoryKey, addr, filtersState],
  );

  const handleSelectRow = React.useCallback(
    (e: ICheckboxChangeEvent) => {
      if (e.target.checked) {
        filtersControl.addFilterValue(categoryKey, addr, slug, true);
      } else {
        filtersControl.deleteFilterValue(categoryKey, addr, slug, true);
      }
    },
    [props.slugTree, categoryKey, addr, slug],
  );

  const changeOpenState = React.useMemo(() => {
    let isOpen = false;

    return () => {
      isOpen = !isOpen;
      setIsOpen(isOpen);
    };
  }, [setIsOpen]);

  const childs: React.ReactNode[] = React.useMemo(() => {
    return Object.keys(items || []).map((slug: string) => {
      const item: ISlugTree = items[slug];
      return (
        <CatalogFilterTree
          key={slug}
          slug={slug}
          slugTree={item}
          items={item.items}
          categoryKey={categoryKey}
          addr={addr}
          filtersControl={filtersControl}
        />
      );
    });
  }, [items, categoryKey, addr, slug, filtersControl, filtersState]);

  const shouldShowChilds = isOpen || allLevelsSelectedSlugs?.has(slug);

  return (
    <div className={styles.CatalogFilterTree}>
      {props.slugTree ? (
        <>
          <CatalogFilterTreeRow
            checked={filtersControl.has(categoryKey, addr, slug)}
            label={label}
            count={count}
            hasChilds={Boolean(Object.keys(items || {}).length)}
            isOpen={shouldShowChilds}
            onCheck={handleSelectRow}
            onChangeOpenState={changeOpenState}
          />
          <div
            className={clsx(styles.Childs, {
              [styles.Childs_visible]: shouldShowChilds,
            })}
          >
            {childs}
          </div>
        </>
      ) : (
        childs
      )}
    </div>
  );
};

export default CatalogFilterTree;
