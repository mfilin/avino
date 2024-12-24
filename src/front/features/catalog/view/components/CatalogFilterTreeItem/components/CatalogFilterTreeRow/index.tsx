import React from 'react';
import clsx from 'clsx';
import Checkbox, {
  ICheckboxChangeEvent,
} from '../../../../../../../elements/Checkbox';
import { PlusMinus } from '../../../../../../../elements';

import styles from './CatalogFilterTreeRow.module.scss';

interface IOwnProps {
  checked: boolean;
  label: string;
  count: number;
  hasChilds: boolean;
  isOpen?: boolean;
  isBold?: boolean;
  classNamePrefix?: string;
  onCheck(e: ICheckboxChangeEvent): void;
  onChangeOpenState(): void;
}

const CatalogFilterTreeRow: React.FC<IOwnProps> = (props) => {
  const {
    onCheck,
    checked,
    label,
    count,
    hasChilds,
    isOpen,
    isBold,
    classNamePrefix,
    onChangeOpenState,
  } = props;

  return (
    <div
      className={clsx(styles.CatalogFilterTreeRow, `${classNamePrefix}-main`, {
        bold: isBold,
      })}
    >
      <Checkbox
        className={clsx(styles.Checkbox, `${classNamePrefix}-checkbox`)}
        onChange={onCheck}
        checked={checked}
      />{' '}
      {label}{' '}
      <span className={clsx(styles.Count, `${classNamePrefix}-count`)}>
        {count}
      </span>
      {hasChilds ? (
        <PlusMinus
          isPlus={!isOpen}
          onClick={onChangeOpenState}
          className={clsx(styles.PlusMinus, `${classNamePrefix}-plusminus`)}
        />
      ) : null}
    </div>
  );
};

export default CatalogFilterTreeRow;
