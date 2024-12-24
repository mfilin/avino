import React from 'react';
import styles from './AddToCartCounter.module.scss';
import clsx from 'clsx';
import { preventPropagation } from 'src/front/utils/clickEvent';
interface IOwnProps {
  count?: number;
  whiteMode?: boolean;
  bottomLimit?: number;
  bigMode?: boolean;
  stretchedMode?: boolean;
  onChange: (count: number) => void;
  onChangeBottomLimitHandle?: () => void;
}
const AddToCartCounter: React.FC<IOwnProps> = ({
  count,
  whiteMode,
  bottomLimit,
  bigMode,
  stretchedMode,
  onChange,
  onChangeBottomLimitHandle,
}) => {
  const initialCount = count && count > 0 ? count : bottomLimit || 0;
  const [currentCount, setCurrentCount] = React.useState<number>(initialCount);

  const handleChangeCount = React.useCallback(
    (action = 1) => {
      const newCount = currentCount + action;
      if (!(bottomLimit && newCount < bottomLimit)) {
        setCurrentCount(newCount);
        onChange(newCount);
      } else if (newCount < bottomLimit) {
        onChangeBottomLimitHandle?.();
      }
    },
    [currentCount],
  );
  const handleIncrease = React.useCallback(
    (e) => {
      preventPropagation(e);
      handleChangeCount(1);
    },
    [currentCount],
  );
  const handleDecrease = React.useCallback(
    (e) => {
      preventPropagation(e);
      handleChangeCount(-1);
    },
    [currentCount],
  );

  if (currentCount > 0) {
    return (
      <div
        className={clsx(styles.Counter, {
          [styles.WhiteMode]: whiteMode,
          [styles.BigMode]: bigMode,
          [styles.StretchedMode]: stretchedMode,
        })}
      >
        <button className={styles.CalcBtn} onClick={handleDecrease}>
          -
        </button>
        <div>{currentCount}</div>
        <button className={styles.CalcBtn} onClick={handleIncrease}>
          +
        </button>
      </div>
    );
  }
  return (
    <div
      className={clsx(styles.Counter, {
        [styles.StretchedMode]: stretchedMode,
      })}
    >
      <button
        className={clsx('AddToCartBtn', styles.AddToCartBtn)}
        onClick={handleIncrease}
      >
        В корзину
      </button>
    </div>
  );
};
export default AddToCartCounter;
