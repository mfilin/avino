import React from 'react';
import styles from './SelectCustom.module.scss';
import Select from 'react-select';
import { StateManagerProps } from 'react-select/dist/declarations/src/stateManager';
type TOption = {
  label: string;
  value: string | string[];
  [x: string]: unknown;
};
interface IOwnProps {
  className?: string;
  options: TOption[];
  onChange: (option: TOption | null) => void;
}
const SelectCustom: React.FC<IOwnProps & StateManagerProps> = ({
  options,
  onChange,
  className,
  ...otherProps
}) => {
  return (
    <div className={styles.SelectCustom}>
      <Select
        options={options}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            border: '2px solid #EFEFEF !important',
            borderRadius: '3px',
            height: '55px',
            padding: '0 10px',
            boxShadow: '0',
            cursor: 'pointer',
          }),
          container: (baseStyles) => ({
            ...baseStyles,
            border: '0 !important',
            outlineStyle: 'none !important',
          }),
          indicatorSeparator: () => ({ display: 'none' }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: '#797979',
            fontSize: '15px',
            lineHeight: '18px',
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            color: '#797979',
            fontSize: '15px',
            lineHeight: '18px',
            paddingLeft: '22px',
            backgroundColor: state.isSelected ? '#EFEFEF' : '#fff',
            cursor: 'pointer',
          }),
          ...otherProps.styles,
        }}
        isSearchable={false}
        onChange={onChange}
        className={className}
        {...otherProps}
      />
    </div>
  );
};
export default SelectCustom;
