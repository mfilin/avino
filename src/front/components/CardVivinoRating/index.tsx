import React from 'react';
import styles from './CardVivinoRating.module.scss';
import clsx from 'clsx';
import { TViewMode } from '../../types/view';
import VivinoIcon from '../../images/vivino-rating.svg';

interface IOwnProps {
  mode?: TViewMode;
  rating?: string;
}
const CardVivinoRating: React.FC<IOwnProps> = ({
  mode = 'desktop',
  rating,
}) => {
  const isDesktop = mode === 'desktop';
  if (!rating) {
    return null;
  }
  if (isDesktop) {
    return <div className={styles.DesktopCard}>VIVINO {rating}</div>;
  }
  return (
    <div className={styles.MobileCard}>
      <VivinoIcon /> {rating}
    </div>
  );
};
export default CardVivinoRating;
