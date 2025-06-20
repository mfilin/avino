import React from 'react';

import { BodyControlContext } from './BodyControlContext';
import { IBodyControl } from './namespace';

interface IOwnProps {
  onChangeScrollFreezeMode(shouldFreezeScroll: boolean): void;
}

const BodyControlProvider: React.FC<React.PropsWithChildren<IOwnProps>> = ( props ) => {
  
  const { onChangeScrollFreezeMode, children } = props;

  const control: IBodyControl = React.useMemo(() => {
    return {
      setScrollableMode: (scrollable: boolean) => {
        onChangeScrollFreezeMode(!scrollable);
      },
    } as IBodyControl;
  }, [onChangeScrollFreezeMode]);

  return (
    <BodyControlContext.Provider value={control}>
      {children}
    </BodyControlContext.Provider>
  );
};

export default BodyControlProvider;
