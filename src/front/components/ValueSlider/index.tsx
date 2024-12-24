import React from 'react';
import ReactSlider from 'react-range-slider-input';

interface IOwnProps {
  min: number;
  max: number;
  value: number[];
  className?: string;
  onChange: (value: number[]) => void;
}

const ValueSlider: React.FC<IOwnProps> = (props) => {
  const { min, max, className, onChange, value } = props;

  return (
    <ReactSlider
      className={className}
      value={value}
      min={min}
      max={max}
      onInput={onChange}
    />
  );
};

export default ValueSlider;
