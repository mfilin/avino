import React from 'react';
import { IProductSuggest } from '../../../../../../../api/types/product';
import ProductImage from '../../../../../../../components/ProductImage';

import ShallowLink from '../../../../../../../elements/ShallowLink';
import { getSingleProductRef } from '../../../../../../../utils/product';

import styles from './ProductSuggestionRow.module.scss';

interface IOwnProps {
  product: IProductSuggest;
}

const ProductSuggestionRow: React.FC<IOwnProps> = (props) => {
  const { product } = props;

  const productName = React.useMemo(() => {
    const firstVariant = Array.isArray(product.name)
      ? product.name[0]
      : product.name;
    return <div>{firstVariant.replace(/\<m\>([^\<]*)\<\/m\>/g, '$1')}</div>;
  }, [product]);

  return (
    <div className={styles.ProductSuggestionRow}>
      <ShallowLink href={getSingleProductRef(product)}>
        {product.media?.length ? (
          <div>
            <ProductImage media={product.media} />
          </div>
        ) : null}
        <div>
          <div>{productName}</div>
          <div>
            {product.taxons.category?.value} {product.taxons.country?.value}
          </div>
        </div>
      </ShallowLink>
    </div>
  );
};

export default ProductSuggestionRow;
