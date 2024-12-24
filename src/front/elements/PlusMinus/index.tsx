import React from 'react';
import PlusSvg from '../../images/plus.svg';
import MinusSvg from '../../images/minus.svg';

interface IOwnProps {
  isPlus?: boolean;
  onClick?: () => void;
  className?: string;
}

const PlusMinus: React.FC<IOwnProps> = (props) => {
  const { isPlus, onClick, className } = props;

  const handleClick = React.useCallback(() => {
    onClick?.();
  }, [onClick]);

  if (isPlus) {
    return (
      <div onClick={handleClick} className={className}>
        <PlusSvg />
      </div>
    );
  }

  return (
    <div onClick={handleClick} className={className}>
      <MinusSvg />
    </div>
  );
};

export default PlusMinus;
