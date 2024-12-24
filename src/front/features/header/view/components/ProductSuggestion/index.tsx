import React from 'react';

import { useSuggestProducts } from '../../../../../hooks/useSuggest';
import InputSuggestion, {
  IOption,
} from '../../../../../components/InputSuggestion';
import { ISuggestItem, ISuggestResult } from '../../../../../api/types';
import { IProductSuggest } from '../../../../../api/types/product';
import ProductSuggestionRow from './components/ProductSuggestionRow';
import { ISearchBarControl } from '../../../../../providers/SearchBarProvider/namespace';
import { SearchBarContext } from '../../../../../providers/SearchBarProvider/SearchBarContext';

interface IOwnProps {
  onEnter?(): void;
  defaultValue?: string;
}

const ProductSuggestion: React.FC<IOwnProps> = (props) => {
  const { onEnter, defaultValue } = props;
  const [handleRequest, results, state] = useSuggestProducts();
  const control: ISearchBarControl = React.useContext(SearchBarContext);
  const [value, setValue] = React.useState(defaultValue);

  const changeValue = React.useCallback(
    (newValue: string) => {
      setValue(newValue);
      control.setValue(newValue);
    },
    [setValue, control],
  );

  const options: IOption[] = React.useMemo(() => {
    if (!results || !results.result?.length) {
      return [];
    }

    const resOptions: IOption[] = [];

    (results as ISuggestResult<IProductSuggest>).result.map(
      (res: ISuggestItem<IProductSuggest>) => {
        resOptions.push({
          label: <ProductSuggestionRow product={res.item} />,
          value: res.item.id, // TODO: Replace to res.item.slug
        });

        // return {
        //   label: `${res.item.name} ${res.item.name_ru}`,
        //   value: res.item.id,
        // } as IOption;
      },
    );

    return resOptions;
  }, [results]);

  const handleLoadOptions = React.useCallback(
    (value: string) => {
      changeValue(value);
      handleRequest(value);
    },
    [handleRequest, changeValue],
  );

  // console.log(value, JSON.stringify(options, null, 2));

  return (
    <InputSuggestion
      defaultValue={defaultValue}
      loadOptions={handleLoadOptions}
      options={options}
      isLoading={state !== 'clear'}
      value={value}
      placeholder="Поиск по каталогу"
      onEnter={onEnter}
    />
  );
};

export default ProductSuggestion;
