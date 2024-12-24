import React from 'react';
import clsx from 'clsx';
import Text from '../Typography/Text';
import Link from 'next/link';
import VKLogo from '../../images/mobileHeader/vk.svg';
import FacebookIcon from '../../images/mobileHeader/facebook.svg';
import InstagramIcon from '../../images/mobileHeader/insta.svg';
import TelegramIcon from '../../images/mobileHeader/telegram.svg';
import Button from '../Button';
import { DrawerContext, EDrawersNames } from '../../providers/drawerProvider';
import { useDeviceInfo } from '../../hooks/device';

import styles from './ContactsBlock.module.scss';

const ContactsBlock: React.FC = ({}) => {
  const { toggleDrawer } = React.useContext(DrawerContext);
  const { isMobile } = useDeviceInfo();

  return (
    <div
      className={clsx(styles.ContactsBlock, {
        [styles.DesktopView]: !isMobile,
      })}
    >
      <div className={styles.Contacts}>
        <div className={styles.Row}>
          <Text level="s13h16w400" colorMode="grey">
            Мобильный телефон{' '}
          </Text>
          <Link href={`tel:+79260180707`}>
            <Text level="s15h15w700">+7 (926) 018-07-07</Text>
          </Link>
        </div>
        <div className={styles.Row}>
          <Text level="s13h16w400" colorMode="grey">
            Электронная почта{' '}
          </Text>
          <Link href={`mailto:vnvshop@mail.ru`}>
            <Text level="s15h15w700">vnvshop@mail.ru</Text>
          </Link>
        </div>
        <div className={styles.Row}>
          <Text level="s13h16w400" colorMode="grey">
            Принимаем заказы круглосуточно онлайн и рады видеть вас в винотеке с
          </Text>
          <Text level="s15h15w700">11:00 до 23:00</Text>
        </div>
        <div className={styles.Row}>
          <Text level="s13h16w400" colorMode="grey">
            Мессенджеры
          </Text>
          <div className={styles.Socials}>
            <Link href="https://t.me/vinograd_ne_vinovat" target="_blank">
              <TelegramIcon />
            </Link>
            <Link href="https://vk.com/vnv_bar" target="_blank">
              <VKLogo />
            </Link>
            <Link
              href="https://instagram.com/vnv_bar?igshid=MzRlODBiNWFlZA=="
              target="_blank"
            >
              <InstagramIcon />
            </Link>
            <Link
              href="https://www.facebook.com/vnv.bar.msk?mibextid=LQQJ4d"
              target="_blank"
            >
              <FacebookIcon />
            </Link>
          </div>
        </div>
      </div>
      <Button
        color="orange-outline"
        onClick={() => toggleDrawer(EDrawersNames.managerCall)}
        stretched
      >
        Перезвоните мне
      </Button>
    </div>
  );
};
export default ContactsBlock;
