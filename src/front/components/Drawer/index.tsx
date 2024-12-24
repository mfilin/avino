import React from 'react';
import styles from './Drawer.module.scss';
import clsx from 'clsx';
import Text from '../Typography/Text';
import Title from '../Typography/Title';
import {
  DrawerContext,
  EDrawersNames,
} from 'src/front/providers/drawerProvider';

interface IOwnProps {
  drawerId: EDrawersNames;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  withoutHeader?: boolean;
}

const Drawer: React.FC<IOwnProps> = ({
  title,
  drawerId,
  onClose,
  children,
  withoutHeader,
}) => {
  const { currentDrawer } = React.useContext(DrawerContext);
  const isVisible = currentDrawer === drawerId;

  return (
    <div className={clsx(styles.Drawer, { [styles.Hidden]: !isVisible })}>
      {!withoutHeader && (
        <div className={styles.DrawerHeader}>
          {title ? (
            <Title as="h2" withOrangeLine>
              {title}
            </Title>
          ) : (
            <div></div>
          )}
          <Text level="s12h16w400" onClick={onClose}>
            Закрыть
          </Text>
        </div>
      )}
      <div className={styles.DrawerContent}>
        <>{children}</>
      </div>
    </div>
  );
};
export default Drawer;
