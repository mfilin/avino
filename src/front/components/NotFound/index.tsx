import React from 'react';
import clsx from 'clsx';
import Title from '../Typography/Title';
import Text from '../Typography/Text';
import Button from '../Button';
import ShallowLink from '../../elements/ShallowLink';
import FearIcon from '../../images/fear.svg';
import Config from '../../config';
import Layout from '../Layout';
import { useDeviceInfo } from '../../hooks/device';

import styles from './NotFound.module.scss';

const NotFound: React.FC = ({}) => {
  const { isMobile } = useDeviceInfo();

  return (
    <Layout>
      <div className={clsx(styles.NotFound, { [styles.MobileView]: isMobile })}>
        <div className={styles.Info}>
          <Title className={styles.Title}>Извините, страница закончилась</Title>
          <Text
            colorMode="grey"
            level={isMobile ? 's18h22w400' : 's36hnw400'}
            className={styles.SubTitle}
          >
            – ее всю выпили
            <FearIcon />
          </Text>
          <div className={styles.Description}>
            <Text level={isMobile ? 's14h16w600' : 's15h20w500'}>
              Мир алкогольных напитков ждет Вас!
            </Text>
            <Text level={isMobile ? 's14h16w600' : 's15h20w500'}>
              Вернитесь на главную страницу, чтобы начать покупки.
            </Text>
          </div>
          <ShallowLink href="/">
            <Button color="black-fill">Вернуться на главную</Button>
          </ShallowLink>
        </div>
        <img src={`${Config.basePath}/images/404-big.png`} />
      </div>
    </Layout>
  );
};
export default NotFound;
