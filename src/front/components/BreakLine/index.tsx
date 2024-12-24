import React from 'react';
import styles from './BreakLine.module.scss';
interface IOwnProps {
  marginBottom?: string;
}
const BreakLine: React.FC<IOwnProps> = ({ marginBottom }) => {
  return <div className={styles.BreakLine} style={{ marginBottom }}></div>;
};
export default BreakLine;
