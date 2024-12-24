import React from 'react';
import styles from './ComparisonExtendedCard.module.scss';
// import ProductAmount from '../../ProductAmount';
import CardSocialRating from '../../CardSocialRating';
import Text from '../../Typography/Text';
import Button from '../../Button';
import AddToCartCounter from '../../AddToCartCounter';
import CardVivinoRating from '../../CardVivinoRating';
import CardExtraButtons from '../../CardExtraButtons';
import { formatPriceString } from '../../../utils/price';
import { IDefaultCardProps } from '../../../types/cards';
import { IProduct } from 'src/front/api/types/product';
import { getProductImages } from 'src/front/utils/getProductImages';
import Link from 'next/link';
import ShallowLink from 'src/front/elements/ShallowLink';
import { ImageSafe } from '../../index';

interface IOwnProps {
  productInfo: IProduct;
  fieldsForComparison: Record<string, string>;
}

const ComparisonExtendedCard: React.FC<IDefaultCardProps & IOwnProps> = ({
  productInfo,
  fieldsForComparison,
  onAddToCart,
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
    in_favorite,
    count_in_cart,
  } = productInfo || {};
  const handleAddToFavorite = React.useCallback(() => {
    onAddToFavorite?.(productInfo);
  }, [productInfo]);

  const handleRemoveFromComparison = React.useCallback(() => {
    onAddToComparison?.(productInfo);
  }, [productInfo]);

  const handleBuyNowWithOne = React.useCallback(
    (e?) => {
      e.stopPropagation();
      onAddToCart?.(productInfo, 1);
    },
    [productInfo],
  );
  const handleBuyNow = React.useCallback((e?) => {
    e.stopPropagation();
  }, []);
  const handleAddToCart = React.useCallback(
    (count: number) => {
      onAddToCart?.(productInfo, count);
    },
    [productInfo],
  );

  const isAvailable = !!productInfo.in_stock;
  const img = getProductImages(media)[0];

  return (
    <div className={styles.CardWrapper}>
      {/* <div className={styles.CardHeader}>
        
            <ProductAmount available={!!in_stock} mode="mobile" />
      </div> */}
      <div className={styles.FirstBlock}>
        <div className={styles.ImageBlock}>
          <div className={styles.RatingBlock}>
            <CardSocialRating grade={(productInfo as any).socialRating} />
            <CardVivinoRating rating={(productInfo as any).vivinoRating} />
          </div>
          <div className={styles.ExtraButtons}>
            <CardExtraButtons
              comparisonMode
              isChangeBackgOnHover
              isInFavorite={in_favorite}
              onAddToComparison={handleRemoveFromComparison}
              onAddToFavorite={handleAddToFavorite}
            />
          </div>
          <ImageSafe src={img} />
        </div>
        <Text className={styles.Name} level="s18h20w800">
          {productInfo.name}
        </Text>
      </div>
      <div className={styles.SecondBlock}>
        <div className={styles.ComparisonBlock}>
          <div className={styles.ComparisonFields}>
            {Object.keys(fieldsForComparison).map((field) => {
              const [object, key] = field.split('.');
              return (
                <Text level="s18h15w600" colorMode="grey" key={field}>
                  {(object === 'properties'
                    ? productInfo[object]?.[key]?.[0].value
                    : productInfo[object]?.[key].value) || '-'}
                </Text>
              );
            })}
          </div>
          <Text level="s18h20w800">{formatPriceString(productInfo.price)}</Text>
        </div>
        <div className={styles.Buttons}>
          {isAvailable ? (
            <>
              <AddToCartCounter
                count={count_in_cart || 0}
                onChange={handleAddToCart as any}
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
            <Button stretched onClick={() => true}>
              Сообщить о поступлении
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ComparisonExtendedCard;
