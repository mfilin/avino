import React from 'react';
import clsx from 'clsx';
import { Button as NextUIButton } from '@nextui-org/react';

import styles from './Button.module.scss';

interface IOwnProps {
  color?: 'orange-fill' | 'orange-outline';
  caption?: string;
  endContent?: React.ReactElement;
  onClick?(): void;
}

const Button: React.FC<React.PropsWithChildren<IOwnProps>> = (props) => {
  const {
    caption,
    children,
    onClick,
    endContent,
    color = 'orange-fill',
  } = props;

  return (
    <NextUIButton
      className={clsx(styles.Button, { [`color_${color}`]: Boolean(color) })}
      onClick={onClick}
      endContent={endContent}
    >
      {children ? children : caption}
    </NextUIButton>
  );
};

export default Button;
