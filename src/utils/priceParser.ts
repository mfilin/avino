export function priceParser(slugs: string[]): { from?: number; to?: number } {
  let from = undefined;
  let to = undefined;
  const priceToStr = 'price-to';
  const priceFromStr = 'price-from';
  const priceStr = 'price';

  slugs.forEach((slug) => {
    let value = null;

    if (slug.indexOf(priceToStr) === 0) {
      value = parseInt(slug.substr(priceToStr.length + 1), 10);
      if (!isNaN(value)) {
        if (to == undefined || value > to) {
          to = value;
        }
      }
    } else if (slug.indexOf(priceFromStr) === 0) {
      value = parseInt(slug.substr(priceFromStr.length + 1), 10);
      if (!isNaN(value)) {
        if (from == undefined || value < from) {
          from = value;
        }
      }
    } else {
      const [valueFrom, valueTo] = slug
        .substr(priceStr.length + 1)
        .split('-')
        .map((x) => parseInt(x, 10));
      if (!isNaN(valueFrom)) {
        if (from == undefined || valueFrom < from) {
          from = valueFrom;
        }
      }
      if (!isNaN(valueTo)) {
        if (to == undefined || valueTo > to) {
          to = valueTo;
        }
      }
    }
  });

  return {
    from,
    to,
  };
}
