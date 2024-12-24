import React from 'react';
import clsx from 'clsx';
import { IClientCatalog } from '../../../../../../types/portal/client';
import Title from '../../../../../components/Typography/Title';
import ArrowIcon from '../../../../../images/arrow-category.svg';
import Text from '../../../../../components/Typography/Text';
import ShallowLink from '../../../../../elements/ShallowLink';
import Config from 'src/front/config';
import { useDeviceInfo } from '../../../../../hooks/device';

import styles from './PopularCategories.module.scss';

interface IOwnProps {
  cache?: IClientCatalog;
}

const categoryImages = {
  whisky: '/images/whiskey-category.png',
  'wine-all': '/images/wine-category.png',
  'cognac-all': '/images/cognac-category.png',
  'vodka-all': '/images/vodka-category.png',
};
const PopularCategories: React.FC<IOwnProps> = ({ cache }) => {
  const { isMobile } = useDeviceInfo();

  return (
    <div
      className={clsx(styles.PopularCategories, {
        [styles.MobileView]: isMobile,
      })}
    >
      <Title as="h2" withOrangeLine className={styles.Title}>
        Популярные категории
      </Title>
      <div className={styles.List}>
        {Object.entries(cache?.catalog || {}).map(([key, value]) => {
          return (
            <ShallowLink href={`catalog/${key}`} key={key}>
              <div className={styles.Category}>
                <div className={styles.Name}>
                  <Text level={isMobile ? 's15h15w700' : 's18h20w800'}>
                    {value.label}
                  </Text>
                  {!isMobile && <ArrowIcon />}
                </div>

                <img
                  src={`${Config.basePath}${
                    categoryImages[key] ?? categoryImages.whisky
                  }`}
                  alt="category"
                />
              </div>
            </ShallowLink>
          );
        }, [])}
      </div>
    </div>
  );
};
export default PopularCategories;
