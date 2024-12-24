import React from 'react';
import clsx from 'clsx';
import Button from '../Button';
import Api from '../../api';

import styles from './WorkOnSiteDisclaimer.module.scss';

const DISCLAIMER_STORAGE_KEY = 'site-works-disclaimer';

interface IOwnProps {
  isMobile?: boolean;
}

const WorkOnSiteDisclaimer: React.FC<IOwnProps> = (props) => {
  const { isMobile } = props;
  const [isHidden, setIsHidden] = React.useState(true);

  const handleClose = React.useCallback(() => {
    setIsHidden(true);
    Api.instance.storage.set(DISCLAIMER_STORAGE_KEY, 'true');
  }, []);

  React.useEffect(() => {
    setIsHidden(Api.instance.storage.get(DISCLAIMER_STORAGE_KEY) === 'true');
  }, []);

  return (
    <div
      className={clsx(styles.WorkOnSiteDisclaimer, { isMobile, isHidden })}
      suppressHydrationWarning
    >
      <div className={styles.Text}>
        Уважаемые клиенты! Приносим свои извинения, на сайте ведутся технические
        работы по обновлению данных. Всю актуальную информацию по наличию товара
        и цене уточняйте у наших менеджеров по телефону +7 (926) 018-07-07
      </div>
      <div className={clsx(styles.Actions, { isMobile })}>
        <Button color={'white-outline'} onClick={handleClose}>
          Закрыть
        </Button>
      </div>
    </div>
  );
};

export default WorkOnSiteDisclaimer;
