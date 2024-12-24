import React from 'react';
import { useRouter } from 'next/router';
import { IPageProps } from '../../../../../../types/portal/server';
import { FiltersContext } from '../../../context/filters';
import { ModalsContext } from '../../../context/modals';
import { useFilters } from '../../../hooks/useFilters';
import {
  ICurrentModal,
  IModalsControl,
  TCatalogListType,
} from '../../../namespace';
import { useModals } from '../../../hooks/useModals';
import Drawer from '../../../../../components/Drawer';
import CatalogFilterModals from '../../components/CatalogFilterModals';
import CatalogProducts from '../../components/CatalogProducts';
import CatalogControlPanel from '../../components/CatalogControlPanel';
import HowToCreateOrder from 'src/front/components/HowToCreateOrder';

import {
  DrawerContext,
  EDrawersNames,
} from 'src/front/providers/drawerProvider';
import CatalogFiltersDrawerContent from '../../components/CatalogFiltersDrawerContent';
import { useSlugDecode } from '../../../../../hooks/useSlugDecode';
import { useCatalogInfiniteProducts } from '../../../../../hooks/useCatalogInfiniteProducts';
import { PAGE_COUNT_SETTING } from '../../../../../../const';

interface IOwnProps {
  pageProps: IPageProps;
  baseCatalog: string;
  filterSlug: Record<string, string | string[]>;
}

const MobileCatalogContainer: React.FC<IOwnProps> = (props) => {
  const { pageProps, filterSlug, baseCatalog } = props;
  const router = useRouter();
  const [modalsControl]: [IModalsControl, ICurrentModal] = useModals();
  const [pageSize, setPageSize] = React.useState(PAGE_COUNT_SETTING[0]);
  const [listType, setListType] = React.useState<TCatalogListType>('blocks');

  const { decodedSlugs } = useSlugDecode(router.query.slug as string[]);

  const [filtersControl, currentFilters] = useFilters(
    baseCatalog,
    decodedSlugs,
  );

  const { toggleDrawer } = React.useContext(DrawerContext);
  const { productsPage, fetchNextPage, hasNextPage } =
    useCatalogInfiniteProducts(
      currentFilters as string[],
      router.query?.page as string,
      router.query?.order as string,
      router.query?.orderDesc as string,
      pageSize,
    );

  const handleToggleFiltersDrawer = React.useCallback(() => {
    toggleDrawer(EDrawersNames.catalogFilters);
  }, [toggleDrawer]);

  const filters = pageProps.settings?.categories?.filters;
  const [queryCategory] = router.query.slug || [];

  return (
    <div style={{ marginTop: '30px' }}>
      <FiltersContext.Provider value={filtersControl}>
        <ModalsContext.Provider value={modalsControl}>
          {Boolean(filters[queryCategory]) ? (
            <>
              <CatalogFilterModals
                pageProps={pageProps}
                controls={modalsControl}
              />
              <CatalogControlPanel
                categoryKey={queryCategory}
                category={filters[queryCategory]}
                openFiltersDrawer={handleToggleFiltersDrawer}
              />
            </>
          ) : null}
          <CatalogProducts
            products={productsPage?.items}
            listType={listType}
            hasMore={hasNextPage}
            onLoadMore={fetchNextPage}
          />
          <HowToCreateOrder />
          <Drawer
            drawerId={EDrawersNames.catalogFilters}
            onClose={handleToggleFiltersDrawer}
            withoutHeader
          >
            <CatalogFiltersDrawerContent
              categoryKey={queryCategory}
              category={filters[queryCategory]}
              onClose={handleToggleFiltersDrawer}
              filtersControl={filtersControl}
            />
          </Drawer>
        </ModalsContext.Provider>
      </FiltersContext.Provider>
    </div>
  );
};

export default MobileCatalogContainer;
