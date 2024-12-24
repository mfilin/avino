import React from 'react';
import { IFiltersControl } from '../../../types/filters';
import { IStateChangeEvent } from '../../../../class/FiltersControl';

/**
 * Subscribe on filters change events
 * @param {IFiltersControl} filtersControl
 * @return {any}
 */
export function useFiltersState(
  filtersControl: IFiltersControl,
  category?: string,
  slug?: string,
) {
  const [filtersStateValue, setFiltersStateValue] = React.useState(null);

  // Subscribe
  React.useEffect(() => {
    let stateValue = 0;
    const handler = (e: IStateChangeEvent) => {
      if (category) {
        if (category === e.category) {
          if (slug) {
            if (slug === e.slug) {
              setFiltersStateValue(++stateValue);
            }
          } else {
            setFiltersStateValue(++stateValue);
          }
        }
      } else {
        setFiltersStateValue(++stateValue);
      }
    };

    filtersControl.on('onStateChange', handler);
    return () => {
      filtersControl.off('onStateChange', handler);
    };
  }, [filtersControl, setFiltersStateValue, category, slug]);

  return filtersStateValue;
}
