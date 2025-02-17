import React from 'react';
import { Taxons } from '../../../../../../api/database/models/Taxons';
import Link, { LinkProps } from 'next/link';
import styles from './TopNavListMenu.module.scss';

interface IOwnProps {
  categories: Taxons[];
  currentCategory?: string;
}

const TopNavListMenu: React.FC<IOwnProps> = (props) => {
  return (
    <>
      <ul className="top-nav__menu">
        {/* prettier-ignore */}
        <li className="top-nav__item">
          <Link href="/wine/" target="_blank">Вино</Link>
        </li>
        {/* prettier-ignore */}
        <li className="top-nav__item">
          <Link href="/bubbles/" target="_blank">Шампанское</Link>
        </li>
        {/* prettier-ignore */}
        <li className="top-nav__item">
          <Link href="/whisky/" target="_blank">Виски</Link>
        </li>
        {/* prettier-ignore */}
        <li className="top-nav__item">
        <Link href="/cognac/" target="_blank">Коньяк</Link>
        </li>
        {/* prettier-ignore */}
        <li className="top-nav__item">
        <Link href="/vodka/" target="_blank">Водка</Link>
        </li>
        {/* prettier-ignore */}
        <li className="top-nav__item">
          <Link href="/spirits/" target="_blank">Крепкие напитки</Link>
        </li>
        {/* prettier-ignore */}
        <li className="top-nav__item">
          <Link href="/mixology/" target="_blank">Ликеры</Link>
        </li>
        {/* prettier-ignore */}
        <li className="top-nav__item">
          <Link href="/drugie_napitki/" target="_blank">Прочее</Link>
        </li>
        {/* prettier-ignore */}
        <li className="top-nav__item">
          <Link href="/glass-all/" target="_blank">Стекло</Link>
        </li>
        {/* prettier-ignore */}
        <li className="top-nav__item">
          <Link href="/accessory/" target="_blank">Аксессуары</Link>
        </li>
        {/* prettier-ignore */}
        <li className="top-nav__item">
          <Link href="/promo/" target="_blank">Акции</Link>
        </li>
      </ul>
    </>
  );
};
export default TopNavListMenu;
