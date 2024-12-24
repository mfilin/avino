import { FILTERS_JOIN_KEY } from '../../const';

export function routeSlugToArray(routeSlugs: string | string[]) {
  let res = [];
  const slugs: string[] = Array.isArray(routeSlugs)
    ? routeSlugs
    : routeSlugs
    ? [routeSlugs]
    : [];

  for (const slug of slugs) {
    const items = slug.split(FILTERS_JOIN_KEY);
    res = res.concat(items);
  }

  return res;
}
