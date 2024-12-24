import { usePortalStatic } from '../hooks/usePortalStatic';
import { Footer, LoadingIndicator } from '../components';
import { TopMenuContainer } from '../features/header/view/containers';
import MobileBottomMenu from '../components/MobileBottomMenu';
import { NextPage } from 'next/types';
import { useRouter } from 'next/router';
import featureCart from '../features/cart';

const { CartContainer } = featureCart.containers;

const ComparisonPage: NextPage = (props: any) => {
  const { pageProps } = usePortalStatic();
  const { isFallback } = useRouter();

  return (
    <>
      {isFallback ? (
        <LoadingIndicator />
      ) : (
        <>
          <TopMenuContainer pageProps={pageProps} />
          <CartContainer pageProps={pageProps} />
          <MobileBottomMenu />
          <Footer pageProps={pageProps} />
        </>
      )}
    </>
  );
};

export default ComparisonPage;
