import React from 'react';
import styles from './HorizontalCatalogCard.module.scss';
import ProductAmount from '../ProductAmount';
import CardTags from '../CardTags';
import CardSocialRating from '../CardSocialRating';
import Text from '../Typography/Text';
import Button from '../Button';
import AddToCartCounter from '../AddToCartCounter';
import CardVivinoRating from '../CardVivinoRating';
import CardExtraButtons from '../CardExtraButtons';
import { formatPriceString } from '../../utils/price';
import { IDefaultCardProps } from '../../types/cards';
import ShallowLink from '../../elements/ShallowLink';
import { getProductImages } from '../../utils/getProductImages';
import { UserDataContext } from 'src/front/providers/userDataStoreProvider';
import { getCheckedProductsByStorage } from 'src/front/utils/getCheckedProductsByStorage';
import { ImageSafe } from '../index';

const HorizontalCatalogCard: React.FC<IDefaultCardProps> = ({
  productInfo,
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
    <div className={styles.ProductCard}>
      <div className={styles.CardHeader}>
        <ProductAmount available={!!in_stock} />
        <CardTags isNew={!!is_new} isHit={!!is_hit} discount={discount} />
      </div>
      <ShallowLink href={`/${slug}`}>
        <div className={styles.ImageBlock}>
          <div className={styles.RatingBlock}>
            <CardSocialRating />
            <CardVivinoRating />
          </div>
          <ImageSafe src={getProductImages(media)[0]} />
        </div>
      </ShallowLink>
      <div className={styles.InfoBlock}>
        <ShallowLink href={`/${slug}`}>
          <>
            <Text className={styles.Price} level="s20h18w800">
              {formatPriceString(price)}
            </Text>
            <Text
              className={styles.Vendor}
              level="s12h16w400"
              colorMode={'grey'}
            >
              Артикул: {sku2}
            </Text>
            <Text className={styles.Name} level="s15h18w800">
              {name}
            </Text>
            <Text level="s12h16w400" colorMode={'grey'}>
              {description}
            </Text>
          </>
        </ShallowLink>
        <div className={styles.Buttons}>
          {!!in_stock ? (
            <>
              <AddToCartCounter
                count={count_in_cart}
                onChange={handleAddToCart}
              />
              <ShallowLink
                href="/cart"
                scroll
                onClick={count_in_cart > 0 ? handleBuyNow : handleBuyNowWithOne}
              >
                <Button>Купить сейчас</Button>
              </ShallowLink>
            </>
          ) : (
            <Button>Сообщить о поступлении</Button>
          )}
        </div>
      </div>
      <div className={styles.ExtraButtons}>
        <CardExtraButtons
          isInFavorite={in_favorite}
          isInComparison={in_comparison}
          onAddToComparison={handleAddToComparison}
          onAddToFavorite={handleAddToFavorite}
        />
      </div>
    </div>
  );
};
export default HorizontalCatalogCard;
