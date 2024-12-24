import React from 'react';
import clsx from 'clsx';
import Title from 'src/front/components/Typography/Title';
import Text from 'src/front/components/Typography/Text';
import AddToCart from '../../../../../images/buyAndPay/add-to-cart.svg';
import OrderBtn from '../../../../../images/buyAndPay/order-btn.svg';
import Support from '../../../../../images/buyAndPay/support.svg';
import Cash from '../../../../../images/buyAndPay/cash.svg';
import PlasticCards from '../../../../../images/buyAndPay/plastic-cards.svg';
import ShallowLink from 'src/front/elements/ShallowLink';
import { Layout } from 'src/front/components';
import { useDeviceInfo } from '../../../../../hooks/device';

import styles from './RulesContainer.module.scss';

const howToOrderBlocks = [
  {
    id: 'addToCart',
    icon: <AddToCart />,
    title: 'Добавьте товар в корзину',
    text: (
      <Text level="s14h20w400" colorMode="grey">
        Перейдите на страницу{' '}
        <ShallowLink href="/cart" scroll prefetch={false}>
          {' '}
          Корзина{' '}
        </ShallowLink>
        (вы можете выбрать количество или отложить товары)
      </Text>
    ),
  },
  {
    id: 'orderBtn',
    icon: <OrderBtn />,
    title: 'Нажмите «Оформить заказ»',
    text: (
      <Text level="s14h20w400" colorMode="grey">
        Необходимо указать своё имя, адрес почты и телефон.Минимальная сумма
        заказа после применения всех скидок, промокодов, специальных условий и
        бонусов, должна быть не меньше 5 000 ₽
      </Text>
    ),
  },
  {
    id: 'Support',
    icon: <Support />,
    title: 'С Вами свяжется оператор',
    text: (
      <Text level="s14h20w400" colorMode="grey">
        Данные заказа будут отправлены на электронную почту. Принимаем заказы
        круглосуточно онлайн и рады видеть вас в винотеке с 11:00 до 23:00
      </Text>
    ),
  },
];

const howToPay = [
  {
    id: 'Cash',
    icon: <Cash />,
    title: 'Наличными',
    text: (
      <Text level="s14h20w400" colorMode="grey">
        Принимаем к оплате только российские рубли (р.)
      </Text>
    ),
  },
  {
    id: 'PlasticCards',
    icon: <PlasticCards />,
    title: 'Банковский картой',
    text: (
      <Text level="s14h20w400" colorMode="grey">
        Принимает дебетовые и кредитные карты платежных систем Visa, MasterCard,
        Мир
      </Text>
    ),
  },
];

const RulesContainer: React.FC = ({}) => {
  const { isMobile } = useDeviceInfo();

  return (
    <Layout>
      <div
        className={clsx(styles.RulesContainer, {
          [styles.MobileView]: isMobile,
        })}
      >
        <div className={styles.Block}>
          <div className={styles.Number}>01</div>
          <Title as="h2" withOrangeLine className={styles.Title}>
            Как сделать заказ
          </Title>
          <div className={styles.InfoList}>
            <Text level="s18h20w800">
              Виноград не виноват работает в строгом соответствии с законами
              Российской Федерации и города Москвы:
            </Text>
            <ul className={styles.List}>
              <li>
                <Text level="s14h20w400" colorMode="grey">
                  Не продает и не доставляет алкоголь в ночное время
                </Text>
              </li>
              <li>
                <Text level="s14h20w400" colorMode="grey">
                  Не продает и не доставляет алкоголь несовершеннолетним
                </Text>
              </li>
              <li>
                <Text level="s14h20w400" colorMode="grey">
                  Не осуществляет дистанционную продажу
                </Text>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.Block}>
          <div className={styles.Number}>02</div>
          <Title as="h2" withOrangeLine className={styles.Title}>
            Как сделать заказ
          </Title>
          <div className={styles.MiniBlocksList}>
            {howToOrderBlocks.map((item) => {
              return (
                <div className={styles.InfoBlock} key={item.id}>
                  <div className={styles.Icon}>{item.icon}</div>
                  <div className={styles.Info}>
                    <Text level="s18h15w600">{item.title}</Text>
                    {item.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.Block}>
          <div className={styles.Number}>03</div>
          <Title as="h2" withOrangeLine className={styles.Title}>
            Как сделать заказ
          </Title>
          <div className={styles.MiniBlocksList}>
            {howToPay.map((item) => {
              return (
                <div className={styles.InfoBlock} key={item.id}>
                  <div className={styles.Icon}>{item.icon}</div>
                  <div className={styles.Info}>
                    <Text level="s18h15w600">{item.title}</Text>
                    <Text level="s14h20w400" colorMode="grey">
                      {item.text}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.Block}>
          <div className={styles.Number}>04</div>
          <Title as="h2" withOrangeLine className={styles.Title}>
            Как сделать заказ
          </Title>
          <div className={styles.InfoList}>
            <Text level="s18h20w800">
              Ознакомиться и приобрести зарезервированные товары можно в удобных
              для вас местах:
            </Text>
            <ul className={styles.List}>
              <li>
                <Text level="s14h20w400" colorMode="grey">
                  Москва, Ленинградский проспект, 48
                </Text>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default RulesContainer;
