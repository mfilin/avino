import React from 'react';
import clsx from 'clsx';
import { useDeviceInfo } from '../../hooks/device';

import styles from './Layout.module.scss';

const Layout: React.FC<React.PropsWithChildren> = (props) => {
  const { isMobile } = useDeviceInfo();
  return (
    <div
      className={clsx(styles.Layout, {
        [styles.MobileLayout]: isMobile,
      })}
    >
      <div className={styles.Content}>{props.children}</div>
    </div>
  );
};

export default Layout;
