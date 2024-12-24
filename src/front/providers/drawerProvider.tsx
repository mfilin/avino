import { useRouter } from 'next/router';
import React from 'react';

export enum EDrawersNames {
  burgerMenu = 'burgerMenu',
  managerCall = 'managerCall',
  promoAndDiscounts = 'promoAndDiscounts',
  ourShops = 'ourShops',
  contacts = 'contacts',
  catalog = 'catalog',
  catalogFilters = 'catalogFilters',
}

interface IDrawerContext {
  toggleDrawer: (drawer: EDrawersNames) => void;
  checkDrawerIsVisible: (drawer: EDrawersNames) => boolean;
  currentDrawer: string;
}

const DrawerContext = React.createContext<IDrawerContext | null>(null);

const DrawerProvider = ({ children }) => {
  const [currentDrawer, setCurrentDrawer] =
    React.useState<EDrawersNames | null>(null);

  const router = useRouter();

  const handleToggleDrawer = React.useCallback(
    (drawer: EDrawersNames) => {
      if (drawer === currentDrawer) {
        setCurrentDrawer(null);
      } else {
        setCurrentDrawer(drawer);
      }
    },
    [currentDrawer],
  );
  const handleCheckDrawerIsVisible = React.useCallback(
    (drawer: string) => drawer === currentDrawer,
    [currentDrawer],
  );

  React.useEffect(() => {
    setCurrentDrawer(null);
  }, [router]);

  React.useEffect(() => {
    const scrollY = typeof window !== 'undefined' && document.body.style.top;
    if (typeof window !== 'undefined') {
      if (currentDrawer) {
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;
      } else {
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [currentDrawer]);
  return (
    <DrawerContext.Provider
      value={{
        toggleDrawer: handleToggleDrawer,
        checkDrawerIsVisible: handleCheckDrawerIsVisible,
        currentDrawer,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export { DrawerProvider, DrawerContext };
