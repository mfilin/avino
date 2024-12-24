import React from 'react';
import { TViewMode } from '../../../../../types/view';
import clsx from 'clsx';
import Link from 'next/link';
import { IProduct } from '../../../../../api/types/product';
import { getProductImages } from '../../../../../utils/getProductImages';
import { IDefaultCardProps } from '../../../../../types/cards';
import AddToCartCounter from '../../../../../components/AddToCartCounter/index';
import { formatPriceString } from '../../../../../utils/price';
import CardExtraButtons from '../../../../../components/CardExtraButtons/index';
import Text from '../../../../../components/Typography/Text/index';
import ShallowLink from 'src/front/elements/ShallowLink';
import { ImageSafe } from '../../../../../components';

import styles from './CartProductCard.module.scss';

interface ICartProductCardProps {
  viewMode?: TViewMode;
  productInfo: IProduct;
  onChangeUnderBottomLimit: (product: IProduct) => void;
}

const CartProductCard: React.FC<IDefaultCardProps & ICartProductCardProps> = ({
  productInfo,
  productInfo: {
    id,
    slug,
    name,
    in_stock,
    sku2,
    properties,
    taxons,
    price,
    count_in_cart,
    media,
    in_favorite,
  },
  viewMode = 'desktop',
  onAddToCart,
  onAddToFavorite,
  onChangeUnderBottomLimit,
}) => {
  const isDesktop = viewMode === 'desktop';
  const isUnavailable = !in_stock;
  const description = `${taxons?.country?.value || ''}, ${
    properties?.pval?.[0].value || ''
  } л, ${properties?.strength?.[0].value || ''}`;

  const handleAddToFavorite = React.useCallback(() => {
    onAddToFavorite?.(productInfo);
  }, [id]);

  const handleAddToCart = React.useCallback((count: number) => {
    onAddToCart?.(productInfo, count);
  }, []);
  const handleRemoveFromCart = React.useCallback(() => {
    onChangeUnderBottomLimit(productInfo);
  }, [id]);

  const handleChangeBottomLimit = React.useCallback(() => {
    onChangeUnderBottomLimit(productInfo);
  }, [id]);

  return (
    <ShallowLink href={`/${slug}`} scroll prefetch={false}>
      <div
        className={clsx(styles.ProductCard, { [styles.Mobile]: !isDesktop })}
      >
        <div
          className={clsx(styles.ImageBlock, {
            [styles.Unavailable]: isUnavailable,
          })}
        >
          {isUnavailable && <div className={styles.UnavailableOverlay} />}
          <ImageSafe src={getProductImages(media)[0]} />
        </div>
        <div className={styles.InfoBlock}>
          <Text className={styles.Vendor} level="s12h16w400" colorMode={'grey'}>
            Артикул: {sku2}
          </Text>
          <Text
            className={styles.Name}
            level={isDesktop ? 's18h20w800' : 's14h16w700'}
          >
            {name}
          </Text>
          <Text level="s12h16w400" colorMode={'grey'}>
            {description}
          </Text>
          <div className={styles.Buttons}>
            {!isUnavailable ? (
              <AddToCartCounter
                count={count_in_cart}
                onChange={handleAddToCart}
                bottomLimit={1}
                onChangeBottomLimitHandle={handleChangeBottomLimit}
              />
            ) : (
              <Text level="s12h16w800" colorMode="red">
                Нет в наличии, Товар будет исключен из заказа.
              </Text>
            )}
            <Text className={styles.Price} level="s20h18w800">
              {formatPriceString(price)}
            </Text>
          </div>
        </div>
        <div className={styles.ExtraButtons}>
          <CardExtraButtons
            cartMode
            isChangeBackgOnHover
            viewMode={isDesktop ? 'desktop' : 'mobile'}
            isInFavorite={in_favorite}
            onRemoveFromCart={handleRemoveFromCart}
            onAddToFavorite={handleAddToFavorite}
          />
        </div>
      </div>
    </ShallowLink>
  );
};
export default CartProductCard;
