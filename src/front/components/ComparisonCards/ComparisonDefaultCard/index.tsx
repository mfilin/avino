import React from 'react';
import Text from '../../Typography/Text';
import { formatPriceString } from '../../../utils/price';
import CardExtraButtons from '../../CardExtraButtons';
import { ImageSafe } from '../../index';

import styles from './ComparisonDefaultCard.module.scss';

interface IOwnProps {
  id: string;
  name: string;
  price: number;
  img: string;
  onAddToFavorite: (id: string) => void;
  onRemoveFromComparison: (id: string) => void;
}

const ComparisonDefaultCard: React.FC<IOwnProps> = ({
  img,
  id,
  name,
  price,
  onAddToFavorite,
  onRemoveFromComparison,
}) => {
  const handleAddToFavorite = React.useCallback(() => {
    onAddToFavorite?.(id);
  }, [id]);
  const handleRemoveFromComparison = React.useCallback(() => {
    onRemoveFromComparison(id);
  }, [id]);

  return (
    <div className={styles.CardWrapper}>
      <div className={styles.ImageBlock}>
        <ImageSafe src={img} />
      </div>
      <div className={styles.InfoBlock}>
        <Text level="s14h16w600" className={styles.Name}>
          {name}
        </Text>
        <Text level="s18h20w800">{formatPriceString(price)}</Text>
      </div>
      <div className={styles.ExtraButtons}>
        <CardExtraButtons
          comparisonMode
          isChangeBackgOnHover
          onAddToFavorite={handleAddToFavorite}
          onAddToComparison={handleRemoveFromComparison}
        />
      </div>
    </div>
  );
};
export default ComparisonDefaultCard;
