import { usePortalStatic } from '../hooks/usePortalStatic';
import { Footer, LoadingIndicator } from '../components';
import { TopMenuContainer } from '../features/header/view/containers';
import MobileBottomMenu from '../components/MobileBottomMenu';
import { NextPage } from 'next/types';
import { useRouter } from 'next/router';
import featurePrivacy from '../features/privacy';

const { PrivacyContainer } = featurePrivacy.containers;

const PrivacyPage: NextPage = (props) => {
  const { pageProps } = usePortalStatic();
  const { isFallback } = useRouter();
  return (
    <>
      {isFallback ? (
        <LoadingIndicator />
      ) : (
        <>
          <TopMenuContainer pageProps={pageProps} />
          <PrivacyContainer />
          <MobileBottomMenu />
          <Footer pageProps={pageProps} />
        </>
      )}
    </>
  );
};

export default PrivacyPage;
