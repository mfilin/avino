import React from 'react';
import clsx from 'clsx';
import { IProduct } from '../../../../../api/types/product';
import DefaultProductCard from '../../../../../components/DefaultProductCard';
import { TCatalogListType } from '../../../namespace';
import HorizontalCatalogCard from '../../../../../components/HorizontalCatalogCard/index';
import DefaultMobileProductCard from 'src/front/components/DefaultMobileProductCard';
import LoadMoreBtn from '../../../../../components/LoadMoreBtn/index';
import { useDeviceInfo } from '../../../../../hooks/device';

import styles from './CatalogProducts.module.scss';

interface IOwnProps {
  products: IProduct[];
  listType?: TCatalogListType;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

const CatalogProducts: React.FC<IOwnProps> = (props) => {
  const { products, listType, onLoadMore, hasMore } = props;
  const { isMobile } = useDeviceInfo();

  if (!products) {
    return null;
  }
  return (
    <>
      <div className={clsx(styles.List, { [styles.MobileView]: isMobile })}>
        {products.length
          ? products.map((item) => {
              if (isMobile) {
                return (
                  <DefaultMobileProductCard key={item.id} productInfo={item} />
                );
              }
              if (listType === 'blocks') {
                return <DefaultProductCard key={item.id} productInfo={item} />;
              }
              return <HorizontalCatalogCard key={item.id} productInfo={item} />;
            })
          : null}
      </div>
      {onLoadMore && hasMore ? <LoadMoreBtn onClick={onLoadMore} /> : null}
    </>
  );
};

export default CatalogProducts;
