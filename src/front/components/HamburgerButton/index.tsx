import React from 'react';
import { Burger } from '../../elements';

import styles from './HamburgerButton.module.scss';
import clsx from 'clsx';


interface IOwnProps {
  caption: string;
  isOpen: boolean;
  onClick(): void;
}

const HamburgerButton: React.FC<IOwnProps> = (props) => {
  const { caption, isOpen, onClick } = props;

  return (
    <div className={clsx(styles.HamburgerButton, 'noselect')} onClick={onClick}>
      <Burger toggled={isOpen} size={16} width={16} />
      <div className={clsx(styles.caption, 'noselect')}>{caption}</div>
    </div>
  );
};

export default HamburgerButton;
