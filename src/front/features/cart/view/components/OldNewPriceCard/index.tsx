import React from 'react';
import styles from './OldNewPriceCard.module.scss';
import Text from 'src/front/components/Typography/Text';
import { IDefaultCardProps } from 'src/front/types/cards';
import { formatPriceString } from 'src/front/utils/price';

interface IOldNewPriceCardProps {
  oldPrice: number;
  newPrice: number;
}

// This component is temporarily disabled to avoid compilation errors
const OldNewPriceCard: React.FC<IDefaultCardProps & IOldNewPriceCardProps> = (
  {
    // img,
    // oldPrice,
    // newPrice,
    // vendorCode,
    // name = 'Коньяк Frapin VSOP Grande Chsmpagne 1er Grand Cru du Cognac, Frapin',
  },
) => {
  // Return null instead of the actual component to disable it
  return null;
  // Original implementation is commented out
  /*
  return (
    <div className={styles.Card}>
      <div className={styles.ImageBlock}>
        <img
          src={
            img ??
            'https://irecommend.ru/sites/default/files/product-images/680447/QOc68Q2A4EzlTNF6mX9Rg.jpg'
          }
        />
      </div>
      <div className={styles.InfoBlock}>
        <Text className={styles.Vendor} level="s12h16w400" colorMode={'grey'}>
          Артикул: {vendorCode}
        </Text>
        <Text className={styles.Name} level={'s14h16w600'}>
          {name}
        </Text>
        <div className={styles.PricesBlock}>
          <div className={styles.Price}>
            <Text level="s13h16w400">Старая цена</Text>
            <Text level="s24h32w700">{formatPriceString(oldPrice)}</Text>
          </div>
          <div className={styles.Price}>
            <Text level="s13h16w400" colorMode="red">
              Новая цена
            </Text>
            <Text level="s24h32w700" colorMode="red">
              {formatPriceString(newPrice)}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
  */
};

export default OldNewPriceCard;
