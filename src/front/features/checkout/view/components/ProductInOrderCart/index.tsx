import React from 'react';
import { getProductImages } from 'src/front/utils/getProductImages';
import { IProduct } from 'src/front/api/types/product';
import { formatPriceString } from 'src/front/utils/price';
import Text from 'src/front/components/Typography/Text';
import { ImageSafe } from '../../../../../components';

import styles from './ProductInOrderCart.module.scss';

interface IOwnProps {
  product: IProduct;
}

const ProductInOrderCart: React.FC<IOwnProps> = ({ product }) => {
  const productImage = getProductImages(product.media)[0];
  return (
    <div className={styles.ProductInOrderCart}>
      <div className={styles.ImageBlock}>
        <ImageSafe src={productImage} />
      </div>
      <div className={styles.Info}>
        <Text className={styles.Vendor} level="s12h16w400" colorMode="grey">
          Артикул: {product.sku2}
        </Text>
        <Text className={styles.Name} level="s13h16w600">
          {product.name}
        </Text>
        <div className={styles.PriceAndCount}>
          <Text level="s18h20w800">{formatPriceString(product.price)}</Text>
          <Text level="s12h16w400" colorMode="grey">
            {product.count_in_cart} шт.
          </Text>
        </div>
      </div>
    </div>
  );
};
export default ProductInOrderCart;
