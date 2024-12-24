import React from 'react';
import { useRouter } from 'next/router';
import CatalogProducts from '../../components/CatalogProducts';
import { LoadingIndicator } from '../../../../../components';
import Error from '../../../../../elements/Error';
import { useInfiniteSearchProducts } from '../../../../../hooks/useInfiniteSearchProducts';
import LoadMoreBtn from '../../../../../components/LoadMoreBtn';
import { PAGE_COUNT_SETTING } from '../../../../../../const';
import NotFound from 'src/front/components/NotFound';

const MobileSearchCatalogContainer: React.FC = (props) => {
  const router = useRouter();

  const { productsPage, isLoading, fetchNextPage, error } =
    useInfiniteSearchProducts(
      router.query?.query as string,
      router.query?.page as string,
      router.query?.order as string,
      router.query?.orderDesc as string,
      PAGE_COUNT_SETTING[0],
    );

  if (error) {
    return (
      <div>
        <Error message={error as string} />
      </div>
    );
  }

  return (
    <div style={{ marginTop: '30px', marginBottom: '30px' }}>
      {isLoading ? (
        <LoadingIndicator />
      ) : productsPage?.items?.length ? (
        <>
          <CatalogProducts products={productsPage?.items || []} />
          <LoadMoreBtn onClick={fetchNextPage} />
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default MobileSearchCatalogContainer;
