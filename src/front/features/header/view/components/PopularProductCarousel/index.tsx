import React from 'react';
import ShallowLink from '../../../../../elements/ShallowLink';
import { IPopularProductItem } from '../../../../../../types/portal/client';
import { Slider } from '../../../../../components';
import { formatPriceString } from '../../../../../utils/price';

import styles from './PopularProductCarousel.module.scss';

interface IOwnProps {
  products: Array<IPopularProductItem>;
  currentIndex: number;
  pause(): void;
  resume(): void;
}

const PopularProductCarousel: React.FC<IOwnProps> = (props) => {
  const { products, currentIndex, pause, resume } = props;

  const elements = React.useMemo(() => {
    return products.map((product) => {
      const link = `/${product.slug}`;

      return (
        <div key={product.id} className={styles.Product}>
          <div className={styles.Image}>
            <ShallowLink href={link}>
              <img
                src={`https://vinogradnevinovat.ru/storage/${product.media?.[0]}`}
              />
            </ShallowLink>
          </div>
          <div className={styles.Description}>
            <ShallowLink href={link}>{product.name}</ShallowLink>
          </div>
          <div className={styles.Subtitle}>{product.subtitle}</div>
          <div className={styles.Price}>
            {/*{`${product.price} ₽`}*/}
            {formatPriceString(product.price)}
          </div>
        </div>
      );
    });
  }, [products]);

  return (
    <div
      className={styles.PopularProductCarousel}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <Slider elements={elements} currentFrame={currentIndex} />
    </div>
  );
};

export default PopularProductCarousel;
