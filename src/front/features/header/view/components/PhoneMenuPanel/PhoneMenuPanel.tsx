import React from 'react';

import PhoneIcon from '../../../../../images/phone.svg';

import styles from './PhoneMenuPanel.module.scss';
import Tooltip from 'src/front/components/Tooltip';
import ContactsBlock from 'src/front/components/ContactsBlock';

const PhoneMenuPanel: React.FC = () => {
  return (
    <Tooltip content={<ContactsBlock />}>
      <div className={styles.PhoneMenuPanel}>
        <PhoneIcon />
        <div>8 (926) 018-07-07</div>
      </div>
    </Tooltip>
  );
};

export default PhoneMenuPanel;
