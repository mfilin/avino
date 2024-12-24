import React from 'react';
import Api from '../api';
import { ISuggestResult } from '../api/types';
import { IProductSuggest, IProductSuggestSlot } from '../api/types/product';

export function useSuggest<T>(
  queryCallback: (query?: string) => Promise<T>,
  timeout: number = 300,
) {
  const [results, setResults] = React.useState<T>();
  const [requestState, setRequestState] = React.useState('clear');

  const handleRequest = React.useMemo(() => {
    let timer = null;

    return async (query?: string | number) => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      timer = setTimeout(async () => {
        clearTimeout(timer);
        timer = null;
        setRequestState('pending');
        const response: T = await queryCallback(query as string);
        setRequestState('clear');
        setResults(response);
      }, timeout);
    };
  }, [setResults, queryCallback, timeout]);

  return [handleRequest, results, requestState] as const;
}

export function useSuggestProducts() {
  const [handleRequest, results, requestState] = useSuggest<
    ISuggestResult<IProductSuggest>
  >(Api.instance.product.suggestProduct);

  return [handleRequest, results, requestState] as const;
}
