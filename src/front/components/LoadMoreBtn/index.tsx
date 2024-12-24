import React from 'react';
import styles from './LoadMoreBtn.module.scss';
import RefreshSvg from '../../images/refresh.svg';
import Text from '../Typography/Text';
interface IOwnProps {
  onClick(): void;
}

const LoadMoreBtn: React.FC<IOwnProps> = ({ onClick }) => {
  return (
    <div className={styles.LoadMoreBtn} onClick={onClick}>
      <div className={styles.Btn}>
        <RefreshSvg />
        <Text level="s15h15w500" colorMode="orange">
          Загрузить еще
        </Text>
      </div>
    </div>
  );
};

export default LoadMoreBtn;
