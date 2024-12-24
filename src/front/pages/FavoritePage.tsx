import { usePortalStatic } from '../hooks/usePortalStatic';
import { Footer, LoadingIndicator } from '../components';
import { TopMenuContainer } from '../features/header/view/containers';
import MobileBottomMenu from '../components/MobileBottomMenu';
import featureFavorite from '../features/favorite';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';

const { FavoriteContainer } = featureFavorite.containers;

const FavoritePage: NextPage = (props: any) => {
  const { pageProps } = usePortalStatic();
  const { isFallback } = useRouter();

  return (
    <>
      {isFallback ? (
        <LoadingIndicator />
      ) : (
        <>
          <TopMenuContainer pageProps={pageProps} />
          <div style={{ margin: '30px auto', width: '1440px' }}>
            <FavoriteContainer pageProps={pageProps} />
          </div>

          <MobileBottomMenu />
          <Footer pageProps={pageProps} />
        </>
      )}
    </>
  );
};

export default FavoritePage;
