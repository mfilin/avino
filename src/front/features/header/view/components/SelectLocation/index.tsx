import React from 'react';

import NavigationPointerIcon from '../../../../../images/navigation-pointer.svg';

import styles from './SelectLocation.module.scss';
import Tooltip from 'src/front/components/Tooltip';
import ShopsInfo from 'src/front/components/ShopsInfo';

const SelectLocation: React.FC = () => {
  return (
    <Tooltip content={<ShopsInfo />}>
      <div className={styles.SelectLocation}>
        <NavigationPointerIcon />
        <div>Москва</div>
      </div>
    </Tooltip>
  );
};

export default SelectLocation;
