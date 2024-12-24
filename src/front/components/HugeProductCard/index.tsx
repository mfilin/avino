import React from 'react';
import styles from './HugeProductCard.module.scss';
import ProductAmount from '../ProductAmount';
import CardTags from '../CardTags';
import CardSocialRating from '../CardSocialRating';
import Text from '../Typography/Text';
import CardVivinoRating from '../CardVivinoRating';
import CardHoverOverlay from '../CardHoverOverlay';
import { formatPriceString } from '../../utils/price';
import { IDefaultCardProps } from '../../types/cards';
import { getProductImages } from '../../utils/getProductImages';
import { UserDataContext } from 'src/front/providers/userDataStoreProvider';
import { getCheckedProductsByStorage } from 'src/front/utils/getCheckedProductsByStorage';
import { ImageSafe } from '../index';

const HugeProductCard: React.FC<IDefaultCardProps> = ({
  productInfo,
  onAddToComparison,
  onAddToFavorite,
}) => {
  const {
    id,
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
  const checkedProduct = getCheckedProductsByStorage(
    [productInfo],
    userData,
  )[0];
  const { count_in_cart } = checkedProduct;
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
    <div className={styles.ProductCard}>
      <div className={styles.Overlay}>
        <CardHoverOverlay
          productInfo={checkedProduct}
          onBuyNow={
            count_in_cart && count_in_cart > 0
              ? handleBuyNow
              : handleBuyNowWithOne
          }
          onAddToCart={handleAddToCart}
          mode="SmallCard"
          onAddToComparison={handleAddToComparison}
          onAddToFavorite={handleAddToFavorite}
        />
      </div>
      <div className={styles.CardHeader}>
        <ProductAmount available={!!in_stock} />
        <CardTags isNew={!!is_new} isHit={!!is_hit} discount={discount} />
      </div>
      <div className={styles.ImageBlock}>
        <div className={styles.RatingBlock}>
          <CardSocialRating />
          <CardVivinoRating />
        </div>
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
    </div>
  );
};
export default HugeProductCard;
