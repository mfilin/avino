import React from 'react';

import ShallowLink from '../../../../../elements/ShallowLink';
import { HamburgerButton, LogoBig } from '../../../../../components';
import { Button } from '../../../../../elements';
import ProductSuggestion from '../ProductSuggestion';
import SearchIcon from '../../../../../images/search-icon.svg';
import CartButton from '../CartButton/index';
import { UserDataContext } from 'src/front/providers/userDataStoreProvider';
import { getCheckedProductsByStorage } from 'src/front/utils/getCheckedProductsByStorage';
import { BodyControlContext } from '../../../../../providers/BodyControlProvider/BodyControlContext';

import styles from './MiddleHeaderBar.module.scss';

interface IOwnProps {
  onChangeCatalogState: (isOpen: boolean) => void;
  isCatalogOpen: boolean;
  defaultValue?: string;
  onSearchBarEnter?(): void;
}

const MiddleHeaderBar: React.FC<IOwnProps> = (props) => {
  const {
    isCatalogOpen,
    onChangeCatalogState,
    defaultValue,
    onSearchBarEnter,
  } = props;
  const { userData, clearLastAddedToCart } = React.useContext(UserDataContext);
  const { setScrollableMode } = React.useContext(BodyControlContext);

  const cartInfo = userData?.cart.reduce(
    (acc, item) => ({
      itemsCount: acc.itemsCount + item.count_in_cart,
      summaryPrice: acc.summaryPrice + item.price * item.count_in_cart,
    }),
    { itemsCount: 0, summaryPrice: 0 },
  );

  const handleHamburgerClick = React.useMemo(() => {
    let openedState = false;
    return () => {
      openedState = !openedState;
      onChangeCatalogState(openedState);
      setScrollableMode(!openedState);
    };
  }, [onChangeCatalogState, setScrollableMode]);

  const lastAddedToCart = React.useMemo(() => {
    if (!userData?.lastAddedToCart) {
      return null;
    }
    return getCheckedProductsByStorage(
      [userData?.lastAddedToCart],
      userData,
    )[0];
  }, [userData]);

  const handleCloseLastAddedModal = React.useCallback(() => {
    clearLastAddedToCart();
  }, []);

  return (
    <div className={styles.MiddleHeaderBar}>
      <div className={styles.Content}>
        <ShallowLink href="/">
          <div className={styles.logo}>
            <LogoBig />
          </div>
        </ShallowLink>

        <div className={styles.catalogButton}>
          <HamburgerButton
            caption="Каталог"
            isOpen={isCatalogOpen}
            onClick={handleHamburgerClick}
          />
        </div>

        <div className={styles.searchBar}>
          <ProductSuggestion
            onEnter={onSearchBarEnter}
            defaultValue={defaultValue}
          />
        </div>
        <div className={styles.searchButton}>
          <Button endContent={<SearchIcon />} onClick={onSearchBarEnter}>
            Найти
          </Button>
        </div>
        {/* <div
          style={{
            marginLeft: '30px',
            alignSelf: 'center',
          }}
        >
          <Link href="/comparison">
            <ComparisonIcon fill="#35393E" />
          </Link>
        </div>
        <div
          style={{
            marginLeft: '30px',
            alignSelf: 'center',
          }}
        >
          <Link href="/favorite">
            <FavoriteIcon fill="#35393E" />
          </Link>
        </div> */}
      </div>
      <CartButton
        countInCart={cartInfo?.itemsCount}
        summary={cartInfo?.summaryPrice}
        onClose={handleCloseLastAddedModal}
        addedProduct={lastAddedToCart}
      />
    </div>
  );
};

export default MiddleHeaderBar;
