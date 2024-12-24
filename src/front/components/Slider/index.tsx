import React from 'react';
import clsx from 'clsx';

import styles from './Slider.module.scss';

interface IOwnProps {
  elements: Array<React.ReactElement>;
  currentFrame: number;
  onChange?(frame: number): void;
}

const Slider: React.FC<IOwnProps> = (props) => {
  const { elements, currentFrame } = props;
  const ref = React.useRef();
  let currentFrameFixed = currentFrame < 0 || !currentFrame ? 0 : currentFrame;
  if (currentFrameFixed > elements.length - 1) {
    currentFrameFixed = elements.length - 1;
  }

  return (
    <div className={styles.Slider} ref={ref}>
      {elements.map((element: React.ReactElement, index: number) => {
        const className =
          index < currentFrameFixed
            ? styles.Left
            : index === currentFrameFixed
            ? styles.Current
            : styles.Right;

        return (
          <div
            className={clsx(styles.Side, className)}
            key={`element-${index}`}
          >
            {element}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
