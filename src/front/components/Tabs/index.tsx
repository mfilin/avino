import React from 'react';
import styles from './Tabs.module.scss';
import Text from '../Typography/Text/index';
interface IOwnProps {
  tabs: { key: string; label: string }[];
  onSelect: (tab: string) => void;
}
const Tabs: React.FC<IOwnProps> = ({ tabs, onSelect }) => {
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleChangeTab = (index: number) => {
    setCurrentTab(index);
    onSelect(tabs[index].key);
  };

  return (
    <div className={styles.Tabs}>
      {tabs.map((tab, index) => {
        const isActive = index === currentTab;
        return (
          <div
            key={index}
            className={styles.Tab}
            onClick={() => handleChangeTab(index)}
          >
            <Text level="s36h16w800" color={isActive ? '#414141' : '#BCBCBC'}>
              {tab.label}
            </Text>
          </div>
        );
      })}
    </div>
  );
};
export default Tabs;
