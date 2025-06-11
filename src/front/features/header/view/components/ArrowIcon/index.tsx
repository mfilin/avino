import React from 'react';

interface ArrowIconProps {
  className?: string;
}

/**
 * ArrowIcon component that references an SVG from a sprite sheet
 */
const ArrowIcon: React.FC<ArrowIconProps> = ({ className }) => {
  // Using the sprite reference approach with the correct path to the sprite file
  // The sprite is located at src/assets/sprites/sprite.svg
  return (
    <i className={className}>
      <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
        <use xlinkHref="img/sprites/sprite.svg#nav_arrow" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
      </svg>
    </i>
  );
};

export default ArrowIcon;
