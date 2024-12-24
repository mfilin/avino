import { usePortalStatic } from '../hooks/usePortalStatic';
import { Footer, LoadingIndicator } from '../components';
import { TopMenuContainer } from '../features/header/view/containers';
import MobileBottomMenu from '../components/MobileBottomMenu';
import { NextPage } from 'next/types';
import { useRouter } from 'next/router';
import featureRules from '../features/rules';

const { RulesContainer } = featureRules.containers;

const RulesPage: NextPage = () => {
  const { isFallback } = useRouter();
  const { pageProps } = usePortalStatic();

  return (
    <>
      {isFallback ? (
        <LoadingIndicator />
      ) : (
        <>
          <TopMenuContainer pageProps={pageProps} />
          <RulesContainer />
          <MobileBottomMenu />
          <Footer pageProps={pageProps} />
        </>
      )}
    </>
  );
};

export default RulesPage;
