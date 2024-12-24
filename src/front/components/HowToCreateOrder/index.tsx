import React from 'react';
import styles from './HowToCreateOrder.module.scss';
import CartIcon from '../../images/cart-plus.svg';
import ShopIcon from '../../images/big-shop.svg';
import WalletIcon from '../../images/wallet.svg';
import BagIcon from '../../images/bag-one-bottle.svg';
import Text from '../Typography/Text';
import Title from '../Typography/Title';
import Button from '../Button';
import Config from 'src/front/config';
import ShallowLink from '../../elements/ShallowLink';
import { useDeviceInfo } from '../../hooks/device';

const blocks = [
  {
    id: 'bag',
    text: 'Забирайте товар',
    description: 'а мы будем ждать вас вновь за новыми покупками',
    icon: <BagIcon />,
  },
  {
    id: 'wallet',
    text: 'Оплачивайте заказ на кассе магазина',
    description:
      'мы принимем к оплате российские рубли, а также карты Мир, Union Pay, Visa, MasterCard',
    icon: <WalletIcon />,
  },
  {
    id: 'shop',
    text: 'Приезжайте в наш оффлайн магазин',
    description:
      'Наш магазин находится по адресу г.Москва, Ленинградский проспект, д.48',
    icon: <ShopIcon />,
  },
  {
    id: 'cart',
    text: 'Резервируйте товар с помощью сайта',
    description: 'используйте наш каталог для выбора напитков',
    icon: <CartIcon />,
  },
];

const reversedBlocks = blocks.reverse();

const HowToCreateOrder: React.FC = ({}) => {
  const { isMobile } = useDeviceInfo();

  if (isMobile) {
    return (
      <div className={styles.WrapperMobileView}>
        <Title as="h2" withOrangeLine>
          Как сделать заказ
        </Title>
        <div className={styles.Blocks}>
          {reversedBlocks.map((block) => {
            return (
              <div className={styles.Block} key={block.id}>
                {block.icon}
                <Text level="s15h18w800" className={styles.BlockTitle}>
                  {block.text}
                </Text>
                <Text level="s13h15w500" colorMode="grey">
                  {block.description}
                </Text>
              </div>
            );
          })}
        </div>
        <div className={styles.StartBuyButton}>
          <ShallowLink href="/cognac-all">
            <Button color="orange-outline" stretched>
              Начать покупки
            </Button>
          </ShallowLink>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.Wrapper}>
      <Title as="h2" withOrangeLine>
        Как сделать заказ
      </Title>
      <div className={styles.Blocks}>
        {blocks.map((block, index) => (
          <div className={styles.Block} key={block.id}>
            <div className={styles.Info}>
              {block.icon}
              <Text level="s15h18w800" className={styles.Title}>
                {block.text}
              </Text>
              <Text
                level="s14h17w400"
                className={styles.Description}
                colorMode="grey"
              >
                {block.description}
              </Text>
            </div>
            <img
              src={`${Config.basePath}${
                index % 2 === 0
                  ? '/images/white-rectangle.png'
                  : '/images/grey-rectangle.png'
              }`}
              width={375}
              height={220}
              alt="background"
            />
            {block.id === 'cart' && (
              <div className={styles.StartBuying}>
                <ShallowLink href="/cognac-all">
                  <Button color="orange-outline"> Начать покупки </Button>
                </ShallowLink>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default HowToCreateOrder;
