import React from 'react';
import { IProduct } from '../../../../../api/types/product';
import Tabs from '../../../../../components/Tabs';
import { IClientCatalog } from '../../../../../../types/portal/client';
import DefaultProductCard from 'src/front/components/DefaultProductCard';
import HorizontalProductCard from '../../../../../components/HorizontalProductCard/index';
import HugeProductCard from '../../../../../components/HugeProductCard/index';
import Text from 'src/front/components/Typography/Text';
import { LoadingIndicator } from 'src/front/components';
import Title from 'src/front/components/Typography/Title';
import DefaultMobileProductCard from 'src/front/components/DefaultMobileProductCard';
import SelectCustom from '../../../../../elements/SelectCustom/index';
import { useDeviceInfo } from '../../../../../hooks/device';

import styles from './PopularProducts.module.scss';

interface IOwnProps {
  cache?: IClientCatalog;
  products?: IProduct[];
  isFetching?: boolean;
  onChangeTab: (tab: string) => void;
}

const PopularProducts: React.FC<IOwnProps> = ({
  products,
  cache,
  isFetching,
  onChangeTab,
}) => {
  const { isMobile } = useDeviceInfo();

  const handleChangeTab = React.useCallback((tab: string) => {
    onChangeTab(tab);
  }, []);

  const tabs = React.useMemo(() => {
    return Object.entries(cache?.catalog || {}).reduce((acc, [key, value]) => {
      if (key !== 'glass-all' && key !== 'spirits') {
        return [...acc, { key, value: key, label: value.label }];
      }
      return acc;
    }, []);
  }, []);

  if (isMobile) {
    return (
      <div className={styles.PopularProductsMobileView}>
        <Title as="h2" withOrangeLine className={styles.Title}>
          Популярные товары
        </Title>
        <SelectCustom
          options={tabs}
          onChange={({ key }: any) => handleChangeTab(key)} // TODO: Fix any type
          className={styles.Select}
        />
        <div className={styles.ProductsList}>
          {isFetching ? (
            <LoadingIndicator />
          ) : (
            products.slice(0, 8).map((product, index) => {
              return (
                <div className={styles[`Cell${index + 1}`]} key={product.id}>
                  <DefaultMobileProductCard productInfo={product} />
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.PopularProducts}>
      <div className={styles.BackLettering}>
        <Text>ПОПУЛЯРНЫЕ ТОВАРЫ</Text>
      </div>
      <Tabs tabs={tabs} onSelect={handleChangeTab} />
      <div className={styles.ProductsGrid}>
        {isFetching ? (
          <LoadingIndicator />
        ) : (
          products.slice(0, 8).map((product, index) => {
            return (
              <div className={styles[`Cell${index + 1}`]} key={product.id}>
                {index === 2 && <HorizontalProductCard productInfo={product} />}
                {index === 3 && <HugeProductCard productInfo={product} />}
                {index !== 3 && index !== 2 && (
                  <DefaultProductCard productInfo={product} noButtonsMode />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default PopularProducts;
