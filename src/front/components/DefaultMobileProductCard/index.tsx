import React from 'react';
import styles from './DefaultMobileProductCard.module.scss';
import ProductAmount from '../ProductAmount';
import CardTags from '../CardTags';
import CardSocialRating from '../CardSocialRating';
import Text from '../Typography/Text';
import CardVivinoRating from '../CardVivinoRating';
import CardExtraButtons from '../CardExtraButtons';
import { formatPriceString } from '../../utils/price';
import { IDefaultCardProps } from '../../types/cards';
import CartIcon from '../../images/cart-orange.svg';
import { getProductImages } from '../../utils/getProductImages';
import ShallowLink from '../../elements/ShallowLink';
import clsx from 'clsx';
import AddToCartCounter from '../AddToCartCounter';
import { UserDataContext } from 'src/front/providers/userDataStoreProvider';
import { getCheckedProductsByStorage } from 'src/front/utils/getCheckedProductsByStorage';
import { ImageSafe } from '../index';

interface IOwnProps {
  stretchedMode?: boolean;
}
const DefaultMobileProductCard: React.FC<IDefaultCardProps & IOwnProps> = ({
  productInfo,
  stretchedMode,
  onAddToCart,
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

  const handleAddToCart = React.useCallback(
    (count: number) => {
      updateCartWithProduct?.(productInfo, count);
    },
    [id],
  );

  return (
    <div
      className={clsx(styles.ProductCardMobile, {
        [styles.StretchedMode]: stretchedMode,
      })}
    >
      <ShallowLink href={`/${slug}`}>
        <>
          <div className={styles.ImageBlock}>
            <div className={styles.CardHeader}>
              <div className={styles.Group}>
                <ProductAmount available={!!in_stock} mode="mobile" />
                <CardSocialRating />
              </div>
              <CardTags
                isNew={!!is_new}
                isHit={!!is_hit}
                discount={discount}
                mode="mobile"
              />
            </div>
            <div className={styles.RatingBlock}>
              <CardVivinoRating mode="mobile" />
            </div>

            <div className={styles.ExtraButtons}>
              <CardExtraButtons
                isInFavorite={in_favorite}
                isInComparison={in_comparison}
                viewMode="mobile"
                onAddToComparison={handleAddToComparison}
                onAddToFavorite={handleAddToFavorite}
              />
            </div>
            <ImageSafe src={getProductImages(media)[0]} />
          </div>
          <div className={styles.InfoBlock}>
            <Text level="s12h16w400" colorMode={'grey'}>
              Артикул: {sku2}
            </Text>
            <Text level="s14h16w700" className={styles.Name}>
              {name}
            </Text>
            <Text
              level="s12h16w400"
              colorMode={'grey'}
              className={styles.Description}
            >
              {description}
            </Text>
          </div>
        </>
      </ShallowLink>
      <div className={styles.Buttons}>
        <Text className={styles.Price} level="s18h15w600">
          {formatPriceString(price)}
        </Text>
        <AddToCartCounter
          count={count_in_cart}
          onChange={handleAddToCart}
          stretchedMode
        />
      </div>
    </div>
  );
};
export default DefaultMobileProductCard;
