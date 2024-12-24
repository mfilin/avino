import React from 'react';
import clsx from 'clsx';
// import { Pagination as NextUIPagination } from '@nextui-org/react';
import PaginationComponent from 'rc-pagination';
import ArrowRight from '../../images/arrow-right-16.svg';

import styles from './Pagination.module.scss';

interface IOwnProps {
  total: number;
  pageSize: number;
  currentPage: number;
  onChange(page: number): void;
}

const Pagination: React.FC<IOwnProps> = (props) => {
  const { total, pageSize, currentPage, onChange } = props;

  // const totalPages = Math.ceil(total / pageSize);

  // return (
  //   <NextUIPagination
  //     disableAnimation
  //     showControls
  //     total={totalPages}
  //     page={currentPage}
  //     // variant="faded"
  //     siblings={0}
  //     boundaries={10}
  //     // loop
  //     // isCompact
  //     size={'sm'}
  //     // initialPage={initialPage}
  //     onChange={onChange}
  //   />
  // );
  return (
    <PaginationComponent
      className={styles.Pagination}
      showLessItems={true}
      showSizeChanger={true}
      total={total}
      pageSize={pageSize}
      current={currentPage}
      // locale={'ru_RU'}
      itemRender={(
        index: number,
        type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
        element: React.ReactNode,
      ) => {
        switch (type) {
          case 'prev':
            return (
              <ArrowRight
                className={clsx(styles.ArrowIcon, styles.ArrowIcon_left)}
              />
            );
          case 'next':
            return <ArrowRight className={styles.ArrowIcon} />;
          case 'jump-next':
            return <div className={styles.AnotherSegmentBtn}>...</div>;
        }
        return element;
      }}
      onChange={onChange}
    />
  );
};

export default Pagination;
