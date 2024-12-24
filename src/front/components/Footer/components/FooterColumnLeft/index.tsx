import React from 'react';

import FooterLogo from '../../../../images/footer-logo.svg';
import VKLogo from '../../../../images/vk.svg';
import FacebookIcon from '../../../../images/facebook.svg';
import InstagramIcon from '../../../../images/instagram.svg';
import TelegramIcon from '../../../../images/telegram.svg';

import styles from './FooterColumnLeft.module.scss';
import Link from 'next/link';

const FooterColumnLeft: React.FC = () => {
  return (
    <div className={styles.FooterColumnLeft}>
      <div className={styles.Top}>
        <FooterLogo />
      </div>

      <div className={styles.Text}>
        <p>2021 - 2023 © "Виноград не виноват" – магазин алкоголя в Москве.</p>
        <p>
          Интернет-магазин розничной торговли элитных алкогольных напитков по
          Москве и Московской области.
        </p>
      </div>

      <div className={styles.Social}>
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
  );
};

export default FooterColumnLeft;
