import React from 'react';
import clsx from 'clsx';
import { IPageProps } from '../../../../../../types/portal/server';
import { UserDataContext } from 'src/front/providers/userDataStoreProvider';
import Text from 'src/front/components/Typography/Text';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Input from 'src/front/components/Input';
import Button from 'src/front/components/Button';
import Checkbox from 'src/front/elements/Checkbox';
import { formatPriceString } from 'src/front/utils/price';
import CaretUp from '../../../../../images/caret-up-24px.svg';
import ProductInOrderCart from '../../components/ProductInOrderCart';
import SuccessCheckout from '../../components/SuccessCheckout';
import Api from '../../../../../api';
import { ICheckoutOrderForm } from '../../../../cart/namespace';
import Title from 'src/front/components/Typography/Title';
import { Layout } from 'src/front/components';
import { useDeviceInfo } from '../../../../../hooks/device';

import styles from './CheckoutContainer.module.scss';
import { ICartProduct } from '../../../../../api/types/cart';

interface IOwnProps {
  pageProps: IPageProps;
}

const CheckoutContainer: React.FC<IOwnProps> = (props) => {
  const { userData, clearCart } = React.useContext(UserDataContext);
  const [isEntity, setIsEntity] = React.useState(false);
  const [productsListIsOpen, setProductsListIsOpen] = React.useState(false);
  const { isMobile } = useDeviceInfo();

  const order = userData?.order;
  const orderItems = order?.products;
  const itemsSumPriceWithoutDiscount = React.useMemo(() => {
    return (
      orderItems?.reduce((acc, curr) => {
        return acc + curr.price * curr.count_in_cart;
      }, 0) || 0
    );
  }, [orderItems]);

  const summary =
    itemsSumPriceWithoutDiscount - order?.codeDiscount - order?.discount;

  const { mutate: sendCart } = useMutation({
    mutationFn: async (values: ICheckoutOrderForm) => {
      const cartItems: ICartProduct[] =
        orderItems?.map(
          (item) =>
            ({
              id: item.id,
              sku: item.sku,
              slug: item.slug,
              count: item.count_in_cart,
            } as ICartProduct),
        ) || [];
      await Api.instance.cart.sendCartFull({
        name: values.name,
        email: values.email,
        phone: values.phone,
        products: cartItems,
      });
    },
  });

  const [isSuccessCheckout, setIsSuccessCheckout] = React.useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
  });

  const handleSubmitForm = React.useCallback(
    (data: ICheckoutOrderForm) => {
      // TODO: Review needed!
      sendCart(data);
      clearCart();
      setIsSuccessCheckout(true);
    },
    [sendCart, clearCart, orderItems],
  );

  const handleToggleEntity = React.useCallback(() => {
    setIsEntity((prev) => !prev);
  }, []);

  if (!order) {
    return null;
  }

  if (isSuccessCheckout) {
    return <SuccessCheckout />;
  }

  return (
    <Layout>
      <div
        className={clsx(styles.CheckoutContainer, {
          [styles.MobileView]: isMobile,
        })}
      >
        <div className={styles.Title}>
          <Title withOrangeLine>Оформление заказа</Title>
        </div>
        <div className={styles.Content}>
          <div className={styles.LeftSide}>
            <Text
              level={isMobile ? 's16h17w700' : 's24h32w700'}
              className={styles.FormTitle}
            >
              Личные данные
            </Text>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <div className={styles.Inputs}>
                <Input
                  control={control}
                  name="name"
                  rules={{ required: true }}
                  placeholder="Имя"
                  withStar
                />
                <Input
                  control={control}
                  name="phone"
                  rules={{ required: true }}
                  placeholder="Телефон"
                  withStar
                />
                <Input
                  control={control}
                  name="email"
                  rules={{ required: true }}
                  placeholder="Электронная почта"
                  withStar
                />
              </div>
              <div className={styles.Row}>
                <Text level="s13h16w400" colorMode="red">
                  *
                </Text>
                <Text level="s13h16w400" colorMode="grey">
                  Обязательные поля для заполнения
                </Text>
              </div>
              <div
                className={clsx(styles.Row, styles.Entity)}
                onClick={handleToggleEntity}
              >
                <Checkbox checked={isEntity} />
                <Text level="s15h15w500">Юридическое лицо</Text>
              </div>
              {!isMobile && (
                <Button
                  disabled={!isValid}
                  type="submit"
                  color="orange-outline"
                  stretched
                >
                  Оформить заказ
                </Button>
              )}
            </form>
          </div>
          <div className={styles.RightSide}>
            <div className={styles.Top}>
              <div className={styles.Prices}>
                <div className={clsx(styles.Items, styles.RowGroup)}>
                  <div>
                    <Text level="s16h17w700">Товары</Text>
                    <Text level="s15h15w500" colorMode="grey">
                      {' '}
                      ({orderItems.length})
                    </Text>
                  </div>
                  <Text level="s16h17w700">
                    {formatPriceString(itemsSumPriceWithoutDiscount)}
                  </Text>
                </div>
                <div className={clsx(styles.Discount, styles.RowGroup)}>
                  <Text level="s16h17w700">Скидки на товары</Text>
                  {order.discount ? (
                    <Text level="s16h17w700" colorMode="red">
                      -{formatPriceString(order.discount)}
                    </Text>
                  ) : (
                    <Text level="s16h17w700">{order.discount}</Text>
                  )}
                </div>
                <div className={clsx(styles.CodeDiscount, styles.RowGroup)}>
                  <Text level="s16h17w700">Скидка по промокоду</Text>
                  {order.codeDiscount ? (
                    <Text level="s16h17w700" colorMode="red">
                      -{formatPriceString(order.codeDiscount)}
                    </Text>
                  ) : (
                    <Text level="s16h17w700">{order.codeDiscount}</Text>
                  )}
                </div>
              </div>
              <div className={clsx(styles.Summary, styles.RowGroup)}>
                <Text level="s16h17w700">Итого</Text>
                <Text level="s24h32w700">{formatPriceString(summary)}</Text>
              </div>
            </div>
            <div
              className={styles.DropdownHeader}
              onClick={() => setProductsListIsOpen((prev) => !prev)}
            >
              <Text level="s16h17w700" colorMode="orange">
                Товары в заказе
              </Text>
              <CaretUp
                className={clsx(styles.Indicator, {
                  [styles.Indicator_expanded]: productsListIsOpen,
                })}
              />
            </div>
            {productsListIsOpen && (
              <div className={styles.ProductsList}>
                {orderItems.map((item, index, array) => {
                  return (
                    <div key={item.id}>
                      <ProductInOrderCart product={item} />
                      {index !== array.length - 1 && (
                        <div className={styles.Border} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {isMobile && (
            <Button
              disabled={!isValid}
              type="submit"
              color="orange-outline"
              stretched
              onClick={handleSubmit(handleSubmitForm)}
            >
              Оформить заказ
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutContainer;
