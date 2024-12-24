import React from 'react';
import clsx from 'clsx';

import styles from './Checkbox.module.scss';

export interface ICheckboxRef {
  focus: () => void;
  blur: () => void;
  input: HTMLInputElement | null;
}

export interface ICheckboxChangeEventTarget {
  checked: boolean;
}

export interface ICheckboxChangeEvent {
  target: React.ChangeEvent<HTMLInputElement>['target'] &
    ICheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: React.ChangeEvent<HTMLInputElement>['nativeEvent'];
}

interface IOwnProps
  extends Omit<React.InputHTMLAttributes<string>, 'onChange'> {
  prefixCls?: string;
  title?: string;
  onChange?: (e: ICheckboxChangeEvent) => void;
}

const Checkbox: React.FC<IOwnProps> = React.forwardRef<ICheckboxRef, IOwnProps>(
  (props, ref) => {
    const inputRef = React.useRef(null);
    const {
      prefixCls = 'rawCheckbox',
      className,
      title,
      onChange,
      // checked,
      disabled,
      // defaultChecked = false,
      type = 'checkbox',
      ...inputProps
    } = props;
    // const [rawValue, setRawValue] = React.useState(defaultChecked);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        // setRawValue(e.target.checked);
        onChange?.({
          target: {
            ...e.target,
            checked: e.target.checked,
          },
          stopPropagation: () => e.stopPropagation(),
          preventDefault: () => e.preventDefault(),
          nativeEvent: e.nativeEvent,
        });
      },
      [onChange],
    );

    return (
      <span
        className={clsx(styles.Checkbox, className, 'noselect', {
          [`${prefixCls}-checked`]: Boolean(props.checked),
          [`${prefixCls}-disabled`]: disabled,
        })}
        title={title}
      >
        <label>
          <input
            {...(inputProps as any)}
            className={`${prefixCls}-input`}
            ref={inputRef as any}
            onChange={handleChange}
            disabled={disabled}
            // checked={!!rawValue}
            type={type}
          />
          <span className={`${prefixCls}-inner`} />
        </label>
      </span>
    );
  },
);

export default Checkbox;
