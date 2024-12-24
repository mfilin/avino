import * as React from 'react';
// import util from 'node:util';
import { NextPage } from 'next';
import { default as axios } from 'axios';
import { useRouter } from 'next/router';
import { usePortalStatic } from '../front/hooks/usePortalStatic';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { setUserAgent } from '../front/utils/device';
import Api from '../front/api';
import { Footer, Layout, LoadingIndicator } from '../front/components';

import featureHeader from '../front/features/header';
import featureCatalog from '../front/features/catalog';
import MobileBottomMenu from '../front/components/MobileBottomMenu';
import { useDeviceInfo } from '../front/hooks/device';
import { PAGE_COUNT_SETTING } from '../const';

const { TopMenuContainer } = featureHeader.containers;
const { SearchCatalogContainer, MobileSearchCatalogContainer } =
  featureCatalog.containers;

const SearchPage: NextPage = () => {
  const router = useRouter();

  const { isMobile } = useDeviceInfo();

  const { pageProps } = usePortalStatic();
  return (
    <div>
      {router.isFallback ? (
        <LoadingIndicator />
      ) : (
        <>
          <TopMenuContainer pageProps={pageProps} />
          <Layout>
            {isMobile ? (
              <MobileSearchCatalogContainer />
            ) : (
              <SearchCatalogContainer />
            )}
          </Layout>
          <MobileBottomMenu />
          <Footer pageProps={pageProps} />
        </>
      )}
    </div>
  );
};

export async function getServerSideProps(props: any) {
  const isMobile = setUserAgent(props.req?.headers?.['user-agent']);
  const queryClient = new QueryClient();

  const query = props.query?.query || null;
  const page = props.query?.page || null;
  const order = props.query?.order || null;
  const orderDesc = props.query?.orderDesc || null;
  const size = PAGE_COUNT_SETTING[0];

  try {
    const searchQueryKey = [
      isMobile ? 'search-products-mobile' : 'search-products',
      query || '',
      page || '',
      order || '',
      orderDesc || '',
      size,
    ];

    const queryFn = async () => {
      const result = await Api.instance.product.queryProducts(query, {
        page,
        order,
        orderDesc,
        size,
      });

      // console.log('RESULT: ', result);

      return result;
    };
    if (isMobile) {
      await queryClient.prefetchInfiniteQuery(searchQueryKey, queryFn);
    } else {
      await queryClient.prefetchQuery(searchQueryKey, queryFn);
    }

    await queryClient.prefetchQuery(
      ['portal-static'],
      Api.instance.portal.loadPortalStatic,
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(new Error(`${error.message} for url ${error.config.url}`));
    } else {
      console.error(error);
    }
  }

  return {
    props: {
      dehydratedState: isMobile
        ? JSON.parse(JSON.stringify(dehydrate(queryClient)))
        : dehydrate(queryClient),
    },
    // revalidate: false,
  };
}

export default SearchPage;
