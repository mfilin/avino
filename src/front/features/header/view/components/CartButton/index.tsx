import React from 'react';
import styles from './CartButton.module.scss';
import CartIcon from '../../../../../images/cart-default.svg';
import Text from 'src/front/components/Typography/Text';
import { formatPriceString } from 'src/front/utils/price';
import ShallowLink from 'src/front/elements/ShallowLink';
import Tooltip from 'src/front/components/Tooltip';
import AddedProductToCartModal from '../../../../../components/AddedProductToCartModal/index';
import { IProduct } from 'src/front/api/types/product';

interface IOwnProps {
  countInCart: number;
  summary: number;
  addedProduct?: IProduct;
  onClose?: () => void;
}
const CartButton: React.FC<IOwnProps> = ({
  countInCart,
  summary,
  addedProduct,
  onClose,
}) => {
  return (
    <div className={styles.Wrapper}>
      <ShallowLink href="/cart" prefetch={false}>
        <div className={styles.CartButton}>
          <div className={styles.Icon}>
            <CartIcon fill="#35393E" />
            {countInCart > 0 && (
              <div className={styles.Count}>
                <Text level="s11h16w400" colorMode="white">
                  {countInCart}
                </Text>{' '}
              </div>
            )}
          </div>
          {countInCart > 0 && (
            <div className={styles.Summary}>
              <Text level="s13h16w400" colorMode="grey">
                Сумма
              </Text>
              <Text level="s14h16w600"> {formatPriceString(summary)}</Text>
            </div>
          )}
        </div>
      </ShallowLink>
      {addedProduct && (
        <AddedProductToCartModal product={addedProduct} onClose={onClose} />
      )}
    </div>
  );
};
export default CartButton;
