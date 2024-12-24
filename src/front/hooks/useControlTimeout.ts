import React from 'react';

function useControlTimeout(
  handler: () => () => void,
  tout: number,
  deps?: React.DependencyList,
) {
  const controls = React.useMemo(() => {
    const stepHandler = handler();
    let isPaused = false;
    let interval = null;

    return {
      start: () => {
        if (interval) {
          clearInterval(interval);
        }
        interval = setInterval(() => {
          if (!isPaused) {
            stepHandler();
          }
        }, tout);
      },
      pause: () => {
        isPaused = true;
      },
      resume: () => {
        isPaused = false;
      },
      stop: () => {
        clearInterval(interval);
        interval = null;
      },
    };
  }, deps);

  if (typeof window !== 'undefined') {
    React.useLayoutEffect(() => {
      controls.start();
      return () => {
        controls.stop();
      };
    }, [controls]);
  }

  return controls;
}

export default useControlTimeout;
