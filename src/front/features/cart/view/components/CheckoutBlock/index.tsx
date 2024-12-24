import React from 'react';
import clsx from 'clsx';
import Text from '../../../../../components/Typography/Text';
import { formatPriceString } from '../../../../../utils/price';
import Button from '../../../../../components/Button';
import { useForm } from 'react-hook-form';
import Input from 'src/front/components/Input';
import ArrowRightIcon from '../../../../../images/arrow-right-input.svg';
import BoxOfBottlesIcon from '../../../../../images/box-of-bottles.svg';
import { ICartOrderForm } from '../../../namespace';
import ShallowLink from 'src/front/elements/ShallowLink';
import { useDeviceInfo } from '../../../../../hooks/device';

import styles from './CheckoutBlock.module.scss';

interface IOwnProps {
  sum: number;
  itemsCount: number;
  discount?: number;
  minimumPrice?: number;
  onCheckPromoCode: (value: string) => { error?: string; discount?: number };
  onSubmitFastOrder?: (form: ICartOrderForm) => void;
  onMoveToCheckout: (discount: number, codeDiscount: number) => void;
}
const CheckoutBlock: React.FC<IOwnProps> = ({
  sum,
  itemsCount,
  discount,
  minimumPrice = 5000,
  onCheckPromoCode,
  onSubmitFastOrder,
  onMoveToCheckout,
}) => {
  const { isMobile } = useDeviceInfo();
  const [currentView, setCurrentView] = React.useState<boolean>(true);
  const [codeDiscount, setResultDiscount] = React.useState<number>(0);
  const handleToggleView = React.useCallback(() => {
    setCurrentView((prev) => !prev);
  }, []);

  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
  });

  const {
    control: fastOrderControl,
    handleSubmit: handleSubmitOrder,
    formState: { isValid: isValidOrderForm },
  } = useForm({
    mode: 'onChange',
  });

  const handleSubmitCodeForm = React.useCallback((data) => {
    const result = onCheckPromoCode(data.code);
    console.log('result', result);
    if (result.error) {
      setError('code', {
        type: 'manual',
        message: result.error,
      });
    } else if (result.discount) {
      setResultDiscount(result.discount);
    }
  }, []);

  const handleSubmitFastOrderForm = React.useCallback((data) => {
    onSubmitFastOrder?.({ name: data.name, phone: data.phone });
  }, []);

  const summary = sum - codeDiscount - discount;
  const isLessMinPrice = minimumPrice > sum;
  const priceMinPriceDiff = minimumPrice - sum;

  const handleMoveToCheckout = React.useCallback(() => {
    onMoveToCheckout(discount, codeDiscount);
  }, [discount, codeDiscount]);

  return (
    <div
      className={clsx(styles.Wrapper, { [styles.MobileView]: isMobile })}
      id="checkoutBlock"
    >
      <div className={styles.Header}>
        <div
          onClick={handleToggleView}
          className={clsx(styles.First, { [styles.Active]: currentView })}
        >
          {currentView ? (
            <Text level="s18h20w800">Оформление заказа</Text>
          ) : (
            <Text level="s15h15w500" colorMode="orange" widthDecoration>
              Оформление заказа
            </Text>
          )}
        </div>
        <div
          onClick={handleToggleView}
          className={clsx(styles.Second, { [styles.Active]: !currentView })}
        >
          {!currentView ? (
            <Text level="s18h20w800">Быстрый заказ</Text>
          ) : (
            <Text level="s15h15w500" colorMode="orange" widthDecoration>
              Быстрый заказ
            </Text>
          )}
        </div>
      </div>
      <div className={styles.Content}>
        {currentView ? (
          <div className={styles.FirstView}>
            <div className={clsx(styles.Items, styles.RowGroup)}>
              <div>
                <Text level="s16h17w700">Товары</Text>
                <Text level="s15h15w500" colorMode="grey">
                  ({itemsCount})
                </Text>
              </div>
              <Text level="s16h17w700">{formatPriceString(sum)}</Text>
            </div>
            <div className={clsx(styles.Discount, styles.RowGroup)}>
              <Text level="s16h17w700">Скидки на товары</Text>
              {discount ? (
                <Text level="s16h17w700" colorMode="red">
                  -{formatPriceString(discount)}
                </Text>
              ) : (
                <Text level="s16h17w700">{discount}</Text>
              )}
            </div>
            <div className={clsx(styles.CodeDiscount, styles.RowGroup)}>
              <Text level="s16h17w700">Скидка по промокоду</Text>
              {codeDiscount ? (
                <Text level="s16h17w700" colorMode="red">
                  -{formatPriceString(codeDiscount)}
                </Text>
              ) : (
                <Text level="s16h17w700">{codeDiscount}</Text>
              )}
            </div>
            <form onSubmit={handleSubmit(handleSubmitCodeForm)}>
              <Input
                control={control}
                name="code"
                rules={{ required: true }}
                placeholder="Промокод на скидку"
                isValueUpperCase
              />
              <button disabled={!isValid} type="submit">
                <ArrowRightIcon />
              </button>
            </form>
            <div className={clsx(styles.Summary, styles.RowGroup)}>
              <Text level="s16h17w700">Итого</Text>
              <Text level="s24h32w700">{formatPriceString(summary)}</Text>
            </div>
            {summary < minimumPrice && (
              <div className={styles.MinimumOrderPrice}>
                <BoxOfBottlesIcon />
                <div>
                  <Text level="s15h18w800">
                    До минимальной суммы заказа осталось
                  </Text>
                  <ShallowLink href="/cognac-all" scroll prefetch={true}>
                    <Text level="s12h16w400" colorMode="orange">
                      Продолжить покупки
                    </Text>
                  </ShallowLink>
                </div>
                <Text level="s18h15w600">
                  {formatPriceString(priceMinPriceDiff)}
                </Text>
              </div>
            )}
            <ShallowLink
              href="/checkout"
              onClick={handleMoveToCheckout}
              scroll
              prefetch={true}
            >
              <Button color="orange-fill" stretched disabled={isLessMinPrice}>
                Перейти к оформлению
              </Button>
            </ShallowLink>
            {/* <div className={styles.ShareListTip}>
            <Text level="s13h16w400" colorMode="orange">
              Поделиться списком товаров
            </Text>
          </div> */}
          </div>
        ) : (
          <div className={styles.SecondView}>
            <div className={styles.TextGroup}>
              <Text level="s15h20w400">
                Наш менеджер перезвонит Вам в рабочее время:
              </Text>
              <Text level="s15h20w700">
                Пн-пт с 09:00 до 21:00. Сб-вс выходной
              </Text>
            </div>
            <form onSubmit={handleSubmitOrder(handleSubmitFastOrderForm)}>
              <div className={styles.Inputs}>
                <Input
                  control={fastOrderControl}
                  name="name"
                  rules={{ required: true }}
                  placeholder="Ваше имя"
                />
                <Input
                  control={fastOrderControl}
                  name="phone"
                  rules={{ required: true }}
                  placeholder="Ваш телефон"
                />
              </div>
              <Button
                disabled={!isValidOrderForm}
                type="submit"
                color="black-fill"
                stretched
              >
                Оформить заказ
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
export default CheckoutBlock;
