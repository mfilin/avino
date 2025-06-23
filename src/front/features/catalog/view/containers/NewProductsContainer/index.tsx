import React from 'react';
import { IProduct } from '../../../../../api/types/product';
import Title from '../../../../../components/Typography/Title';
import ProductCard from '../../../../../components/ProductCard/ProductCard';
import { LoadingIndicator } from 'src/front/components';
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
    <>
      {title && (
        <Title as="h2" withOrangeLine className={styles.Title}>
          {title}
        </Title>
      )}

      {isFetching ? (
        <LoadingIndicator />
      ) : (
        products?.map((product, index) =>
          <ProductCard 
            key={product.id}
            productInfo={product} 
            noButtonsMode={false}
            additionalClassName={(index === 2 || index === 5) ? "item-xl" : undefined}
          />
        )
      )}
    </>
  );
};
export default NewProducts;
