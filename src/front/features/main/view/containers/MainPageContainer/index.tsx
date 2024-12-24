import React from 'react';
import clsx from 'clsx';
import { IPageProps } from '../../../../../../types/portal/server';
import HowToCreateOrder from '../../../../../components/HowToCreateOrder/index';
import PopularProducts from '../../components/PopularProducts/index';
import NewArrivals from '../../components/NewArrivals/index';
import PopularCategories from '../../components/PopularCategories/index';
import MainBanners from '../../components/MainBanners/index';
import AddUsToFavorite from '../../components/AddUsToFavorite/index';
import { useDeviceInfo } from '../../../../../hooks/device';
import { usePopularProducts } from '../../../../../hooks/usePopularProducts';
import { useNewProducts } from '../../../../../hooks/useNewProducts';

import styles from './MainPageContainer.module.scss';

interface IOwnProps {
  pageProps: IPageProps;
}

const MainPageContainer: React.FC<IOwnProps> = ({ pageProps }) => {
  const [currentPopularTab, setCurrentPopularTab] = React.useState('wine-all');
  const { isMobile } = useDeviceInfo();

  const { products: popularProducts, isLoading: popularProductsLoading } =
    usePopularProducts(currentPopularTab);
  const { products: newProducts, isLoading: newProductsLoading } =
    useNewProducts();

  const handleChangePopularTab = React.useCallback((tab: string) => {
    setCurrentPopularTab(tab);
  }, []);
  return (
    <>
      <div
        className={clsx(styles.MainPageContainer, {
          [styles.MobileView]: isMobile,
        })}
      >
        <MainBanners />
        <PopularCategories cache={pageProps.settings?.categories} />
        <AddUsToFavorite onSubscribe={() => console.log('subscribe!')} />
        <NewArrivals products={newProducts} isFetching={newProductsLoading} />

        <PopularProducts
          cache={pageProps.settings?.categories}
          products={popularProducts}
          isFetching={popularProductsLoading}
          onChangeTab={handleChangePopularTab}
        />
        <HowToCreateOrder />
      </div>
    </>
  );
};

export default MainPageContainer;
