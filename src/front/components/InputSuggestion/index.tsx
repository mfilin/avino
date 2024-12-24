import React from 'react';
import Select, { components, InputActionMeta } from 'react-select';

import styles from './InputSuggestion.module.scss';

const { SelectContainer, Control, NoOptionsMessage, Menu, Placeholder, Input } =
  components;

export interface IOption {
  label: string | React.ReactElement;
  value: string | number;
}

interface IOwnProps {
  options: IOption[];
  isLoading: boolean;
  value: IOption['value'];
  loadOptions: (value: IOption['value']) => void;
  placeholder?: string;
  onEnter?: () => void;
  defaultValue?: string;
}

const ProjectSelectContainer: React.FC<React.PropsWithChildren<any>> = (
  props,
) => {
  const { children, ...rest } = props;

  return (
    <SelectContainer {...rest} className={styles.SelectContainer}>
      {children}
    </SelectContainer>
  );
};

const InputControl: React.FC<React.PropsWithChildren<any>> = (props) => {
  const { children, isFocused, ...rest } = props;

  return (
    <Control {...rest} isFocused className={styles.Control}>
      {children}
    </Control>
  );
};

const ProjectNoOptions: React.FC<React.PropsWithChildren<any>> = (props) => {
  const { children, ...rest } = props;

  return <NoOptionsMessage {...rest}>{children}</NoOptionsMessage>;
};

const ProjectMenu: React.FC<React.PropsWithChildren<any>> = (props) => {
  const { children, ...rest } = props;

  if (!rest.options.length) {
    return null;
  }

  return <Menu {...rest}>{children}</Menu>;
};

const ProjectPlaceholder: React.FC<React.PropsWithChildren<any>> = (props) => {
  const { children, ...rest } = props;
  return (
    <Placeholder {...rest} className={styles.Placeholder}>
      {children}
    </Placeholder>
  );
};

const CustomInput: React.FC = (props: any) => {
  // Important! isHidden controls outside and rewrites here as always false
  return <Input {...props} isHidden={false} />;
};

const staticSelectComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
  SelectContainer: ProjectSelectContainer,
  Control: InputControl,
  NoOptionsMessage: () => null,
  Menu: ProjectMenu,
  Input: CustomInput,
  // NoOptionsMessage: ProjectNoOptions,
};

const noOp = () => true;

const InputSuggestion: React.FC<IOwnProps> = (props) => {
  const {
    isLoading,
    options,
    loadOptions,
    value,
    placeholder,
    defaultValue,
    onEnter,
  } = props;

  const handleInputChange = React.useCallback(
    (newValue: IOption['value'], actionMeta: InputActionMeta) => {
      if (actionMeta.action === 'input-change') {
        loadOptions(newValue);
      }
    },
    [loadOptions],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter();
      }
    },
    [onEnter],
  );

  return (
    <Select
      // menuIsOpen={true}
      // menuIsOpen
      defaultInputValue={defaultValue}
      defaultValue={defaultValue}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      value={value as string}
      inputValue={value as string}
      options={options as any} // TODO: Fix any type, here is ts error
      isLoading={isLoading}
      placeholder={placeholder}
      filterOption={noOp}
      components={staticSelectComponents}
      styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
    />
  );
};

export default InputSuggestion;
