import React from 'react';
import { Input as NextInput, InputProps } from '@nextui-org/react';

interface IOwnProps {
  placeholder?: string;
  className?: string;
  value: number | string;
  readonly?: boolean;
  variant?: string;
  endContent?: React.ReactNode;
  onChange?(newValue: string): void;
  onClear?(): void;
}

const Input: React.FC<IOwnProps> = (props) => {
  const {
    placeholder,
    value,
    onChange,
    className,
    onClear,
    readonly,
    endContent,
    variant = 'underlined',
  } = props;

  return (
    <NextInput
      radius="none"
      size="sm"
      fullWidth={false}
      variant={variant as InputProps['variant']}
      isReadOnly={readonly}
      placeholder={placeholder}
      value={value as string}
      className={className}
      endContent={endContent}
      onValueChange={onChange}
      onClear={onClear}
    />
  );
};

export default Input;
