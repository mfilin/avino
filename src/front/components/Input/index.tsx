import React from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';
import { FieldValues, useController } from 'react-hook-form';
import Text from '../Typography/Text';

interface IOwnProps {
  className?: string;
  withStar?: boolean;
  isValueUpperCase?: boolean;
}

const Input: React.FC<
  IOwnProps & React.HTMLProps<HTMLInputElement> & FieldValues
> = (props) => {
  const { className, withStar, isValueUpperCase, ...restProps } = props;
  const {
    field,
    fieldState: { error },
  } = useController({
    name: props.name,
    control: props.control,
    rules: props.rules,
  });
  const inputWithStar = props.rules?.required && withStar;
  return (
    <div
      className={clsx(styles.InputWrapper, className, {
        [styles.InputWithStar]: inputWithStar,
        [styles.UpperCase]: isValueUpperCase,
      })}
    >
      <input {...field} {...restProps} />
      <Text className={styles.Error} level="s11h16w400" colorMode="red">
        {error?.message}
      </Text>
    </div>
  );
};
export default Input;
