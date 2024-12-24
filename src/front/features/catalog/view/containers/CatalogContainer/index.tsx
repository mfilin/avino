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

import styles from './CatalogContainer.module.scss';
import {
  IBreadcrumbSlug,
  SlugControl,
} from '../../../../../../class/SlugControl';

interface IOwnProps {
  pageProps: IPageProps;
  baseCatalog: string;
  filterSlug: Record<string, string | string[]>;
}

const CatalogContainer: React.FC<IOwnProps> = (props) => {
  const { pageProps, filterSlug, baseCatalog } = props;
  const router = useRouter();
  const [modalsControl]: [IModalsControl, ICurrentModal] = useModals();
  const [pageSize, setPageSize] = React.useState(PAGE_COUNT_SETTING[0]);
  const [listType, setListType] = React.useState<TCatalogListType>('blocks');
  const slugs = useRouteSlugsDecoded();
  const { decodedSlugs, parents } = useSlugDecode(slugs);

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

  const filtersKey = parents[queryCategory]?.[0] || queryCategory;

  return (
    <div className={styles.CatalogContainer}>
      <NextSeo
        title={`${slugControl.categoryLabel} – цена в интернет-каталоге в Москве`}
        description={`${slugControl.categoryLabel} - купить в магазине алкоголя Виноград не виноват! Выгодные цены в Москве, широкий ассортимент, подробное описание товаров с дегустационными заметками.`}
        noindex={breadcrumbPathSize > 4 || hasSameCategory}
        nofollow={breadcrumbPathSize > 4 || hasSameCategory}
      />
      <div className={styles.Breadcrumb}>
        {breadCrumbs.length ? (
          <Breadcrumbs withHome items={breadCrumbs} />
        ) : (
          <div className={styles.BreadcrumbPlaceholder}>{NBSP}</div>
        )}
      </div>
      <CatalogHeader
        label={slugControl.categoryLabel}
        total={productsPage?.total}
      />
      <FiltersContext.Provider value={filtersControl}>
        <ModalsContext.Provider value={modalsControl}>
          {Boolean(filters[filtersKey]) ? (
            <>
              <CatalogFilterModals
                pageProps={pageProps}
                controls={modalsControl}
              />
              <CatalogControlPanel
                categoryKey={filtersKey}
                category={filters[filtersKey]}
                openFiltersDrawer={handleToggleFiltersDrawer}
              />
            </>
          ) : null}
          <CatalogSettingsBar
            pageCountSetting={PAGE_COUNT_SETTING}
            listType={listType}
            pageSize={pageSize}
            onChangePageSize={setPageSize}
            onChangeListType={setListType}
          />
          <CatalogProducts
            products={productsPage?.items}
            listType={listType}
            // onLoadMore={showLoadMore && handleLoadMore}
          />
          {productsPage ? (
            <CatalogNaviBar
              total={productsPage.total}
              page={+productsPage.page}
              pageSize={pageSize}
              loaded={productsPage.items?.length}
              onChangePage={handleChangePage}
            />
          ) : null}
          <HowToCreateOrder />
        </ModalsContext.Provider>
      </FiltersContext.Provider>
    </div>
  );
};

export default CatalogContainer;
