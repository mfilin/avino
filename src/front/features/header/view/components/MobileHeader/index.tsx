import React from 'react';
import styles from './MobileHeader.module.scss';
import ProductSuggestion from '../ProductSuggestion';
import Burger from '../../../../../images/mobileHeader/burger.svg';
import Location from '../../../../../images/mobileHeader/location.svg';
import Logo from '../../../../../images/mobileHeader/logo.svg';
import Phone from '../../../../../images/mobileHeader/phone.svg';
import Search from '../../../../../images/mobileHeader/search.svg';
import clsx from 'clsx';
import Drawer from '../../../../../components/Drawer/index';
import {
  DrawerContext,
  EDrawersNames,
} from 'src/front/providers/drawerProvider';
import MobileMenu from './MobileMenu/index';
import { TClientCatalogItem } from 'src/types/portal/client';
import ManagerCallForm from '../../../../../components/ManagerCallForm/index';
import SubscribeToPromoForm from '../../../../../components/SubscribeToPromoForm/index';
import ShopsInfo from '../../../../../components/ShopsInfo/index';
import ContactsBlock from '../../../../../components/ContactsBlock/index';
import ShallowLink from '../../../../../elements/ShallowLink';
import { SearchBarContext } from 'src/front/providers/SearchBarProvider/SearchBarContext';
import { ISearchBarControl } from 'src/front/providers/SearchBarProvider/namespace';

interface IOwnProps {
  catalog: { [key: string]: TClientCatalogItem };
  defaultValue?: string;
  onSearchBarEnter?(): void;
}

const MobileHeader: React.FC<IOwnProps> = ({
  catalog,
  defaultValue,
  onSearchBarEnter,
}) => {
  const searchBar = React.useRef<HTMLDivElement>();
  const { toggleDrawer } = React.useContext(DrawerContext);
  const searchBarControl: ISearchBarControl =
    React.useContext(SearchBarContext);
  const [searchBarIsSticky, setSearchBarIsSticky] = React.useState(false);

  const handleScroll = () => {
    const topHeaderHeight = document
      .getElementById('top-header')
      ?.getBoundingClientRect().height;
    if (window.scrollY >= topHeaderHeight) {
      setSearchBarIsSticky(true);
    } else {
      setSearchBarIsSticky(false);
    }
  };

  React.useEffect(() => {
    window.onscroll = handleScroll;
  }, []);

  const handleSearchBarEnter = React.useCallback(() => {
    searchBarControl.pushSearchRoute();
  }, [searchBarControl]);

  const handleToggleMenuDrawer = React.useCallback(() => {
    toggleDrawer(EDrawersNames.burgerMenu);
  }, [toggleDrawer]);

  const handleToggleManagerCallDrawer = React.useCallback(() => {
    toggleDrawer(EDrawersNames.managerCall);
  }, [toggleDrawer]);

  const handleTogglePromosDrawer = React.useCallback(() => {
    toggleDrawer(EDrawersNames.promoAndDiscounts);
  }, [toggleDrawer]);

  const handleToggleOurShopsDrawer = React.useCallback(() => {
    toggleDrawer(EDrawersNames.ourShops);
  }, [toggleDrawer]);

  const handleToggleContactsDrawer = React.useCallback(() => {
    toggleDrawer(EDrawersNames.contacts);
  }, [toggleDrawer]);

  return (
    <div className={styles.MobileHeader}>
      <div className={styles.TopHeader} id="top-header">
        <div className={styles.BurgerBtn} onClick={handleToggleMenuDrawer}>
          <Burger />
        </div>
        <div className={styles.Logo}>
          <ShallowLink href="/">
            <Logo />
          </ShallowLink>
        </div>
        <div className={styles.Contacts}>
          <div className={styles.Shops} onClick={handleToggleOurShopsDrawer}>
            <Location />
          </div>
          <div className={styles.Phone} onClick={handleToggleContactsDrawer}>
            <Phone />
          </div>
        </div>
      </div>
      <div
        className={clsx(styles.SearchBlock, {
          [styles.StickyBar]: searchBarIsSticky,
        })}
        id="navbar"
        ref={searchBar}
      >
        <div className={styles.Search}>
          <ProductSuggestion
            defaultValue={defaultValue}
            onEnter={onSearchBarEnter}
          />
        </div>
        <div className={styles.SearchIcon} onClick={handleSearchBarEnter}>
          <Search />
        </div>
      </div>
      <Drawer
        onClose={handleToggleMenuDrawer}
        drawerId={EDrawersNames.burgerMenu}
      >
        <MobileMenu
          catalog={catalog}
          onClose={handleToggleMenuDrawer}
          onClickManagerCallBtn={handleToggleManagerCallDrawer}
          onClickPromoAndDiscountsBtn={handleTogglePromosDrawer}
        />
      </Drawer>

      <Drawer
        onClose={handleToggleManagerCallDrawer}
        drawerId={EDrawersNames.managerCall}
        title="Заказать звонок"
      >
        <ManagerCallForm />
      </Drawer>
      <Drawer
        onClose={handleTogglePromosDrawer}
        drawerId={EDrawersNames.promoAndDiscounts}
        title="Все акции в кармене"
      >
        <SubscribeToPromoForm />
      </Drawer>
      <Drawer
        onClose={handleToggleOurShopsDrawer}
        drawerId={EDrawersNames.ourShops}
        title="Наши магазины"
      >
        <ShopsInfo />
      </Drawer>
      <Drawer
        onClose={handleToggleContactsDrawer}
        drawerId={EDrawersNames.contacts}
        title="Контакты"
      >
        <ContactsBlock />
      </Drawer>
    </div>
  );
};
export default MobileHeader;
