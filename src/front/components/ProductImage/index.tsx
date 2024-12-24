import React from 'react';
import clsx from 'clsx';
import { IProductMedia } from '../../api/types/product';
import { getProductImages } from '../../utils/getProductImages';

import styles from './ProductImage.module.scss';

export type TImageType = 'sm';

interface IOwnProps {
  media: IProductMedia[];
  type?: TImageType;
}

const ProductImage: React.FC<IOwnProps> = (props) => {
  const { media, type = 'sm' } = props;

  return (
    <img
      className={clsx(styles.ProductImage, {
        [`${styles[`ProductImage_${type}`]}`]: true,
      })}
      src={getProductImages(media)[0]}
    />
  );
};

export default ProductImage;
