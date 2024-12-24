import React from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

interface IOwnProps {
  color?:
    | 'orange-fill'
    | 'orange-outline'
    | 'orange-black-outline'
    | 'black-fill'
    | 'black-outline'
    | 'white-outline';
  mode?: 'primary' | 'outline';
  stretched?: boolean;
  className?: string;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  isMobile?: boolean;
  onClick?: () => void;
}
const Button: React.FC<IOwnProps & React.HTMLProps<HTMLButtonElement>> = ({
  onClick,
  children,
  stretched,
  color = 'black-outline',
  className,
  type = 'button',
  isMobile,
  ...restButtonProps
}) => {
  return (
    <button
      type={type}
      {...restButtonProps}
      className={clsx(styles.DefaultButton, styles[color], className, {
        [styles.Stretched]: stretched,
        [styles.MobileView]: isMobile,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
