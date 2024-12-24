import React from 'react';
import clsx from 'clsx';
import HeartIcon from '../../../../../images/heart-in-hands.svg';
import CertificateIcon from '../../../../../images/certificate-orange.svg';
import BottleIcon from '../../../../../images/bottle-and-glass.svg';
import CartSalesIcon from '../../../../../images/cart-and-sales.svg';
import Text from '../../../../../components/Typography/Text';
import Title from '../../../../../components/Typography/Title';
import Button from 'src/front/components/Button';

import styles from './AddUsToFavorite.module.scss';
import { useDeviceInfo } from '../../../../../hooks/device';

interface IOwnProps {
  onSubscribe(): void;
}

const leftBlocks = [
  {
    id: 'drink-order',
    title: 'Напиток на заказ',
    text: 'найдем и привезем любой напиток, с любой точки Мира. Мы Head Hunter в мире алкоголя',
    icon: <BottleIcon />,
  },
  {
    id: 'certificate',
    title: 'Сертификация',
    text: 'все алкогольные напитки предоставленные в нашей витрине имеют сертификаты',
    icon: <CertificateIcon />,
  },
  {
    id: 'sales',
    title: 'Регулярные скидки и акции',
    text: 'следите за нашей рассылкой с новыми спецпредложениями',
    icon: <CartSalesIcon />,
  },
  {
    id: 'heart',
    title: 'Внимание и забота о клиентах',
    text: 'оказываем послепродажный сервис и всегда готовы помочь своим клиентам',
    icon: <HeartIcon />,
  },
];

const infoBlocks = [
  {
    id: 'ages',
    title: '10 лет+',
    text: 'мы занимаемся подъемом вашего настроения и приносим радость в ваши дружные компании',
  },
  {
    id: 'clients',
    title: '90%',
    text: 'наших клиентов возвращаются к нам за покупками после первой покупки',
  },
  {
    id: 'products',
    title: '10 000+',
    text: 'наименований алкоголя уже на нашей витрине, и мы постоянно расширяем ассортимент',
  },
  {
    id: 'time',
    title: '15 секунд',
    text: 'максимальное время ожилания оператора',
  },
];
const AddUsToFavorite: React.FC<IOwnProps> = ({ onSubscribe }) => {
  const { isMobile } = useDeviceInfo();

  return (
    <div
      className={clsx(styles.AddUsToFavorite, {
        [styles.MobileView]: isMobile,
      })}
    >
      <div>
        <div className={styles.LeftBlocks}>
          {leftBlocks.map((block) => {
            return (
              <div className={styles.Block} key={block.id}>
                {block.icon}
                <Text level="s15h18w800" className={styles.BlockTitle}>
                  {block.title}
                </Text>
                <Text
                  level={isMobile ? 's13h15w500' : 's14h15w400'}
                  colorMode="grey"
                >
                  {block.text}
                </Text>
                {/* {!isMobile && block.id === 'sales' && (
                <div className={styles.SubscribeButton}>
                  <Button color="orange-outline">
                    Подписаться на рассылку
                  </Button>
                </div>
              )} */}
              </div>
            );
          })}
        </div>
        {/* {isMobile && (
          <div className={styles.SubscribeButton}>
            <Button color="orange-outline" stretched>
              Подписаться на рассылку
            </Button>
          </div>
        )} */}
      </div>
      <div className={styles.InfoRight}>
        <Title as="h2" withOrangeLine>
          Добавьте нас в избранное
        </Title>
        <div className={styles.Info}>
          {infoBlocks.map(({ id, title, text }) => {
            return (
              <div className={styles.InfoBlock} key={id}>
                <Text className={styles.InfoTitle}>{title}</Text>
                <Text
                  level={isMobile ? 's13h15w500' : 's14h15w400'}
                  className={styles.InfoText}
                  colorMode="grey"
                >
                  {text}
                </Text>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default AddUsToFavorite;
