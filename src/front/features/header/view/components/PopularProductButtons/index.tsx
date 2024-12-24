import React from 'react';
import clsx from 'clsx';

import ArrowRight from '../../../../../images/arrow-right.svg';

import styles from './PopularProductButtons.module.scss';

interface IOwnProps {
  onMouseEnter(): void;
  onMouseLeave(): void;
  onBack(): void;
  onNext(): void;
}

const PopularProductButtons: React.FC<IOwnProps> = (props) => {
  return (
    <div
      className={styles.PopularProductButtons}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <ArrowRight
        className={clsx(styles.Btn, styles.Btn_left)}
        onClick={props.onBack}
      />
      <ArrowRight className={clsx(styles.Btn)} onClick={props.onNext} />
    </div>
  );
};

export default PopularProductButtons;
