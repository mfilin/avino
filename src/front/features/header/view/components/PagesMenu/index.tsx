import React from 'react';
import Link from 'next/dist/client/link';
import ShallowLink from '../../../../../elements/ShallowLink';
import { IPageMenuItem } from '../../../../../../types/portal/server';

import FacebookIcon from '../../../../../images/facebook.svg';
import InstagramIcon from '../../../../../images/instagram.svg';
import TelegramIcon from '../../../../../images/telegram.svg';
import VkIcon from '../../../../../images/vk.svg';
import SelectLocation from '../SelectLocation/index';
import PhoneMenuPanel from '../PhoneMenuPanel/PhoneMenuPanel';

import styles from './PagesMenu.module.scss';

interface IOwnProps {
  items: IPageMenuItem[];
}

const PagesMenu: React.FC<IOwnProps> = (props) => {
  const { items } = props;

  return (
    <div className={styles.PagesMenu}>
      <div className={styles.brands}>
        <Link href="https://t.me/vinograd_ne_vinovat" target="_blank">
          <TelegramIcon />
        </Link>
        <Link href="https://vk.com/vnv_bar" target="_blank">
          <VkIcon />
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
        {/*<NavigationPointerIcon/>*/}
      </div>
      <div className={styles.pages}>
        {/*
        {(items || []).map((item) => {
          return (
            <div key={item.slug} className={styles.pageItem}>
              <ShallowLink href={`/${item.slug}`}>
                {item.title_menu}
              </ShallowLink>
            </div>
          );
        })}
          */}
        <Link href="/whisky/single-malt/" target="_blank" title="Виски" />
        <Link href="/cognac/" target="_blank" title="Коньяк" />
        <Link href="/grappa/" target="_blank" title="Граппа" />
      </div>
      <div>
        <SelectLocation />
      </div>
      <div className={styles.phonePane}>
        <PhoneMenuPanel />
      </div>
    </div>
  );
};

export default PagesMenu;
