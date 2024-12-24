import React from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Cart from '../../images/bottomMenu/cart.svg';
import Home from '../../images/bottomMenu/home.svg';
import Search from '../../images/bottomMenu/search.svg';
import ShallowLink from '../../elements/ShallowLink';
import { UserDataContext } from '../../providers/userDataStoreProvider';
import Drawer from '../Drawer';
import { DrawerContext, EDrawersNames } from '../../providers/drawerProvider';
import CatalogMobileMenu from '../CatalogMobileMenu';
import { usePortalStatic } from '../../hooks/usePortalStatic';

import styles from './MobileBottomMenu.module.scss';
import { useDeviceInfo } from '../../hooks/device';

const menuItems = [
  {
    id: 'home',
    text: 'Главная',
    icon: <Home />,
    href: '/',
  },
  {
    id: 'catalog',
    text: 'Каталог',
    icon: <Search />,
  },
  // {
  //   id: 'profile',
  //   text: 'Мой Виноград',
  //   icon: <Account />,
  //   href: '/profile',
  // },
  {
    id: 'cart',
    text: 'Корзина',
    icon: <Cart />,
    href: '/cart',
    withCount: true,
  },
  // {
  //   id: 'favorite',
  //   text: 'Избранное',
  //   icon: <Favorite />,
  //   href: '/favorite',
  // withCount: true
  // },
];

const MobileBottomMenu: React.FC = React.memo(() => {
  const { isMobile } = useDeviceInfo();
  const { userData } = React.useContext(UserDataContext);
  const { toggleDrawer } = React.useContext(DrawerContext);
  const { pageProps } = usePortalStatic();
  const pathname = usePathname();
  const counts = React.useMemo(() => {
    return {
      cart: userData?.cart.reduce(
        (acc, product) => acc + (product.count_in_cart || 0),
        0,
      ),
      favorite: userData?.favorite.reduce(
        (acc, product) => acc + (product.count_in_cart || 0),
        0,
      ),
    };
  }, [userData]);
  const handleToggleCatalogDrawer = React.useCallback(() => {
    toggleDrawer(EDrawersNames.catalog);
  }, [toggleDrawer]);

  if (!isMobile || !pageProps) {
    return null;
  }

  return (
    <>
      <div className={styles.MobileBottomMenu}>
        {menuItems.map(({ text, icon, href, id, withCount }) => {
          if (id === 'catalog') {
            return (
              <div
                className={clsx(styles.MenuItem, {
                  [styles.Active]: pathname === href,
                })}
                onClick={handleToggleCatalogDrawer}
                key={id}
              >
                {icon}
                <span>{text}</span>
              </div>
            );
          }
          return (
            <ShallowLink href={href || ''} key={id}>
              <div
                className={clsx(styles.MenuItem, {
                  [styles.Active]: pathname === href,
                })}
                onClick={
                  id === 'catalog' ? handleToggleCatalogDrawer : undefined
                }
              >
                {icon}
                <span>{text}</span>
                {withCount && counts[id] > 0 && (
                  <div className={styles.Count}>{counts[id]}</div>
                )}
              </div>
            </ShallowLink>
          );
        })}
      </div>
      {toggleDrawer && (
        <Drawer
          drawerId={EDrawersNames.catalog}
          title="Каталог винограда"
          onClose={handleToggleCatalogDrawer}
        >
          <CatalogMobileMenu catalog={pageProps?.settings.categories.catalog} />
        </Drawer>
      )}
    </>
  );
});
export default MobileBottomMenu;
