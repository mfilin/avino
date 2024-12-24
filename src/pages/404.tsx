import React from 'react';
import { NextPage } from 'next';
import { TopMenuContainer } from '../front/features/header/view/containers';
import { Footer, LoadingIndicator } from '../front/components';
import Api from '../front/api';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { usePortalStatic } from '../front/hooks/usePortalStatic';
import { useRouter } from 'next/router';
import NotFound from '../front/components/NotFound';
import MobileBottomMenu from '../front/components/MobileBottomMenu';

const NotFoundPage: NextPage = (props) => {
  const { pageProps } = usePortalStatic();
  const { isFallback } = useRouter();
  return (
    <>
      {isFallback ? (
        <LoadingIndicator />
      ) : (
        <>
          <TopMenuContainer pageProps={pageProps} />
          <NotFound />
          <MobileBottomMenu />
          <Footer pageProps={pageProps} />
        </>
      )}
    </>
  );
};

export async function getStaticProps(props: any) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ['portal-static'],
    Api.instance.portal.loadPortalStatic,
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: false,
  };
}

export default NotFoundPage;
