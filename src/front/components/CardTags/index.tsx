import React from 'react';
import styles from './CardTags.module.scss';
import clsx from 'clsx';
import { TViewMode } from '../../types/view';

interface IOwnProps {
  isNew?: boolean;
  isHit?: boolean;
  discount?: number;
  tags?: string[];
  mode?: TViewMode;
}

const tagsTypes = {
  new: {
    style: 'New',
    text: {
      desktop: 'НОВИНКА',
      mobile: 'NEW',
    },
  },
  discount: {
    style: 'Sale',
  },
  buyersChoice: {
    style: 'BuyersChoice',
    text: {
      desktop: 'ВЫБОР ПОКУПАТЕЛЕЙ',
      mobile: 'BEST',
    },
  },
};

const tags = ['new', 'discount', 'buyersChoice'];

const CardTags: React.FC<IOwnProps> = ({
  isHit,
  isNew,
  discount,
  mode = 'desktop',
}) => {
  const isMobile = mode === 'mobile';

  if (!tags) {
    return null;
  }

  return (
    <div className={styles.Tags}>
      {isHit && (
        <div
          className={clsx(styles.Tag, styles[tagsTypes['buyersChoice'].style], {
            [styles.Mobile]: isMobile,
          })}
        >
          {tagsTypes['buyersChoice'].text[mode]}
        </div>
      )}
      {isNew && (
        <div
          className={clsx(styles.Tag, styles[tagsTypes['new'].style], {
            [styles.Mobile]: isMobile,
          })}
        >
          {tagsTypes['new'].text[mode]}
        </div>
      )}
      {discount && (
        <div
          className={clsx(styles.Tag, styles[tagsTypes['discount'].style], {
            [styles.Mobile]: isMobile,
          })}
        >
          {`-${discount}${isMobile ? '' : '%'}`}
        </div>
      )}
    </div>
  );
};
export default CardTags;
