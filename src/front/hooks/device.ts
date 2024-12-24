import React from 'react';
import { WindowSizeContext } from '../context';
import { IWindowSizeContext } from '../types/context/windowSizeContext';

export function useDeviceInfo(): IWindowSizeContext {
  const windowSizeContext = React.useContext(WindowSizeContext);

  return {
    isMobile: windowSizeContext.isMobile,
    width: windowSizeContext.width,
  };
}
