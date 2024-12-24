import React from 'react';
import ProductAmount from '../ProductAmount';
import CardTags from '../CardTags';
import CardSocialRating from '../CardSocialRating';
import Text from '../Typography/Text';
import Button from '../Button';
import AddToCartCounter from '../AddToCartCounter';
import CardVivinoRating from '../CardVivinoRating';
import CardExtraButtons from '../CardExtraButtons';
import clsx from 'clsx';
import CardHoverOverlay from '../CardHoverOverlay';
import { formatPriceString } from '../../utils/price';
import { IDefaultCardProps } from '../../types/cards';
import Link from 'next/link';
import { getProductImages } from '../../utils/getProductImages';
import { UserDataContext } from 'src/front/providers/userDataStoreProvider';
import { getCheckedProductsByStorage } from 'src/front/utils/getCheckedProductsByStorage';
import ShallowLink from 'src/front/elements/ShallowLink';
import { ImageSafe } from '../index';

import styles from './DefaultProductCard.module.scss';

interface IOwnProps {
  noPaddingAndBorderMode?: boolean;
}

const DefaultProductCard: React.FC<IDefaultCardProps & IOwnProps> = ({
  productInfo,
  noButtonsMode,
  noPaddingAndBorderMode,
  onAddToComparison,
  onAddToFavorite,
}) => {
  const {
    id,
    slug,
    name,
    media,
    price,
    is_hit,
    is_new,
    in_stock,
    sku2,
    taxons,
    properties,
    discount,
  } = productInfo || {};
  const { userData, updateCartWithProduct } = React.useContext(UserDataContext);
  const { in_comparison, in_favorite, count_in_cart } =
    getCheckedProductsByStorage([productInfo], userData)[0];

  const description = `${taxons?.country?.value || ''}, ${
    properties?.pval?.[0].value || ''
  } л, ${properties?.strength?.[0].value || ''}`;

  const handleAddToFavorite = React.useCallback(() => {
    onAddToFavorite?.(productInfo);
  }, [id]);
  const handleAddToComparison = React.useCallback(() => {
    onAddToComparison?.(productInfo);
  }, [productInfo]);

  const handleBuyNowWithOne = React.useCallback(
    (e?) => {
      e.stopPropagation();
      updateCartWithProduct?.(productInfo, 1);
    },
    [productInfo],
  );
  const handleBuyNow = React.useCallback((e?) => {
    e.stopPropagation();
  }, []);
  const handleAddToCart = React.useCallback(
    (count: number) => {
      updateCartWithProduct?.(productInfo, count);
    },
    [id],
  );

  return (
    <div
      className={clsx(styles.ProductCard, {
        [styles.NoPaddingAndBorders]: noPaddingAndBorderMode,
      })}
    >
      {noButtonsMode && (
        <div className={styles.Overlay}>
          <CardHoverOverlay
            productInfo={productInfo}
            onBuyNow={count_in_cart > 0 ? handleBuyNow : handleBuyNowWithOne}
            onAddToCart={handleAddToCart}
            mode="SmallCard"
            onAddToComparison={handleAddToComparison}
            onAddToFavorite={handleAddToFavorite}
          />
        </div>
      )}
      <ShallowLink href={`/${slug}`} prefetch={false} scroll>
        <div className={styles.CardHeader}>
          <ProductAmount available={!!in_stock} />
          <CardTags isNew={!!is_new} isHit={!!is_hit} discount={discount} />
        </div>
        <div
          className={clsx(styles.ImageBlock, {
            [styles.SmallVariant]: noButtonsMode,
          })}
        >
          <div className={styles.RatingBlock}>
            <CardSocialRating />
            <CardVivinoRating />
          </div>
          {!noButtonsMode && (
            <div className={styles.ExtraButtons}>
              <CardExtraButtons
                isInFavorite={in_favorite}
                isInComparison={in_comparison}
                onAddToComparison={handleAddToComparison}
                onAddToFavorite={handleAddToFavorite}
              />
            </div>
          )}
          <ImageSafe src={getProductImages(media)[0]} />
        </div>
        <div className={styles.InfoBlock}>
          <Text className={styles.Price} level="s20h18w800">
            {formatPriceString(price)}
          </Text>
          <Text className={styles.Vendor} level="s12h16w400" colorMode={'grey'}>
            Артикул: {sku2}
          </Text>
          <Text className={styles.Name} level="s15h18w800">
            {name}
          </Text>
          <Text level="s12h16w400" colorMode={'grey'}>
            {description}
          </Text>
        </div>
      </ShallowLink>
      {!noButtonsMode && (
        <div className={styles.Buttons}>
          {!!in_stock ? (
            <>
              <AddToCartCounter
                count={count_in_cart}
                onChange={handleAddToCart}
              />
              <ShallowLink
                href="/cart"
                prefetch={false}
                scroll
                onClick={count_in_cart > 0 ? handleBuyNow : handleBuyNowWithOne}
              >
                <Button>Купить сейчас</Button>
              </ShallowLink>
            </>
          ) : (
            <Button stretched onClick={() => true}>
              Сообщить о поступлении
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
export default DefaultProductCard;
