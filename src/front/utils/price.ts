interface IFormatOptions {
  style?: 'decimal' | 'currency';
  currencyDisplay?: 'symbol' | 'code';
  maximumFractionDigits?: number;
}

export function formatPriceString(
  price: string | number,
  options: IFormatOptions = {} as IFormatOptions,
) {
  const {
    style = 'currency',
    currencyDisplay = 'symbol',
    maximumFractionDigits = 2,
  } = options;
  return new Intl.NumberFormat('ru-RU', {
    style,
    currency: 'RUB',
    currencyDisplay,
    maximumFractionDigits,
  }).format(price as number);
}
