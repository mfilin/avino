import clsx from 'clsx';
import React from 'react';
import styles from './Text.module.scss';
interface IOwnProps {
  level?:
    | 's11h16w400'
    | 's12h11w500'
    | 's12h16w400'
    | 's12h16w800'
    | 's13h15w500'
    | 's13h16w400'
    | 's13h16w600'
    | 's13h18w500'
    | 's13h18w700'
    | 's14h15w400'
    | 's14h16w600'
    | 's14h17w400'
    | 's14h16w700'
    | 's14h18w800'
    | 's14h20w400'
    | 's15h15w500'
    | 's15h15w700'
    | 's15h20w500'
    | 's15h18w800'
    | 's15h20w400'
    | 's15h20w700'
    | 's16h17w700'
    | 's16h17w500'
    | 's17h15w700'
    | 's17h20w700'
    | 's18h24w400'
    | 's18h20w600'
    | 's18h20w800'
    | 's18h15w600'
    | 's18h22w400'
    | 's20h18w800'
    | 's24h32w700'
    | 's24h24w700'
    | 's32hnw800'
    | 's36hnw400'
    | 's36hnw800'
    | 's36h16w800';
  colorMode?: 'grey' | 'white' | 'orange' | 'red' | 'green';
  as?: 'h1' | 'h2' | 'span' | 'p';
  widthDecoration?: boolean;
  className?: string;
  color?: string;
  onClick?: () => void;
}
const Text: React.FC<React.PropsWithChildren<IOwnProps>> = ({
  level = 's15h18w800',
  colorMode,
  className,
  children,
  color,
  as: Tag = 'span',
  widthDecoration,
  onClick,
}) => {
  return (
    <Tag
      className={clsx(styles.DefaultText, styles[level], className, {
        [styles[colorMode as string]]: colorMode,
        [styles.WithDecoration]: widthDecoration,
      })}
      style={{ color: color }}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
};
export default Text;
