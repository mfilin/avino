import React from 'react';
import Router, { useRouter } from 'next/router';
import CatalogSettingsBar from '../../components/CatalogSettingsBar';
import CatalogNaviBar from '../../components/CatalogNaviBar';
import CatalogProducts from '../../components/CatalogProducts';
import { TCatalogListType } from '../../../namespace';
import { LoadingIndicator } from '../../../../../components';
import Error from '../../../../../elements/Error';
import { useSearchProducts } from '../../../../../hooks/useSearchProducts';
import { PAGE_COUNT_SETTING } from '../../../../../../const';
import NotFound from '../../../../../components/NotFound/index';

const SearchCatalogContainer: React.FC = (props) => {
  const router = useRouter();

  const [pageSize, setPageSize] = React.useState(PAGE_COUNT_SETTING[0]);
  const [listType, setListType] = React.useState<TCatalogListType>('blocks');

  const { productsPage, isLoading, error } = useSearchProducts(
    router.query?.query as string,
    router.query?.page as string,
    router.query?.order as string,
    router.query?.orderDesc as string,
    pageSize,
  );

  const handleChangePage = React.useCallback(
    (pageNum: number) => {
      // filtersControl.setPage(pageNum);
      const props: Record<string, string | number> = {};
      if (router.query.query) {
        props.query = router.query.query as string;
      }
      if (router.query.order) {
        props.order = router.query.order as string;
      }
      if (pageSize) {
        props.pageSize = pageSize as number;
      }

      props.page = pageNum;
      // TODO: Fix [any] type below
      const nextProps = new URLSearchParams(props as any).toString();

      Router.push(`/search${nextProps ? `?${nextProps}` : null}`, undefined, {
        scroll: false,
        shallow: true,
      });
    },
    [router.query.query, router.query.page, router.query.order, pageSize],
  );

  if (error) {
    return (
      <div>
        <Error message={error as string} />
      </div>
    );
  }

  return (
    <div style={{ marginTop: '30px' }}>
      {isLoading ? (
        <LoadingIndicator />
      ) : productsPage?.items.length ? (
        <>
          <CatalogSettingsBar
            pageCountSetting={PAGE_COUNT_SETTING}
            listType={listType}
            pageSize={pageSize}
            onChangePageSize={setPageSize}
            onChangeListType={setListType}
          />
          <CatalogProducts
            products={productsPage?.items || []}
            listType={listType}
          />
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <>
              {productsPage?.items.length ? (
                <CatalogNaviBar
                  total={productsPage.total}
                  page={+productsPage.page}
                  pageSize={pageSize}
                  loaded={productsPage.items.length}
                  onChangePage={handleChangePage}
                />
              ) : null}
            </>
          )}
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default SearchCatalogContainer;
