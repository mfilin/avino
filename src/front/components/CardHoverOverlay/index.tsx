import React from 'react';
import styles from './CardHoverOverlay.module.scss';
import CardExtraButtons from '../CardExtraButtons';
import Text from '../Typography/Text';
import AddToCartCounter from '../AddToCartCounter';
import Button from '../Button';
import clsx from 'clsx';
import { formatPriceString } from '../../utils/price';
import Link from 'next/link';
import { IProduct } from 'src/front/api/types/product';
import ShallowLink from 'src/front/elements/ShallowLink';
interface IOwnProps {
  mode?: 'BigCard' | 'SmallCard';
  productInfo: IProduct;
  onAddToFavorite: () => void;
  onAddToComparison: () => void;
  onAddToCart: (count: number) => void;
  onBuyNow: () => void;
}
const CardHoverOverlay: React.FC<IOwnProps> = ({
  productInfo: { in_favorite, in_comparison, name, price, count_in_cart },
  mode = 'BigCard',
  onAddToCart,
  onAddToComparison,
  onAddToFavorite,
  onBuyNow,
}) => {
  return (
    <div className={styles.CardOverlayWrapper}>
      <div className={clsx(styles.ElementsBlock, styles['MarginsFor' + mode])}>
        <CardExtraButtons
          direction="horizontal"
          isInFavorite={in_favorite}
          isInComparison={in_comparison}
          onAddToFavorite={onAddToFavorite}
          onAddToComparison={onAddToComparison}
        />
        <Text className={styles.Name} level="s18h20w600" colorMode="white">
          {name}
        </Text>
        <Text className={styles.Price} level="s32hnw800" colorMode="orange">
          {formatPriceString(price)}
        </Text>
        <div className={styles.Buttons}>
          <AddToCartCounter
            onChange={onAddToCart}
            count={count_in_cart}
            whiteMode
          />
          <ShallowLink href="/cart" onClick={onBuyNow} scroll>
            <Button color="white-outline">Купить сейчас</Button>
          </ShallowLink>
        </div>
      </div>
    </div>
  );
};
export default CardHoverOverlay;
