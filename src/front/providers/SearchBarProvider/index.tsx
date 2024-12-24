import React from 'react';
import Router from 'next/router';
import { SearchBarContext } from './SearchBarContext';
import { ISearchBarControl } from './namespace';

const SearchBarProvider: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;

  const control: ISearchBarControl = React.useMemo(() => {
    return {
      currentValue: null,
      setValue(newValue: string) {
        this.currentValue = newValue;
      },
      pushSearchRoute() {
        Router.push(`/search?query=${this.currentValue}`, undefined, {
          scroll: true,
          shallow: true,
        });
      },
    } as ISearchBarControl;
  }, []);

  return (
    <SearchBarContext.Provider value={control}>
      {children}
    </SearchBarContext.Provider>
  );
};

export default SearchBarProvider;
