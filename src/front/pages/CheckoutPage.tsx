import { usePortalStatic } from '../hooks/usePortalStatic';
import { FadeLayout, Footer, LoadingIndicator } from '../components';
import { TopMenuContainer } from '../features/header/view/containers';
import MobileBottomMenu from '../components/MobileBottomMenu';
import featureCheckout from '../features/checkout';
import { NextPage } from 'next/types';
import { useRouter } from 'next/router';

const { CheckoutContainer } = featureCheckout.containers;

const CheckoutPage: NextPage = () => {
  const { isFallback } = useRouter();
  const { pageProps } = usePortalStatic();

  return (
    <>
      {isFallback ? (
        <LoadingIndicator />
      ) : (
        <>
          <TopMenuContainer pageProps={pageProps} />
          <FadeLayout>
            <CheckoutContainer pageProps={pageProps} />
            <MobileBottomMenu />
            <Footer pageProps={pageProps} />
          </FadeLayout>
        </>
      )}
    </>
  );
};

export default CheckoutPage;
