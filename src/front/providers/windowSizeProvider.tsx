import * as React from 'react';
import { debounce } from '../utils/debounce';
import { IWindowSizeContext } from '../types/context/windowSizeContext';
import { WindowSizeContext } from '../context';
import { isMobile } from '../utils/device';

interface IOwnProps {
  defaultIsMobile?: boolean;
}

const WindowSizeProvider: React.FC<React.PropsWithChildren<IOwnProps>> = ({
  children,
  defaultIsMobile,
}) => {
  const [screenInfo, setScreenInfo] = React.useState<IWindowSizeContext>({
    width: typeof window === 'undefined' ? 0 : window.innerWidth,
    isMobile: defaultIsMobile || isMobile,
  });

  React.useEffect(() => {
    if (window) {
      const setSize = debounce(() => {
        setScreenInfo({
          width: window.outerWidth,
          isMobile: window.outerWidth < 718,
        });
      });

      window.addEventListener('resize', setSize);

      return () => {
        window.removeEventListener('resize', setSize);
      };
    }
  }, [setScreenInfo]);

  return (
    <WindowSizeContext.Provider
      value={{
        width: screenInfo.width,
        isMobile: screenInfo.isMobile,
      }}
    >
      {children}
    </WindowSizeContext.Provider>
  );
};

export default WindowSizeProvider;
