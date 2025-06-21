import * as React from 'react';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Footer, LoadingIndicator } from '../components';
import featureMain from '../features/main';
import MainLayout from '../layouts/MainLayout';
import { usePortalStatic } from '../hooks/usePortalStatic';

// import { FadeLayout, Footer, LoadingIndicator } from '../components';
// import MobileBottomMenu from '../components/MobileBottomMenu';
// import featureHeader from '../features/header';
// import featureMain from '../features/main';

const { MainPageContainer } = featureMain.containers;

const IndexPage: NextPage = () => {
  const router = useRouter();
  const { pageProps } = usePortalStatic();

  return (
    <div className="root">
      <NextSeo
        title={`Виноград не виноват – интернет-каталог алкоголя в Москве`}
        description={`Спиртные напитки и элитный алкоголь купить в магазине алкоголя Виноград не виноват! Выгодные цены в Москве, широкий ассортимент, подробное описание товаров с дегустационными заметками.`}
      />
      {router.isFallback ? (
        <LoadingIndicator />
      ) : (
        <MainLayout haveHeadPanel={true}>
          <MainPageContainer pageProps={pageProps} />

            {/* <FadeLayout>
                <MainPageContainer pageProps={pageProps} />
                <MobileBottomMenu />
                <Footer pageProps={pageProps} />
            </FadeLayout> */}
            
        </MainLayout>
      )}
    </div>
  );
};

export default IndexPage;
