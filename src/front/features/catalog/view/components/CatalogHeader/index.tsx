import React from 'react';
import { TClientCatalogItem } from '../../../../../../types/portal/client';

import styles from './CatalogHeader.module.scss';
import { NBSP } from '../../../../../../const';

interface IOwnProps {
  label: React.ReactNode;
  total?: number;
}

const CatalogHeader: React.FC<IOwnProps> = (props) => {
  const { label, total } = props;

  return (
    <div className={styles.CatalogHeader}>
      <h1>{label ? label : NBSP}</h1>
      <div className={styles.Total}>Найдено {total} записей</div>
    </div>
  );
};

export default CatalogHeader;
