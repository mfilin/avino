import React from 'react';
import clsx from 'clsx';
import Text from '../Text';
import { useDeviceInfo } from '../../../hooks/device';

import styles from './Title.module.scss';

interface IOwnProps {
  as?: 'h1' | 'h2';
  withOrangeLine?: boolean;
  className?: string;
  colorMode?: 'grey' | 'white' | 'orange' | 'red' | 'green';
}
const Title: React.FC<React.PropsWithChildren<IOwnProps>> = ({
  as = 'h1',
  withOrangeLine,
  children,
  className,
  colorMode,
}) => {
  // TODO: REMOVE THIS FROM DUMMY COMPONENT!!
  const { isMobile } = useDeviceInfo();
  let level: 's36hnw800' | 's32hnw800' | 's24h24w700' | 's24h32w700';
  level = as === 'h1' ? 's36hnw800' : 's32hnw800';
  if (isMobile) {
    level = as === 'h1' ? 's24h32w700' : 's24h24w700';
  }
  return (
    <Text
      as={as}
      className={clsx(styles.Title, className, {
        [styles.WithOrangeLine]: withOrangeLine,
        [styles.MobileView]: isMobile,
      })}
      colorMode={colorMode}
      level={level}
    >
      {children}
    </Text>
  );
};
export default Title;
