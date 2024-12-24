import { IDecodePortalSlugResult } from '../api/types/portal';

export function getCategoryURL(catalog: string, slug: string, value?: string) {
  switch (slug) {
    case 'taxons.category':
      return `/${value ? value : catalog}`;
  }

  return `/${catalog}${value ? `/${value}` : ''}`;
  // return `/${value ? value : catalog}`;
}
export type TPageType = 'catalog' | 'product';

export function decodeAddrAndSlug(
  category: string,
  decodedSlugs: IDecodePortalSlugResult['slug'],
  parents: IDecodePortalSlugResult['parent'],
): [TPageType, string?] {
  if (category) {
    const addr = decodedSlugs?.[category]?.[0] || '';
    const [type, id] = addr.split('.') || [];

    switch (type) {
      case 'product':
        return [type, id];
    }

    switch (addr) {
      case 'taxons.category':
        return ['catalog'];
    }
  }

  return ['catalog'];
}

export function splitByTaxonomy(
  slugs: string[],
  decodedSlugs: IDecodePortalSlugResult['slug'],
): Map<string, Set<string>> {
  const groups = new Map<string, Set<string>>();
  slugs.forEach((slug) => {
    const addrs: string[] = Array.isArray(decodedSlugs[slug])
      ? (decodedSlugs[slug] as string[])
      : [decodedSlugs[slug] as string];
    addrs.forEach((addr) => {
      const [type] = addr.split('.');
      if (!groups.has(type)) {
        groups.set(type, new Set());
      }
      groups.get(type).add(addr);
    });
  });

  return groups;
}
