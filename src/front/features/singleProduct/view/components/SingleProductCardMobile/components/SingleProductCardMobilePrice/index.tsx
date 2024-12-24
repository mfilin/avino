import React from 'react';

import Text from '../../../../../../../components/Typography/Text';
import { formatPriceString } from '../../../../../../../utils/price';
import Tooltip from '../../../../../../../components/Tooltip';
import BellIcon from '../../../../../../../images/bell.svg';

import styles from './SingleProductCardMobilePrice.module.scss';

interface IOwnProps {
  price: number;
}

const SingleProductCardMobilePrice: React.FC<IOwnProps> = (props) => {
  const { price } = props;
  return (
    <div className={styles.SingleProductCardMobilePrice}>
      <Text level="s32hnw800" as="h2" className={styles.Price}>
        {formatPriceString(price)}
      </Text>
      <div className={styles.AboutPriceDecrease}>
        <Tooltip text="Подписаться и добавить в избранное">
          <div className={styles.Group}>
            <BellIcon fill="#797979" />
            <Text level="s13h16w400" colorMode="grey">
              Узнать о снижении цены
            </Text>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default SingleProductCardMobilePrice;
