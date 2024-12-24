import React from 'react';

import styles from './CatalogNaviBar.module.scss';
import { Pagination } from '../../../../../components';

interface IOwnProps {
  total: number;
  pageSize: number;
  loaded: number;
  page: number;
  onChangePage(page: number): void;
}

const CatalogNaviBar: React.FC<IOwnProps> = (props) => {
  const { total, pageSize, page, loaded, onChangePage } = props;

  return (
    <div className={styles.CatalogNaviBar}>
      <div>
        {loaded} / {total}
      </div>
      {/*<div>Загрузить ещё</div>*/}
      <div className={styles.Pagination}>
        <Pagination
          total={total}
          pageSize={pageSize}
          currentPage={page}
          onChange={onChangePage}
        />
      </div>
    </div>
  );
};

export default CatalogNaviBar;
