import * as React from 'react';
import { NextPage } from 'next/types';
import { useRouter } from 'next/router';
import { usePortalStatic } from '../hooks/usePortalStatic';
import { Footer, LoadingIndicator } from '../components';
import { TopMenuContainer } from '../../front/features/header/view/containers';
import MobileBottomMenu from '../../front/components/MobileBottomMenu';
import featureAbout from '../../front/features/about';

const { AboutCompanyContainer } = featureAbout.containers;

const AboutPage: NextPage = (props) => {
  const { pageProps } = usePortalStatic();
  const { isFallback } = useRouter();

  return (
    <>
      {isFallback ? (
        <LoadingIndicator />
      ) : (
        <>
          <TopMenuContainer pageProps={pageProps} />
          <AboutCompanyContainer />
          <MobileBottomMenu />
          <Footer pageProps={pageProps} />
        </>
      )}
    </>
  );
};

export default AboutPage;
