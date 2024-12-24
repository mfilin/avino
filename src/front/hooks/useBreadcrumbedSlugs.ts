import React from 'react';
import { IClientCatalog } from '../../types/portal/client';
import { IBreadcrumbSlug, SlugControl } from '../../class/SlugControl';
import { IDecodePortalSlugResult } from '../api/types/portal';

export interface IBreadcrumbSlugsResult {
  addr: IBreadcrumbSlug[];
  tags: Record<'taxons' | 'properties', IBreadcrumbSlug[]>;
  size: number;
  hasSameCategory: boolean;
}

/**
 * $раздел/подраздел$ $тег$ - $дополнительные_фразы$
 * $адрес_раздела/подраздела$ $тег1$ $тег2$-….-$тегN$ $дополнительные_фразы$
 * <a href="/">Главная</a> >
 *    <a href="$адрес_раздела$">$Раздел$</a> >
 *    <a href="$адрес_подраздела$">$Раздел$</a> >
 *    <a href="$адрес_свойства_1$">$Свойство_1$</a> >
 *    <a href="$адрес_свойства_1$">$Свойство_2$</a> >
 *    <a href="$адрес_свойства_n$">$Свойство_n$</a> >
 *
 */
export function useBreadcrumbedSlugs(
  slugs: string[],
  decodedSlugs: IDecodePortalSlugResult['slug'] = {},
  parents: IDecodePortalSlugResult['parent'],
  catalog: IClientCatalog['catalog'],
  filters: IClientCatalog['filters'],
): IBreadcrumbSlugsResult {
  const sequence: IBreadcrumbSlugsResult = React.useMemo(() => {
    // category / catalog | country
    const slugControl = new SlugControl(
      slugs,
      decodedSlugs,
      parents,
      catalog,
      filters,
    );

    return {
      tags: {
        taxons: slugControl.getTaxonBreadcrumbs('taxons'),
        properties: slugControl.getTaxonBreadcrumbs('properties'),
      },
      addr: slugControl.getCategoryBreadcrumbs(),
      size: slugControl.size,
      hasSameCategory: slugControl.hasSameCategoryAddr,
    };
  }, [slugs, decodedSlugs, parents, catalog, filters]);

  return sequence;
}
