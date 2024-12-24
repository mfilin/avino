import React from 'react';
import clsx from 'clsx';
import Text from '../Typography/Text';
import Link from 'next/link';
import Image from 'next/image';
import Config from '../../config';
import Subway from '../../images/shopsInfo/subway-icon.svg';
import Phone from '../../images/shopsInfo/phone-fill.svg';
import Location from '../../images/shopsInfo/location.svg';
import BreakLine from '../BreakLine';
import { useDeviceInfo } from '../../hooks/device';

import styles from './ShopsInfo.module.scss';

const moscowShopMapLink =
  'http://maps.yandex.ru/?text=125167,%20%D0%B3.%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0,%20%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D1%80-%D1%82,%20%D0%B4.%2048';

const shops = [
  {
    city: 'Москва',
    mapLink: moscowShopMapLink,
    info: [
      {
        id: 'subway1',
        icon: <Subway fill="#00A300" />,
        name: 'метро Аэропорт',
      },
      {
        id: 'subway2',
        icon: <Subway fill="#00A300" />,
        name: 'метро Динамо',
      },
      {
        id: 'subway3',
        icon: <Subway fill="#00C5C3" />,
        name: 'метро Петровский парк',
      },
      {
        id: 'location',
        icon: <Location fill="#797979" />,
        name: 'Ленинградский просп., 48',
        link: moscowShopMapLink,
      },
      {
        id: 'phone',
        icon: <Phone fill="#797979" />,
        name: '+7 (926) 018-07-07',
      },
    ],
  },
];

const ShopsInfo: React.FC = ({}) => {
  const { isMobile } = useDeviceInfo();
  return (
    <div
      className={clsx(styles.ShopsInfo, { [styles.DesktopView]: !isMobile })}
    >
      {shops.map((shop) => {
        return (
          <div key={shop.city} className={styles.Shop}>
            <div className={styles.City}>
              <Text level="s18h20w800">{shop.city},</Text>
              <Link href={shop.mapLink} target="_blank">
                <Text level="s12h16w400" colorMode="orange">
                  1 магазин
                </Text>
              </Link>
            </div>
            <div className={styles.Map}>
              <Link href={shop.mapLink} target="_blank">
                <img src={`${Config.basePath}/images/shopMap.jpg`} alt="map" />
              </Link>
            </div>
            <div className={styles.Info}>
              {shop.info.map((item) => {
                return (
                  <div className={styles.InfoRow} key={item.id}>
                    {item.icon}
                    {item.id === 'phone' ? (
                      <Link href={`tel:${item.name}`}>
                        <Text level={isMobile ? 's15h15w500' : 's13h16w400'}>
                          {item.name}
                        </Text>
                      </Link>
                    ) : item.id === 'location' ? (
                      <Link href={item.link}>
                        <Text level={isMobile ? 's15h15w500' : 's13h16w400'}>
                          {item.name}
                        </Text>
                      </Link>
                    ) : (
                      <Text level={isMobile ? 's15h15w500' : 's13h16w400'}>
                        {item.name}
                      </Text>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <BreakLine />
      <Text level="s12h16w400" colorMode="grey" className={styles.Hint}>
        Выбор города влияет на ассортимент товара и возможные способы получения
      </Text>
    </div>
  );
};
export default ShopsInfo;
