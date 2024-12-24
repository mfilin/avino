import React from 'react';
import { IPageProps } from '../../../../../../types/portal/server';

import styles from './ComparisonContainer.module.scss';
import { IProduct } from 'src/front/api/types/product';
import ComparisonExtendedCard from '../../../../../components/ComparisonCards/ComparisonExtendedCard/index';
import Text from 'src/front/components/Typography/Text';

interface IOwnProps {
  pageProps: IPageProps;
}

const ComparisonContainer: React.FC<IOwnProps> = (props) => {
  const objectOfCompareFields = []?.reduce((acc, product) => {
    const updatedAcc = { ...acc };
    Object.keys(product.properties).forEach((prop) => {
      const key = 'properties.' + prop;
      if (!updatedAcc[key]) {
        updatedAcc[key] = props.pageProps.settings?.dict?.[key] || key;
      }
    });
    Object.keys(product.taxons).forEach((prop) => {
      const key = 'taxons.' + prop;
      if (!updatedAcc[key]) {
        updatedAcc[key] = props.pageProps.settings?.dict?.[key] || key;
      }
    });
    return updatedAcc;
  }, {});

  if (!objectOfCompareFields) {
    return null;
  }
  return (
    <div className={styles.ComparisonContainer}>
      <div className={styles.List}>
        <div className={styles.FirstColumn}>
          <div className={styles.FirstBlock}></div>
          <div className={styles.SecondBlock}>
            <div className={styles.ComparisonFields}>
              {Object.entries(objectOfCompareFields).map(([key, value]) => {
                return (
                  <Text level="s18h15w600" colorMode="grey" key={key}>
                    {value as string}
                  </Text>
                );
              })}
              <Text level="s18h15w600" colorMode="grey">
                Цена
              </Text>
            </div>
          </div>
        </div>
        {[].map((product) => {
          return (
            <ComparisonExtendedCard
              key={product.id}
              productInfo={product}
              fieldsForComparison={objectOfCompareFields}
              onBuyNow={() => console.log('clicked buy now')}
              onAddToCart={(number) =>
                console.log('if in cart we removing:', number)
              }
              // onAddToComparison={()}
              onAddToFavorite={(id: IProduct) => {
                console.log(`add to favorite item with id${id}`);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ComparisonContainer;
