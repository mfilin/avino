import React from 'react';

export function useDebounceState<T>(timeout: number, defaultValue?: T) {
  const [value, setValue] = React.useState<T>(defaultValue);

  const handleSetValue = React.useMemo(() => {
    let timer = null;

    const clearTimer = () => {
      clearTimeout(timer);
      timer = null;
    };

    return (nextValue: T) => {
      if (timer) {
        clearTimer();
      }

      timer = setTimeout(() => {
        clearTimer();
        setValue(nextValue);
      }, timeout);
    };
  }, [setValue, timeout]);

  return [value, handleSetValue] as const;
}
