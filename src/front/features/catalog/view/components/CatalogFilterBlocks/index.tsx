import React from 'react';
import {
  IClientFiltersCatalog,
  IClientFiltersCatalogItemsCatalog,
} from '../../../../../../types/portal/client';
import CatalogFilterBlockItem from '../CatalogFilterBlockItem';
import { IModalsControl } from '../../../namespace';
import { ModalsContext } from '../../../context/modals';
import CatalogFilterTreeItem from '../CatalogFilterTreeItem';
import CatalogFiltersPriceItem from '../CatalogFiltersPriceItem';

import styles from './CatalogFilterBlocks.module.scss';

interface IOwnProps {
  categoryKey: string;
  category: IClientFiltersCatalog;
}

const CatalogFilterBlocks: React.FC<IOwnProps> = (props) => {
  const { category, categoryKey } = props;
  const modalsControl: IModalsControl = React.useContext(ModalsContext);

  // Open filter dictionary modal
  const handleOpenDictionary = React.useCallback(
    (addr: string) => {
      modalsControl.showFilterModal(categoryKey, addr);
    },
    [modalsControl, categoryKey],
  );

  const handleOpenCountryModal = React.useCallback(
    (slug: string | undefined, addr: string) => {
      modalsControl.showCountrySelectModal(categoryKey, [slug, addr]);
    },
    [modalsControl, categoryKey],
  );

  return (
    <div className={styles.CatalogFiltersBlocks}>
      {Object.entries(category?.items || {}).map(
        ([taxonKey, categoryFilters]: [
          string,
          IClientFiltersCatalogItemsCatalog,
        ]) => {
          switch (taxonKey) {
            case 'taxons.country':
              if (categoryFilters.tree) {
                return (
                  <CatalogFilterTreeItem
                    key={taxonKey}
                    addr={taxonKey}
                    category={categoryKey}
                    filters={categoryFilters}
                    onOpenCountryModal={handleOpenCountryModal}
                  />
                );
              }
              break;
            case 'product.price':
              return (
                <CatalogFiltersPriceItem
                  key={taxonKey}
                  addr={taxonKey}
                  category={categoryKey}
                  filters={categoryFilters}
                />
              );
          }

          return (
            <CatalogFilterBlockItem
              key={taxonKey}
              category={categoryKey}
              addr={taxonKey}
              filters={categoryFilters}
              onOpenDictionary={handleOpenDictionary}
            />
          );
        },
      )}
    </div>
  );
};

export default CatalogFilterBlocks;
