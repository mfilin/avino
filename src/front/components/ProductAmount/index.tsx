import React from 'react';
import styles from './ProductAmount.module.scss';
import clsx from 'clsx';
import BoxIcon from '../../images/box.svg';
import ShopIcon from '../../images/shop.svg';
import Text from '../Typography/Text';
import { TViewMode } from '../../types/view';

interface IOwnProps {
  mode?: TViewMode;
  available: boolean;
}

const InStockStatuses = {
  available: 'В наличии',
  unavailable: 'Нет в наличии',
};

const OnlineOrderStatuses = {
  available: 'Доступно под заказ',
  unavailable: 'Нет в наличии',
};

const ProductAmount: React.FC<IOwnProps> = ({
  mode = 'desktop',
  available,
}) => {
  const isDesktop = mode === 'desktop';
  const isAvailable = available ? 'available' : 'unavailable';
  return (
    <div className={styles.AmountStatusWrapper}>
      <div
        className={clsx(
          styles.AmountStatus,
          styles.Status,
          styles[isAvailable],
          { [styles.Mobile]: !isDesktop },
        )}
      >
        {isDesktop && InStockStatuses[isAvailable]}
        <div className={styles.StatusTooltip}>
          <div className={styles.OrderRow}>
            <div className={styles.Info}>
              <ShopIcon />
              <Text className={styles.Title}>Ленинградский пр-т, 48</Text>
            </div>
            <div
              className={clsx(
                styles.TextColored,
                styles.OrderAvailability,
                styles.Status,
                styles[isAvailable],
              )}
            >
              {InStockStatuses[isAvailable]}
            </div>
          </div>
          {/* {orderAvailability?.shops?.map((shop) => (
            <div className={styles.OrderRow} key={shop.address}>
              <div className={styles.Info}>
                <ShopIcon />
                <Text className={styles.Title}>{shop.address}</Text>
              </div>
              <div
                className={clsx(
                  styles.TextColored,
                  styles.OrderAvailability,
                  styles.Status,
                  styles[isAvailable],
                )}
              >
                {InStockStatuses[isAvailable]}
              </div>
            </div>
          ))} */}
          <div className={styles.OrderRow}>
            <div className={styles.Info}>
              <BoxIcon />
              <Text className={styles.Title}>Онлайн резерв товара</Text>
            </div>
            <div
              className={clsx(
                styles.TextColored,
                styles.OrderAvailability,
                styles.Status,
                styles[isAvailable],
              )}
            >
              {OnlineOrderStatuses[isAvailable]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductAmount;
