import React from 'react';
import { CommonBurgerProps, RenderOptions } from 'hamburger-react';
import { Burger as BurgerComponent } from 'hamburger-react/dist-cjs/Burger';

const BurgerComponentRender: React.FC<RenderOptions> = (props) => {
  return (
    <div
      className="hamburger-react"
      aria-label={props.label}
      aria-expanded={props.isToggled}
      data-testid="tilt"
      onClick={props.handler}
      onKeyUp={(e) => e.key === 'Enter' && props.handler()}
      role="button"
      style={{
        ...props.burgerStyles,
        transform: `${
          props.isToggled
            ? `rotate(${90 * (props.isLeft ? -1 : 1)}deg)`
            : 'none'
        }`,
      }}
      tabIndex={0}
    >
      <div
        data-testid="bar-one"
        style={{
          ...props.barStyles,
          width: `${props.width}px`,
          top: `${props.topOffset}px`,
          transition: `${props.time}s ${props.easing}`,
          transform: `${
            props.isToggled
              ? `rotate(${45 * (props.isLeft ? -1 : 1)}deg) translate(${
                  props.move * (props.isLeft ? -1 : 1)
                }px, ${props.move}px)`
              : 'none'
          }`,
        }}
      />

      <div
        data-testid="bar-two"
        style={{
          ...props.barStyles,
          width: `${props.width}px`,
          top: `${props.topOffset + props.barHeight + props.margin}px`,
          transition: `${props.time}s ${props.easing}`,
          transform: `${props.isToggled ? 'scaleX(0)' : 'none'}`,
        }}
      />

      <div
        data-testid="bar-three"
        style={{
          ...props.barStyles,
          width: `${props.width}px`,
          top: `${props.topOffset + props.barHeight * 2 + props.margin * 2}px`,
          transition: `${props.time}s ${props.easing}`,
          transform: `${
            props.isToggled
              ? `rotate(${45 * (props.isLeft ? 1 : -1)}deg) translate(${
                  props.move * (props.isLeft ? -1 : 1)
                }px, ${props.move * -1}px)`
              : 'none'
          }`,
        }}
      />
    </div>
  );
};

interface IOwnProps extends CommonBurgerProps {
  width?: number;
}

const Burger: React.FC<IOwnProps> = (props) => {
  const { width } = props;

  return (
    <BurgerComponent
      {...props}
      render={(o: RenderOptions) => {
        // Default integrated values refactor
        o.burgerStyles.height = `${width}px`;
        o.burgerStyles.width = `${width}px`;
        o.barStyles.left = 0;
        o.barStyles.background = undefined;
        o.topOffset = 2;

        return <BurgerComponentRender {...o} />;
      }}
    />
  );
};

export default Burger;
