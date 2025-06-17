import * as React from 'react';
import { YandexMetricaProvider } from 'next-yandex-metrica';
import Head from 'next/head';
import { NextUIProvider } from '@nextui-org/react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Config from '../front/config';

import { UserDataStoreProvider } from '../front/providers/userDataStoreProvider';
import AdultDisclaimer from '../front/components/AdultDisclaimer';
import WindowSizeProvider from '../front/providers/windowSizeProvider';
import SearchBarProvider from '../front/providers/SearchBarProvider';
import { DrawerProvider } from '../front/providers/drawerProvider';
import CatalogFiltersProvider from '../front/providers/CatalogFiltersProvider';
import BodyControlProvider from '../front/providers/BodyControlProvider';

//import '../front/styles/global.scss';
//import 'rc-pagination/assets/index.less';
//import 'react-range-slider-input/dist/style.css';
import '../front/styles/main.css';
import { useRouter } from 'next/router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  // const [queryClient] = React.useState(
  //   () =>
  //     new QueryClient({
  //       defaultOptions: {
  //         queries: {
  //           refetchOnWindowFocus: false,
  //         },
  //       },
  //     }),
  // );

  const changeScrollFreezeMode = React.useMemo(() => {
    return (shouldFreezeScroll: boolean) => {
      if (shouldFreezeScroll) {
        //document.body.classList.add('scroll-freeze');
        document.body.classList.add('header-white', 'header-scroll');
      } else {
        //document.body.classList.remove('scroll-freeze');
        document.body.classList.remove('header-white', 'header-scroll');
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="yandex-verification" content="0315b771c73a1dce" />
      </Head>
      <Hydrate state={pageProps.dehydratedState}>
        <NextUIProvider navigate={router.push}>
          <WindowSizeProvider defaultIsMobile={pageProps.isMobile}>
            <UserDataStoreProvider>
              <DrawerProvider>
                <AdultDisclaimer />
                {process.env.NODE_ENV === 'development' ? (
                  <ReactQueryDevtools />
                ) : null}

                <CatalogFiltersProvider pageProps={pageProps} />
                
                <SearchBarProvider>
                  <BodyControlProvider
                    onChangeScrollFreezeMode={changeScrollFreezeMode}
                  >
                    {Config.yandexMetricaID ? (
                      <YandexMetricaProvider
                        tagID={Config.yandexMetricaID}
                        initParameters={{
                          clickmap: true,
                          trackLinks: true,
                          accurateTrackBounce: true,
                          webvisor: true,
                        }}
                      >
                        {null}
                      </YandexMetricaProvider>
                    ) : null}
                    <Component {...pageProps} />
                  </BodyControlProvider>
                </SearchBarProvider>
                
              </DrawerProvider>
            </UserDataStoreProvider>
          </WindowSizeProvider>
        </NextUIProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
