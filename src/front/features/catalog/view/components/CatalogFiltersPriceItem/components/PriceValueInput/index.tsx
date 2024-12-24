import React from 'react';
import Input from '../../../../../../../elements/Input';

interface IOwnProps {
  placeholder?: string;
  className?: string;
  priceMin: number;
  priceMax: number;
  value: string;
  readonly?: boolean;
  variant?: string;
  endContent?: React.ReactNode;
  onChange?(newValue: string): void;
}

const PriceValueInput: React.FC<IOwnProps> = (props) => {
  const {
    placeholder,
    className,
    value,
    readonly,
    variant,
    endContent,
    priceMin,
    priceMax,
    onChange,
  } = props;
  // const [] = React.useState();

  const handleChange = React.useCallback(
    (value: string) => {
      onChange(value);
    },
    [onChange, priceMin, priceMax],
  );

  return (
    <Input
      value={value}
      endContent={endContent}
      className={className}
      variant={variant}
      readonly={readonly}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default PriceValueInput;
