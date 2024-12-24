import React from 'react';
import clsx from 'clsx';
import StarIcon from '../../images/star.svg';
import styles from './CardSocialRating.module.scss';

interface IOwnProps {
  size?: 'small' | 'big';
  grade?: string;
}

const CardSocialRating: React.FC<IOwnProps> = ({ size = 'big', grade }) => {
  if (!grade) {
    return null;
  }
  return (
    <div
      className={clsx(styles.Wrapper, { [styles.SmallCard]: size === 'small' })}
    >
      <div className={styles.Star}>
        <StarIcon />
      </div>
      {grade}
    </div>
  );
};

export default CardSocialRating;
