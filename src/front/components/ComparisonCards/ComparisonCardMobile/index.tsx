import React from 'react';
import styles from './ComparisonCardMobile.module.scss';
import ProductAmount from '../../ProductAmount';
import CardSocialRating from '../../CardSocialRating';
import Text from '../../Typography/Text';
import CardVivinoRating from '../../CardVivinoRating';
import CardExtraButtons from '../../CardExtraButtons';
import { formatPriceString } from '../../../utils/price';
import { IDefaultCardProps } from '../../../types/cards';
import AddToCartCounter from '../../AddToCartCounter';
import clsx from 'clsx';
import Link from 'next/link';
import { getProductImages } from '../../../utils/getProductImages';
import ShallowLink from '../../../elements/ShallowLink';
import { ImageSafe } from '../../index';

interface IOwnProps {
  productInfo: Record<string, string>;
  fieldsForComparison: string[];
  isExtended?: boolean;
}

const ComparisonCardMobile: React.FC<IDefaultCardProps & IOwnProps> = ({
  fieldsForComparison,
  productInfo,
  productInfo: { name, in_stock, price, media, count_in_cart, in_favorite },
  isExtended,
  onAddToCart,
  onAddToFavorite,
  onAddToComparison,
}) => {
  const handleAddToFavorite = React.useCallback(() => {
    onAddToFavorite?.(productInfo);
  }, [productInfo]);

  const handleRemoveFromComparison = React.useCallback(() => {
    onAddToComparison?.(productInfo);
  }, [productInfo]);

  const handleAddToCart = React.useCallback(
    (count: number) => {
      onAddToCart?.(productInfo, count);
    },
    [productInfo],
  );

  const img = getProductImages(media)[0];
  return (
    <div
      className={clsx(styles.ProductCardMobile, {
        [styles.Extended]: isExtended,
      })}
    >
      <ShallowLink href={`/product${productInfo.id}`} prefetch={false} scroll>
        <div className={styles.FirstBlock}>
          <div className={styles.CardHeader}>
            <div className={styles.Group}>
              <ProductAmount available={!!in_stock} mode="mobile" />
              <CardSocialRating />
            </div>
          </div>
          <div className={styles.ExtraButtons}>
            <CardExtraButtons
              comparisonMode
              viewMode="mobile"
              isInFavorite={in_favorite}
              onAddToFavorite={handleAddToFavorite}
              onAddToComparison={handleRemoveFromComparison}
            />
          </div>
          <div className={styles.RatingBlock}>
            <CardVivinoRating mode="mobile" />
          </div>
          <div className={styles.ImageBlock}>
            <ImageSafe src={img} />
          </div>
          <Text level="s14h16w600" className={styles.Name}>
            {name}
          </Text>
        </div>
      </ShallowLink>
      {isExtended && (
        <div className={styles.SecondBlock}>
          <div className={styles.ComparisonBlock}>
            <div className={styles.ComparisonFields}>
              {fieldsForComparison.map((field) => {
                return (
                  <Text level="s14h16w600" colorMode="grey" key={field}>
                    {productInfo[field] || '-'}
                  </Text>
                );
              })}
            </div>
            {price && (
              <Text level="s18h20w800">{formatPriceString(price)}</Text>
            )}
          </div>
          <div className={styles.Buttons}>
            <AddToCartCounter
              count={count_in_cart}
              onChange={handleAddToCart}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ComparisonCardMobile;
