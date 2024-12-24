import React from 'react';
import { IProduct } from '../../api/types/product';
import Text from '../Typography/Text';
import CrossIcon from '../../images/cross-16.svg';
import { getProductImages } from '../../utils/getProductImages';
import { formatPriceString } from '../../utils/price';
import Button from '../Button';
import ShallowLink from 'src/front/elements/ShallowLink';
import BreakLine from '../BreakLine';
import { ImageSafe } from '../index';

import styles from './AddedProductToCartModal.module.scss';

interface IOwnProps {
  product: IProduct;
  onClose: () => void;
}
const AddedProductToCartModal: React.FC<IOwnProps> = ({ product, onClose }) => {
  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      onClose();
    }, 3000);
    return () => window.clearTimeout(timer);
  }, []);

  const description = `${product.taxons?.country?.value || ''}, ${
    product.properties?.pval?.[0].value || ''
  } л, ${product.properties?.strength?.[0].value || ''}`;

  return (
    <div className={styles.AddedProductToCartModal}>
      <div className={styles.Header}>
        <Text level="s15h18w800">Товар добавлен в корзину</Text>
        <CrossIcon onClick={onClose} />
      </div>
      <div className={styles.BreakLine}>
        <BreakLine />
      </div>
      <div className={styles.ProductInfo}>
        <div className={styles.Image}>
          <ImageSafe src={getProductImages(product.media)[0]} />
        </div>
        <div className={styles.Info}>
          <Text level="s13h16w600" className={styles.Name}>
            {product.name}
          </Text>
          <Text
            level="s12h16w400"
            colorMode="grey"
            className={styles.Description}
          >
            {description}
          </Text>
          <div className={styles.Row}>
            <Text level="s13h16w600">Количество: {product.count_in_cart}</Text>
            <Text level="s13h16w600">{formatPriceString(product.price)}</Text>
          </div>
        </div>
      </div>
      <div className={styles.Button}>
        <ShallowLink href="/cart">
          <Button color="orange-fill">Перейти в корзину</Button>
        </ShallowLink>
      </div>
    </div>
  );
};
export default AddedProductToCartModal;
