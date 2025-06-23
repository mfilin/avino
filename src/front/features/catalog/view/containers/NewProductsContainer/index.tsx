import React from 'react';
import clsx from 'clsx';
import { IProduct } from '../../../../../api/types/product';
import Title from '../../../../../components/Typography/Title';
import DefaultProductCard from '../../../../../components/DefaultProductCard';
import { LoadingIndicator } from 'src/front/components';
import DefaultMobileProductCard from '../../../../../components/DefaultMobileProductCard/index';
import { useDeviceInfo } from '../../../../../hooks/device';

import styles from './NewProducts.module.scss';

interface IOwnProps {
  title?: string;
  isFetching?: boolean;
  products: IProduct[];
}
const NewProducts: React.FC<IOwnProps> = ({ title, isFetching, products }) => {
  const { isMobile } = useDeviceInfo();

  return (
    <div
      id="new-products"
      className={clsx(styles.NewArrivals, { [styles.MobileView]: isMobile })}
    >
      {title && (
        <Title as="h2" withOrangeLine className={styles.Title}>
          {title}
        </Title>
      )}
      {
        <div className={styles.List}>
          {isFetching ? (
            <LoadingIndicator />
          ) : (
            products?.map((product) =>
              isMobile ? (
                <DefaultMobileProductCard
                  productInfo={product}
                  key={product.id}
                />
              ) : (
                <DefaultProductCard productInfo={product} key={product.id} />
              ),
            )
          )}
        </div>
      }
    </div>
  );
};
export default NewProducts;
