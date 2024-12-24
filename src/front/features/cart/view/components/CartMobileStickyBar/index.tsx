import React from 'react';
import styles from './CartMobileStickyBar.module.scss';
import Text from '../../../../../components/Typography/Text';
import { formatPriceString } from '../../../../../utils/price';
import Button from '../../../../../components/Button';

interface IOwnProps {
  onClickCreateOrder: () => void;
  summary: number;
}

const CartMobileStickyBar: React.FC<IOwnProps> = ({
  summary,
  onClickCreateOrder,
}) => {
  return (
    <div className={styles.CartMobileStickyBar}>
      <div className={styles.SummaryPrice}>
        <Text level="s16h17w700">Товары</Text>
        <Text level="s24h32w700">{formatPriceString(summary)}</Text>
      </div>
      <Button color="orange-fill" onClick={onClickCreateOrder}>
        К оформлению
      </Button>
    </div>
  );
};
export default CartMobileStickyBar;
