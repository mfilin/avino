import React from 'react';

import styles from './FooterColumn.module.scss';

interface IRow {
  key: string;
  content: React.ReactElement;
}

interface IOwnProps {
  label: string;
  rows: Array<IRow>;
}

const FooterColumn: React.FC<IOwnProps> = (props) => {
  const { label, rows } = props;
  return (
    <div className={styles.FooterColumn}>
      <div className={styles.Label}>{label}</div>
      <div className={styles.Content}>
        {rows.map((row) => {
          return (
            <div className={styles.Row} key={row.key}>
              {row.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FooterColumn;
