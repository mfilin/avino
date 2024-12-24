import React from 'react';
import Text from '../../../../../../../components/Typography/Text';
import ArrowUpIcon from '../../../../../../../images/arrow-up.svg';

import styles from './SingleProductCardMobileInStockSection.module.scss';

const SingleProductCardMobileInStockSection: React.FC = () => {
  return (
    <div className={styles.SingleProductCardMobileInStockSection}>
      <Text level="s15h18w800" colorMode="green">
        В наличии на складе и в 1 магазине
      </Text>
      <Text level="s12h16w400" colorMode="grey">
        Наличие в магазинах
      </Text>
      <div className={styles.StoreAddresses}>
        <div className={styles.Visible}>
          <div>
            <Text level="s12h11w500">Ленинградский проспект -</Text>{' '}
            <Text level="s12h11w500" colorMode="green">
              в наличии
            </Text>
          </div>
          <ArrowUpIcon />
        </div>
        <div className={styles.Extendable}>
          <Text level="s11h16w400" colorMode="grey">
            Адрес: Москва, Ленинградский просп.,48
          </Text>
          <div className={styles.Group}>
            <Text level="s11h16w400" colorMode="grey">
              Метро:
            </Text>
            <Text level="s11h16w400" colorMode="green">
              Аэропорт, Динамо,
            </Text>
            <Text level="s11h16w400" color="#00C5C3">
              Петровский парк
            </Text>
          </div>
          <Text level="s11h16w400" colorMode="grey">
            пн-вс: 09:00 - 22:00
          </Text>
          <div className={styles.Group}>
            <Text level="s11h16w400" colorMode="grey">
              Уточняйте наличие по тел.
            </Text>
            <Text level="s11h16w400">+7 (926) 018-07-07</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCardMobileInStockSection;
