export function avaliableKeysAsMap(
  input: Record<string, any>,
): Record<string, string> {
  return Object.keys(input).reduce((acc, key) => {
    acc[key] = key;
    return acc;
  }, {});
}

export const arrayQntSearchIndexer = (
  values: number[],
  qnt: number,
  outOfScopeValue?: string,
) => {
  const [cache, steps] = ((values, qnt, outOfScopeValue) => {
    const res = {};
    const stepsCached = {};
    const sorted = values.sort();
    const steps = sorted.map((v) => Math.floor(v / qnt));

    const max = steps[steps.length - 1];

    stepsCached[undefined as any] = outOfScopeValue;

    for (let i = 0, step = 0; i < max; i++) {
      if (i >= steps[step]) step++;
      res[i] = step;
      stepsCached[step] = values[step];
    }

    return [res, stepsCached];
  })(values, qnt, outOfScopeValue);

  return (val) => {
    const idx = Math.floor(val / qnt);
    return steps[cache[idx]];
  };
};
