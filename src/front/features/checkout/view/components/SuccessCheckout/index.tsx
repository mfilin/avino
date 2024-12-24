import React from 'react';
import clsx from 'clsx';
import Text from '../../../../../components/Typography/Text';
import SmileIcon from '../../../../../images/grac-smile.svg';
import Button from '../../../../../components/Button';
import Config from 'src/front/config';
import ShallowLink from 'src/front/elements/ShallowLink';
import { Layout } from 'src/front/components';
import { useDeviceInfo } from '../../../../../hooks/device';

import styles from './SuccessCheckout.module.scss';

interface IOwnProps {
  orderNumber?: number;
}
const SuccessCheckout: React.FC<IOwnProps> = ({ orderNumber }) => {
  const { isMobile } = useDeviceInfo();
  return (
    <Layout>
      <div className={clsx(styles.Wrapper, { [styles.MobileView]: isMobile })}>
        <div className={styles.InfoBlock}>
          <Text
            level={isMobile ? 's24h32w700' : 's36hnw800'}
            className={styles.Title}
          >
            Заказ {orderNumber ? `#${orderNumber}` : ''} оформлен
          </Text>
          <Text
            level={isMobile ? 's18h22w400' : 's36hnw400'}
            className={styles.SubTitle}
            colorMode="grey"
          >
            – готовьте посуду <SmileIcon />
          </Text>
          <Text level="s15h15w500" className={styles.Description}>
            Наш менеджер скоро свяжется с вами
          </Text>
          <ShallowLink href="/" prefetch={false}>
            <Button color="black-fill">Вернуться на главную</Button>
          </ShallowLink>
        </div>
        <div className={styles.ImageBlock}>
          <img
            src={`${Config.basePath}/images/bag-with-bottles.png`}
            alt="success"
            width={704}
            height={951}
          />
        </div>
      </div>
    </Layout>
  );
};
export default SuccessCheckout;
