import React from 'react';
import styles from './Tooltip.module.scss';
import clsx from 'clsx';
interface IOwnProps {
  children: React.ReactNode;
  text?: string;
  content?: React.ReactNode;
}
const Tooltip: React.FC<IOwnProps> = ({ children, text, content }) => {
  return (
    <div className={styles.TooltipWrapper}>
      <div
        className={clsx({
          [styles.ContentTooltip]: !!content,
          [styles.Tooltip]: !!text,
        })}
      >
        {content || text}
      </div>
      {children}
    </div>
  );
};
export default Tooltip;
