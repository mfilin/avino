import React from 'react';
import styles from './FooterMobile.module.scss';
import FooterLogo from '../../../../images/footer-logo.svg';
import VKLogo from '../../../../images/vk.svg';
import FacebookIcon from '../../../../images/facebook.svg';
import InstagramIcon from '../../../../images/instagram.svg';
import TelegramIcon from '../../../../images/telegram.svg';
import Payment from '../../../../images/payment-footer-mobile.svg';
import Link from 'next/link';
import Text from 'src/front/components/Typography/Text';
import Button from 'src/front/components/Button';

const FooterMobile: React.FC = ({}) => {
  return (
    <div className={styles.FooterMobile}>
      <div className={styles.Logo}>
        <FooterLogo />
      </div>

      <div className={styles.Text}>
        <Text level="s13h16w400" color="#BBBBBC">
          2021 - 2023 © "Виноград не виноват" – магазин алкоголя в Москве.
        </Text>
        <Text level="s13h16w400" color="#BBBBBC">
          Интернет-магазин розничной торговли элитных алкогольных напитков по
          Москве и Московской области.
        </Text>
      </div>

      <div className={styles.SocialLinks}>
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
      <div className={styles.Contacts}>
        <Link
          target="_blank"
          className={styles.Address}
          href="http://maps.yandex.ru/?text=125167,%20%D0%B3.%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0,%20%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D1%80-%D1%82,%20%D0%B4.%2048"
        >
          <Text level="s15h15w500" colorMode="white">
            Москва
          </Text>
          <Text level="s15h15w500" colorMode="white">
            Ленинградский пр-т, 48
          </Text>
        </Link>
        <a href="tel:+79260180707">
          <Text level="s15h15w500" colorMode="white">
            +7 (926) 018-07-07
          </Text>
        </a>
        <a href="mailto:vnvshop@mail.ru">
          <Text level="s15h15w500" colorMode="orange">
            vnvshop@mail.ru
          </Text>
        </a>
      </div>
      {/* <Button color="orange-outline" className={styles.WriteDirector}>
        Написать директору
      </Button> */}
      <Payment />
    </div>
  );
};
export default FooterMobile;
