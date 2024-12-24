import React from 'react';
import clsx from 'clsx';
import { IPageProps } from '../../../../../../types/portal/server';
import Text from 'src/front/components/Typography/Text';
import { UserDataContext } from 'src/front/providers/userDataStoreProvider';
import Button from 'src/front/components/Button';
import ShallowLink from '../../../../../elements/ShallowLink';
import { IProduct } from 'src/front/api/types/product';
import CheckoutBlock from '../../components/CheckoutBlock/index';
import { getCheckedProductsByStorage } from 'src/front/utils/getCheckedProductsByStorage';
import CartProductCard from '../../components/CartProductCard/index';
import RemovedProductCard from '../../components/RemovedProductCard/index';
import Title from '../../../../../components/Typography/Title/index';
import { useMutation } from '@tanstack/react-query';
import Api from '../../../../../api';
import { ICartOrderForm } from '../../../namespace';
import { Layout } from 'src/front/components';
import { useIsInViewport } from 'src/front/hooks/useIsInViewPort';
import CartMobileStickyBar from '../../components/CartMobileStickyBar/index';
import { useDeviceInfo } from '../../../../../hooks/device';

import styles from './CartContainer.module.scss';

interface IOwnProps {
  pageProps: IPageProps;
}

const CartContainer: React.FC<IOwnProps> = (props) => {
  const {
    userData,
    updateCartWithProduct,
    removeFromRemovedList,
    clearCart,
    moveFromCartToOrder,
  } = React.useContext(UserDataContext);
  const { isMobile } = useDeviceInfo();
  const cartItems = getCheckedProductsByStorage(userData?.cart, userData);
  const removedItems = userData?.removedFromCart || [];
  const { mutate: sendForm } = useMutation({
    mutationFn: async (values: ICartOrderForm) => {
      await Api.instance.cart.sendCartShort({
        name: values.name,
        phone: values.phone,
      });
    },
  });
  const cartItemsCount = cartItems.reduce(
    (acc, curr) => acc + curr.count_in_cart,
    0,
  );
  const [showAllRemoved, setShowAllRemoved] = React.useState(false);
  const refCheckoutBlock = React.useRef(null);
  const checkoutBlockInViewport = useIsInViewport(refCheckoutBlock);

  const handleChangeUnderBottomLimit = (product: IProduct) => {
    const result = confirm(
      `Вы действительно хотите удалить из корзины ${product.name}`,
    );
    if (result) {
      updateCartWithProduct(product, 0, true);
    }
  };

  const handleRecoverToCart = React.useCallback((product: IProduct) => {
    updateCartWithProduct(product, 1);
  }, []);

  const handleUpdateCartWithProduct = React.useCallback(
    (product: IProduct, count: number) => {
      updateCartWithProduct(product, count);
    },
    [],
  );
  const itemsSumPriceWithoutDiscount = cartItems.reduce((acc, curr) => {
    return acc + curr.price * curr.count_in_cart;
  }, 0);

  const handleCheckPromoCode = React.useCallback((code: string) => {
    //do something to check
    console.log('promocode', code);
    return {
      error: 'Промокод не найден',
      // discount: 1000,
    };
  }, []);

  const handleScrollToCheckoutBlock = React.useCallback(() => {
    const y =
      document.getElementById('checkoutBlock').getBoundingClientRect().top +
      window.scrollY -
      100;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, []);

  return (
    <Layout>
      <div
        className={clsx(styles.CartContainer, {
          [styles.MobileView]: isMobile,
        })}
      >
        <div className={styles.LeftSide}>
          <div className={styles.CartHeader}>
            <div className={styles.Title}>
              <Title as="h1" withOrangeLine>
                Корзина
              </Title>
              <Text
                level="s15h15w500"
                colorMode="grey"
                className={styles.Count}
              >
                ({cartItemsCount})
              </Text>
            </div>
            {cartItemsCount > 0 && (
              <div className={styles.ClearCartBtn} onClick={clearCart}>
                <Text level="s15h15w500" colorMode="orange" widthDecoration>
                  Очистить корзину
                </Text>
              </div>
            )}
          </div>
          {cartItemsCount < 1 && (
            <div className={styles.EmptyCartBlock}>
              <Text level="s15h15w500" className={styles.EmptyCartText}>
                Мир алкогольных напитков ждет Вас! Добавьте товары в корзину,
                чтобы оформить заказ.{' '}
              </Text>
              <ShallowLink href="/cognac-all">
                <Button color="black-fill">Перейти в каталог</Button>
              </ShallowLink>
            </div>
          )}
          {cartItemsCount > 0 && (
            <div className={styles.ProductsInCartList}>
              {cartItems.map((item) => {
                return (
                  <CartProductCard
                    key={item.id}
                    viewMode={isMobile ? 'mobile' : 'desktop'}
                    productInfo={item}
                    onAddToCart={handleUpdateCartWithProduct}
                    onChangeUnderBottomLimit={handleChangeUnderBottomLimit}
                  />
                );
              })}
            </div>
          )}
          {removedItems.length > 0 && !isMobile && (
            <div className={styles.RemovedItemsBLock}>
              <Text level="s24h32w700">Удаленные товары</Text>
              {(showAllRemoved ? removedItems : removedItems.slice(0, 3)).map(
                (item) => {
                  return (
                    <RemovedProductCard
                      productInfo={item}
                      key={item.id}
                      viewMode={isMobile ? 'mobile' : 'desktop'}
                      onRecover={handleRecoverToCart}
                      onRemove={removeFromRemovedList}
                    />
                  );
                },
              )}
              {removedItems.length > 3 && (
                <div
                  className={styles.ShowMore}
                  onClick={() => setShowAllRemoved((prev) => !prev)}
                >
                  <Text level="s12h16w400" colorMode="orange">
                    {showAllRemoved ? 'Свернуть' : 'Показать все'}
                  </Text>
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.RightSide} ref={refCheckoutBlock}>
          {cartItemsCount > 0 && (
            <CheckoutBlock
              sum={itemsSumPriceWithoutDiscount}
              onCheckPromoCode={handleCheckPromoCode}
              discount={0}
              itemsCount={cartItemsCount}
              onSubmitFastOrder={sendForm}
              onMoveToCheckout={moveFromCartToOrder}
            />
          )}
        </div>
        {removedItems.length > 0 && isMobile && (
          <div className={styles.RemovedItemsBLock}>
            <Text level="s24h32w700">Удаленные товары</Text>
            {(showAllRemoved ? removedItems : removedItems.slice(0, 3)).map(
              (item) => {
                return (
                  <RemovedProductCard
                    productInfo={item}
                    key={item.id}
                    viewMode={isMobile ? 'mobile' : 'desktop'}
                    onRecover={handleRecoverToCart}
                    onRemove={removeFromRemovedList}
                  />
                );
              },
            )}
            {removedItems.length > 3 && (
              <div
                className={styles.ShowMore}
                onClick={() => setShowAllRemoved((prev) => !prev)}
              >
                <Text level="s12h16w400" colorMode="orange">
                  {showAllRemoved ? 'Свернуть' : 'Показать все'}
                </Text>
              </div>
            )}
          </div>
        )}
        {isMobile && !checkoutBlockInViewport && cartItemsCount > 0 && (
          <CartMobileStickyBar
            summary={itemsSumPriceWithoutDiscount}
            onClickCreateOrder={handleScrollToCheckoutBlock}
          />
        )}
      </div>
    </Layout>
  );
};

export default CartContainer;
