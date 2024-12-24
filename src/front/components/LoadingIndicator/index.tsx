import React from 'react';
import { Spinner } from '@nextui-org/react';
import styles from './LoadingIndicator.module.scss';
const LoadingIndicator: React.FC = () => {
  return (
    <div className={styles.LoadingIndicator}>
      <Spinner />
    </div>
  );
};

export default LoadingIndicator;
