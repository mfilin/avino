import React from 'react';
import { IPageProps } from '../../../../../../types/portal/server';

import styles from './FavoriteContainer.module.scss';
import { IProduct } from 'src/front/api/types/product';
import DefaultProductCard from '../../../../../components/DefaultProductCard/index';

interface IOwnProps {
  pageProps: IPageProps;
}

const FavoriteContainer: React.FC<IOwnProps> = (props) => {
  return (
    <div className={styles.FavoriteContainer}>
      {[].map((product) => {
        return (
          <DefaultProductCard
            key={product.id}
            productInfo={product}
            onBuyNow={() => console.log('clicked buy now')}
            onAddToCart={(number) =>
              console.log('if in cart we removing:', number)
            }
            // onAddToComparison={handleAddToFavorite}
            onAddToFavorite={(id: IProduct) => {
              console.log(`add to favorite item with id${id}`);
            }}
          />
        );
      })}
    </div>
  );
};

export default FavoriteContainer;
