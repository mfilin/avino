import React from 'react';

import styles from './FadeLayout.module.scss';

const FadeLayout: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <div className={styles.FadeLayout}>
      <div className={styles.Content}></div>
      {children}
    </div>
  );
};

export default FadeLayout;
