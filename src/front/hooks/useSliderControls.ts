import React from 'react';
import useControlTimeout from './useControlTimeout';

function useSliderControls(interval: number, count: number) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const changeIndexHandler = React.useMemo(() => {
    let internalIndex = 0;
    const maxVal = count - 1;

    return {
      inc: (cnt: number = 1) => {
        internalIndex += Number(cnt);
        if (internalIndex > maxVal) {
          internalIndex = 0;
        }
        setCurrentIndex(internalIndex);
      },
      dec: (cnt: number = 1) => {
        internalIndex -= cnt;
        if (internalIndex < 0) {
          internalIndex = maxVal;
        }
        setCurrentIndex(internalIndex);
      },
      set: (idx: number) => {
        if (idx >= 0 && idx <= maxVal) {
          internalIndex = idx;
        } else if (idx > maxVal) {
          internalIndex = maxVal;
        } else if (idx < 0) {
          internalIndex = 0;
        }
        setCurrentIndex(internalIndex);
      },
    };
  }, [count, setCurrentIndex]);

  const { pause, resume } = useControlTimeout(
    () => {
      return () => {
        changeIndexHandler.inc(1);
      };
    },
    interval,
    [interval, changeIndexHandler],
  );

  return {
    currentIndex,
    pause,
    resume,
    inc: changeIndexHandler.inc,
    dec: changeIndexHandler.dec,
    set: changeIndexHandler.set,
  };
}

export default useSliderControls;
