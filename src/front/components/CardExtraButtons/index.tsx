import React from 'react';
import styles from './CardExtraButtons.module.scss';
import clsx from 'clsx';
import ComparisonIcon from '../../images/comparison.svg';
import FavoriteIcon from '../../images/favorite.svg';
import TrashIcon from '../../images/trash.svg';
import ReturnIcon from '../../images/return.svg';
import ShareIcon from '../../images/share.svg';
import Tooltip from '../Tooltip';
import { TViewMode } from '../../types/view';
import memoize from 'fast-memoize';
import { preventPropagation } from 'src/front/utils/clickEvent';

interface IOwnProps {
  direction?: 'vertical' | 'horizontal';
  viewMode?: TViewMode;
  isInFavorite?: boolean;
  isInComparison?: boolean;
  cartMode?: boolean;
  removedFromCartMode?: boolean;
  comparisonMode?: boolean;
  singleProductMode?: boolean;
  isChangeBackgOnHover?: boolean;
  onAddToFavorite: () => void;
  onAddToComparison?: () => void;
  onRemoveFromCart?: () => void;
  onRecoverToCart?: () => void;
  onShare?: () => void;
}

const CardExtraButtons: React.FC<IOwnProps> = ({
  direction = 'vertical',
  viewMode = 'desktop',
  isInFavorite,
  isInComparison,
  cartMode,
  removedFromCartMode,
  comparisonMode,
  isChangeBackgOnHover,
  singleProductMode,
  onAddToFavorite,
  onAddToComparison,
  onRemoveFromCart,
  onRecoverToCart,
  onShare,
}) => {
  const handleCallBackWithoutPropagation = React.useCallback(
    (callback) => (event) => {
      preventPropagation(event);
      callback();
    },
    [],
  );
  return (
    <div
      className={clsx(styles.Buttons, {
        [styles.Horizontal]: direction === 'horizontal',
        [styles.HorizontalReversed]: removedFromCartMode,
      })}
    >
      {/* {singleProductMode && (
        <Tooltip text={'Поделиться'}>
          <div
            className={clsx(styles.Button, {
              [styles.Mobile]: viewMode === 'mobile',
              [styles.HoverBackGround]: isChangeBackgOnHover,
            })}
            onClick={handleCallBackWithoutPropagation(onShare)}
          >
            <ShareIcon fill={'#797979'} />
          </div>
        </Tooltip>
      )} */}
      {(cartMode || removedFromCartMode || comparisonMode) && (
        <Tooltip
          text={comparisonMode ? 'Удалить из сравнения' : 'Удалить из корзины'}
        >
          <div
            className={clsx(styles.Button, {
              [styles.Mobile]: viewMode === 'mobile',
              [styles.HoverBackGround]: isChangeBackgOnHover,
            })}
            onClick={
              comparisonMode
                ? handleCallBackWithoutPropagation(onAddToComparison)
                : handleCallBackWithoutPropagation(onRemoveFromCart)
            }
          >
            <TrashIcon fill={'#797979'} />
          </div>
        </Tooltip>
      )}
      {/* <Tooltip
        text={!isInFavorite ? 'Добавить в избранное' : 'Удалить из избранного'}
      >
        <div
          className={clsx(styles.Button, {
            [styles.Mobile]: viewMode === 'mobile',
            [styles.HoverBackGround]: isChangeBackgOnHover,
          })}
          onClick={handleCallBackWithoutPropagation(onAddToFavorite)}
        >
          <FavoriteIcon fill={isInFavorite ? '#FF5C21' : '#797979'} />
        </div>
      </Tooltip> */}
      {removedFromCartMode && (
        <Tooltip text={'Вернуть в корзину'}>
          <div
            className={clsx(styles.Button, {
              [styles.Mobile]: viewMode === 'mobile',
              [styles.HoverBackGround]: isChangeBackgOnHover,
            })}
            onClick={handleCallBackWithoutPropagation(onRecoverToCart)}
          >
            <ReturnIcon fill={'#797979'} />
          </div>
        </Tooltip>
      )}
      {/* {!cartMode && !removedFromCartMode && !comparisonMode && (
        <Tooltip
          text={
            !isInComparison ? 'Добавить к сравнению' : 'Удалить из сравнения'
          }
        >
          <div
            className={clsx(styles.Button, {
              [styles.Mobile]: viewMode === 'mobile',
              [styles.HoverBackGround]: isChangeBackgOnHover,
            })}
            onClick={handleCallBackWithoutPropagation(onAddToComparison)}
          >
            <ComparisonIcon fill={isInComparison ? '#FF5C21' : '#797979'} />
          </div>
        </Tooltip>
      )} */}
    </div>
  );
};
export default CardExtraButtons;
