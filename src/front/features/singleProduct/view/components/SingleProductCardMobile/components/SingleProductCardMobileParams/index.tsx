import React from 'react';
import Text from '../../../../../../../components/Typography/Text';

import { IProduct } from '../../../../../../../api/types/product';
import { TProductDictionary } from '../../../../../../../../types/portal/server';

import styles from './SingleProductCardMobileParams.module.scss';

interface IOwnProps {
  productInfo: IProduct;
  propertiesDictionary: TProductDictionary;
}

const SingleProductCardMobileParams: React.FC<IOwnProps> = (props) => {
  const { productInfo, propertiesDictionary } = props;
  const { taxons, properties } = productInfo;

  return (
    <div className={styles.SingleProductCardMobileParams}>
      {/* <div className={styles.ParamRow}>
            <Text level="s15h15w500" colorMode="grey">
              Рейтинг:
            </Text>
            <span className={styles.Rating}>
              <CardSocialRating grade={(productInfo as any).grade} />
              <CardVivinoRating rating={(productInfo as any).rating} />
            </span>
          </div> */}
      {productInfo?.taxons &&
        Object.entries(taxons).map(([key, value]) => {
          if (key === 'root') {
            return null;
          }
          return (
            <div key={key} className={styles.ParamRow}>
              <Text level="s15h15w500" colorMode="grey">
                {propertiesDictionary?.[`taxons.${key}`] || key}:
              </Text>
              <Text level="s15h15w500">{value?.value}</Text>
            </div>
          );
        })}
      {productInfo?.properties &&
        Object.entries(properties).map(([key, value]) => {
          if (key === 'perc') {
            return null;
          }
          let name = propertiesDictionary?.[`properties.${key}`] || key;
          let values = value;
          if (key === 'psort') {
            name = 'Виноград';
            values = value.map((val) => {
              const perc = properties.perc?.find(
                (x) => x.sorted === val.sorted,
              );
              return {
                ...val,
                value: `${val.value}${perc ? `: ${perc.value}` : ''}`,
              };
            });
          }
          return (
            <div key={key} className={styles.ParamRow}>
              <Text level="s15h15w500" colorMode="grey">
                {name}:
              </Text>
              <div className={styles.RowValues}>
                {values.map((val) => (
                  <Text level="s15h15w500">{val.value}</Text>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SingleProductCardMobileParams;
