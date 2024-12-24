import React from 'react';
import styles from './RemovedProductCard.module.scss';
import clsx from 'clsx';
import { getProductImages } from 'src/front/utils/getProductImages';
import { IProduct } from 'src/front/api/types/product';
import { TViewMode } from 'src/front/types/view';
import { IDefaultCardProps } from 'src/front/types/cards';
import Text from 'src/front/components/Typography/Text';
import CardExtraButtons from 'src/front/components/CardExtraButtons';

interface IRemovedProductCardProps {
  viewMode?: TViewMode;
  onRemove: (id: number) => void;
  onRecover: (product: IProduct) => void;
}

const RemovedProductCard: React.FC<
  IDefaultCardProps & IRemovedProductCardProps
> = ({
  viewMode = 'desktop',
  productInfo,
  productInfo: { id, name, sku2, properties, taxons, media, in_favorite },
  onAddToFavorite,
  onRemove,
  onRecover,
}) => {
  const isDesktop = viewMode === 'desktop';

  const description = `${taxons?.country?.value || ''}, ${
    properties?.pval?.[0].value || ''
  } л, ${properties?.strength?.[0].value || ''}`;

  const handleAddToFavorite = React.useCallback(() => {
    onAddToFavorite?.(productInfo);
  }, [id]);

  const handleRemove = React.useCallback(() => {
    onRemove(id);
  }, [id]);

  const handleRecover = React.useCallback(() => {
    onRecover(productInfo);
  }, [productInfo]);

  return (
    <div className={clsx(styles.ProductCard, { [styles.Mobile]: !isDesktop })}>
      <div className={styles.Group}>
        <div className={styles.ImageBlock}>
          <img src={getProductImages(media)[0]} />
        </div>
        <div className={styles.InfoBlock}>
          <Text className={styles.Vendor} level="s12h16w400" colorMode={'grey'}>
            Артикул: {sku2}
          </Text>
          <Text
            className={styles.Name}
            level={isDesktop ? 's13h16w400' : 's14h16w700'}
          >
            {name}
          </Text>
          <Text level="s12h16w400" colorMode={'grey'}>
            {description}
          </Text>
        </div>
      </div>
      <div className={styles.ExtraButtons}>
        <CardExtraButtons
          removedFromCartMode
          isChangeBackgOnHover
          viewMode={isDesktop ? 'desktop' : 'mobile'}
          isInFavorite={in_favorite}
          onRemoveFromCart={handleRemove}
          onAddToFavorite={handleAddToFavorite}
          onRecoverToCart={handleRecover}
        />
      </div>
    </div>
  );
};
export default RemovedProductCard;
