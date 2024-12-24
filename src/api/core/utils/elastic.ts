export function filterMapToTerms(
  filtersMap: Record<string, string[] | string>,
) {
  return Object.entries(filtersMap).map(([key, value]) => {
    const term = { [`${key}.slug.keyword`]: value };

    return Array.isArray(value) ? { terms: term } : { term };
  });
}

export function taxonQueryBuilder(
  filtersMap: Record<string, string[] | string>,
  onlyKeys?: string[],
  exclude?: boolean,
) {
  let finalOnlyKeys = onlyKeys?.filter((key: string) =>
    Boolean(filtersMap[key]),
  );
  if (exclude && finalOnlyKeys) {
    finalOnlyKeys = Object.keys(filtersMap).filter((key: string) => {
      return finalOnlyKeys.indexOf(key) < 0;
    });
  }
  const outKeys = onlyKeys ? finalOnlyKeys : Object.keys(filtersMap);

  return filterMapToTerms(
    outKeys.reduce((acc, key) => {
      acc[key] = filtersMap[key];
      return acc;
    }, {} as Record<string, string[] | string>),
  );
}
