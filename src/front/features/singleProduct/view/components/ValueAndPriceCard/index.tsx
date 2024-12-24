import React from 'react';
import clsx from 'clsx';
import styles from './ValueAndPriceCard.module.scss';
import Text from '../../../../../components/Typography/Text';
import { formatPriceString } from '../../../../../utils/price';

interface IOwnProps {
  value: string;
  price: string;
  isCurrentAvailable?: boolean;
  active?: boolean;
  isMobile?: boolean;
  isAnotherAvailableInGroup: boolean;
}
const ValueAndPriceCard: React.FC<IOwnProps> = ({
  value,
  price,
  isCurrentAvailable,
  isAnotherAvailableInGroup,
  active,
  isMobile,
}) => {
  return (
    <button
      className={clsx(styles.Card, {
        [styles.Active]: active,
        [styles.CurrentNotAvailable]: !isCurrentAvailable,
        [styles.NoAnotherAvailableInGroup]: !isAnotherAvailableInGroup,
        [styles.Mobile]: isMobile,
      })}
      // disabled={!available}
    >
      <Text level="s12h16w800">{value}</Text>
      <Text level="s12h16w400">{price}</Text>
      <div className={styles.AvailabilityPoint} />
    </button>
  );
};
export default ValueAndPriceCard;
