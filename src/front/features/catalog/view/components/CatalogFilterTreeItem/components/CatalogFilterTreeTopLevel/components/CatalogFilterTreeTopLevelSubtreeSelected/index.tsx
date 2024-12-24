import React from 'react';
import { ISlugTree } from '../../../../../../../../../../types/portal/client';
import CatalogFilterTreeRow from '../../../CatalogFilterTreeRow';
import { ICheckboxChangeEvent } from '../../../../../../../../../elements/Checkbox';

import styles from './CatalogFilterTreeTopLevelSubtreeSelected.module.scss';

interface IOwnProps {
  branch: ISlugTree['items'];
  selectedSlugs: Set<string>;
  classNamePrefix?: string;
  checkIsChecked(slug: string): boolean;
  handleSelectRow(slug: string): (e: ICheckboxChangeEvent) => void;
}

const CatalogFilterTreeTopLevelSubtreeSelected: React.FC<IOwnProps> = (
  props,
) => {
  const {
    branch,
    selectedSlugs,
    classNamePrefix,
    checkIsChecked,
    handleSelectRow,
  } = props;

  return (
    <div className={styles.CatalogFilterTreeTopLevelSubtreeSelected}>
      {Object.keys(branch)
        .filter((slug) => selectedSlugs.has(slug))
        .map((slug) => {
          const hasChilds =
            Object.keys(branch[slug].items).filter((childSlug) =>
              selectedSlugs.has(childSlug),
            ).length > 0;

          return (
            <div key={slug}>
              <CatalogFilterTreeRow
                checked={checkIsChecked(slug)}
                label={branch[slug].label}
                count={branch[slug].count}
                // hasChilds={hasChilds}
                hasChilds={false}
                isOpen={hasChilds}
                classNamePrefix={classNamePrefix}
                onCheck={handleSelectRow(slug)}
                onChangeOpenState={() => void 0}
              />
              {hasChilds ? (
                <div className={styles.Childs}>
                  <CatalogFilterTreeTopLevelSubtreeSelected
                    branch={branch[slug].items}
                    selectedSlugs={selectedSlugs}
                    checkIsChecked={checkIsChecked}
                    handleSelectRow={handleSelectRow}
                    classNamePrefix={classNamePrefix}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
    </div>
  );
};

export default CatalogFilterTreeTopLevelSubtreeSelected;
