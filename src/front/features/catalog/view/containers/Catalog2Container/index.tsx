import React from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
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
import CatalogFilterModals from '../../components/CatalogFilterModals';
import CatalogProducts from '../../components/CatalogProducts';
import CatalogControlPanel from '../../components/CatalogControlPanel';
import CatalogNaviBar from '../../components/CatalogNaviBar';
import CatalogSettingsBar from '../../components/CatalogSettingsBar';
import HowToCreateOrder from 'src/front/components/HowToCreateOrder';
import {
  DrawerContext,
  EDrawersNames,
} from 'src/front/providers/drawerProvider';
import { useCatalogProducts } from '../../../../../hooks/useCatalogProducts';
import { useSlugDecode } from '../../../../../hooks/useSlugDecode';
import { NBSP, PAGE_COUNT_SETTING } from '../../../../../../const';
import { useRouteSlugsDecoded } from '../../../../../hooks/useRouteSlugsDecoded';
import CatalogHeader from '../../components/CatalogHeader';
import { Breadcrumbs } from '../../../../../components';
import { useBreadcrumbedSlugs } from '../../../../../hooks/useBreadcrumbedSlugs';
import { IBreadcrumb } from '../../../../../components/Breadcrumbs';
import { useTaxonDescription } from '../../../../../hooks/useTaxonDescription';
import { useNewProducts } from '../../../../../hooks/useNewProducts';

import styles from './Catalog2Container.module.scss';
import {
  IBreadcrumbSlug,
  SlugControl,
} from '../../../../../../class/SlugControl';
import CatalogLandingContainer from '../CatalogLandingContainer';
import NewProducts from '../NewProductsContainer';
import CatalogBar from '../../components/CatalogBar';

interface IOwnProps {
  pageProps: IPageProps;
  baseCatalog: string;
  filterSlug: Record<string, string | string[]>;
}

const Catalog2Container: React.FC<IOwnProps> = (props) => {
  const { pageProps, filterSlug, baseCatalog } = props;
  const router = useRouter();
  const [modalsControl]: [IModalsControl, ICurrentModal] = useModals();
  const [pageSize, setPageSize] = React.useState(PAGE_COUNT_SETTING[0]);
  const [listType, setListType] = React.useState<TCatalogListType>('blocks');
  const slugs = useRouteSlugsDecoded();
  const { decodedSlugs, parents } = useSlugDecode(slugs);

  const { products: newProducts, isLoading: newProductsLoading } = useNewProducts(10);
  const { products: newProducts2, isLoading: newProductsLoading2 } = useNewProducts(10, 2);
  

  // TODO: Моргает когда меняешь категории в фильтрах! Нужно задерживать
  //  H1 заголовок при переключениях
  const slugControl: SlugControl = React.useMemo(() => {
    return new SlugControl(
      slugs,
      decodedSlugs,
      parents,
      pageProps.settings.categories.catalog,
      pageProps.settings.categories.filters,
    );
  }, [
    slugs,
    decodedSlugs,
    pageProps.settings.categories.catalog,
    pageProps.settings.categories.filters,
  ]);

  const {
    addr,
    tags,
    size: breadcrumbPathSize,
    hasSameCategory,
  } = useBreadcrumbedSlugs(
    slugs,
    decodedSlugs,
    parents,
    pageProps.settings.categories.catalog,
    pageProps.settings.categories.filters,
  );

  const breadCrumbs: IBreadcrumb[] = React.useMemo(() => {
    const res: IBreadcrumb[] = [];
    const path: string[] = [];
    addr.forEach((breadcrumbSlug: IBreadcrumbSlug) => {
      path.push(breadcrumbSlug.slug);
      res.push({
        label: breadcrumbSlug.label,
        link: path.join('/'),
      });
    });

    (tags.taxons || [])
      .concat(tags.properties || [])
      .forEach((breadcrumbSlug: IBreadcrumbSlug) => {
        path.push(breadcrumbSlug.slug);
        res.push({
          label: breadcrumbSlug.label,
          link: path.join('/'),
        });
      });

    return res;
  }, [addr, tags]);

  const [filtersControl, currentFilters] = useFilters(
    baseCatalog,
    decodedSlugs,
  );

  const { toggleDrawer } = React.useContext(DrawerContext);
  const { productsPage } = useCatalogProducts(
    currentFilters as string[],
    router.query?.page as string,
    router.query?.order as string,
    router.query?.orderDesc as string,
    pageSize,
  );

  const handleChangePage = React.useCallback(
    (pageNum: number) => {
      filtersControl.setPage(pageNum);
    },
    [filtersControl],
  );

  const handleToggleFiltersDrawer = React.useCallback(() => {
    toggleDrawer(EDrawersNames.catalogFilters);
  }, [toggleDrawer]);

  const filters = pageProps.settings?.categories?.filters;
  const [queryCategory] = slugs;
  const catalogKey = parents[queryCategory]?.[0] || queryCategory;
  const { description } = useTaxonDescription(catalogKey);

  const filtersKey = parents[queryCategory]?.[0] || queryCategory;

  //console.log(catalogKey, filters, queryCategory, filters[queryCategory]);

  return (
    <>
      <NextSeo
        title={`${slugControl.categoryLabel} – цена в интернет-каталоге в Москве`}
        description={`${slugControl.categoryLabel} - купить в магазине алкоголя Виноград не виноват! Выгодные цены в Москве, широкий ассортимент, подробное описание товаров с дегустационными заметками.`}
        noindex={breadcrumbPathSize > 4 || hasSameCategory}
        nofollow={breadcrumbPathSize > 4 || hasSameCategory}
      />

      <CatalogHeader
        label={slugControl.categoryLabel}
        description={description?.[catalogKey]?.descr}
        breadCrumbs={breadCrumbs} 
        total={productsPage?.total}
      />

      <CatalogLandingContainer pageProps={pageProps} />

      <div className="section" data-catalog="">

        <CatalogBar
          categoryKey={catalogKey}
          category={filters[queryCategory === "wine" ? "wine-all" : queryCategory]}
          openFiltersDrawer={handleToggleFiltersDrawer} />

        <div className="container">
            <div className="catalog-grid-v2">
              <NewProducts products={newProducts} isFetching={newProductsLoading} />

              {/* статья */}

              <NewProducts products={newProducts2} isFetching={newProductsLoading2} />
            </div>
          </div>
      </div>

    </>
  );
};

export default Catalog2Container;
