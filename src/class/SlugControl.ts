import {
  IClientCatalog,
  IClientFiltersCatalogItem,
  TClientCatalogItem,
} from '../types/portal/client';
import { FILTERS_JOIN_KEY, SLUG_JOIN_KEY } from '../const';
import { splitByTaxonomy } from '../front/utils/category';
import bind from 'bind-decorator';
import { IDecodePortalSlugResult } from '../front/api/types/portal';

export interface IBreadcrumbSlug {
  label: string;
  slug: string;
  taxon: string[];
}

export class SlugControl {
  private static priority = [
    'taxons.root',
    'taxons.category',
    'taxons.country',
    'taxons.brand',
  ];

  private availableAddrKeys: string[] = [];
  private slugsMap: Map<
    string,
    IClientFiltersCatalogItem | TClientCatalogItem | undefined
  >;
  private splittedTags: Map<string, Set<string>>;
  private tagSlugs: string[];
  private slugs: string[];

  constructor(
    slugs: string[],
    private readonly decodedSlugs: IDecodePortalSlugResult['slug'] = {},
    private readonly parents: IDecodePortalSlugResult['parent'],
    private readonly catalogSettings: IClientCatalog['catalog'],
    private readonly filtersSettings: IClientCatalog['filters'],
  ) {
    const topCategory = slugs[0];
    // TODO: Potential error here, topCategory could be undefined
    this.slugs = [this.parents[topCategory]?.[0]].concat(slugs).filter(Boolean);
    this.availableAddrKeys = SlugControl.priority
      .map((key) => (this.decodedSlugs[key] ? key : undefined))
      .filter(Boolean)
      .slice(0, 2); // due to only 2 steps could be for category

    this.slugsMap = this.foundSlugsMap;

    const catalogAddr: string[][] = this.availableAddrKeys.map((key) =>
      Array.isArray(this.decodedSlugs[key])
        ? (this.decodedSlugs[key] as string[])
        : ([this.decodedSlugs[key]] as string[]),
    );

    const flatCatalogAddr = catalogAddr.flat();
    this.tagSlugs = slugs.filter(
      (slug) =>
        flatCatalogAddr.indexOf(slug) < 0 && Boolean(this.decodedSlugs[slug]),
    );

    this.splittedTags = splitByTaxonomy(this.tagSlugs, this.decodedSlugs);
  }

  public getTaxonBreadcrumbs(type: string) {
    return this.getSplittedTagArray(type).map(this.keyTaxonToBreadcrumbs);
  }

  public getCategoryBreadcrumbs() {
    return this.availableAddrKeys.map(this.keyTaxonToBreadcrumbs);
  }

  public getSplittedTagArray(type: string) {
    return Array.from(this.splittedTags.get(type) || []);
  }

  public get hasSameCategoryAddr(): boolean {
    return Boolean(
      this.getSplittedTagArray('taxons')
        .concat(this.getSplittedTagArray('properties'), this.availableAddrKeys)
        .find((addr) => this.decodedSlugs[addr]?.length > 1),
    );
  }

  public get size(): number {
    return this.availableAddrKeys.length + this.tagSlugs.length;
  }

  public get category(): string {
    return this.decodedSlugs[SlugControl.priority[0]]?.[0];
  }

  public get categoryLabel(): string {
    // TODO: Group second category labels
    return this.availableAddrKeys
      .map((key) => this.slugsMap.get(this.decodedSlugs[key]?.[0])?.label)
      .join(' ');
    // return this.catalogSettings.catalog?.[this.category]?.label;
  }

  private get foundSlugsMap(): Map<
    string,
    IClientFiltersCatalogItem | TClientCatalogItem | undefined
  > {
    const slugMap = new Map<
      string,
      IClientFiltersCatalogItem | TClientCatalogItem | undefined
    >();
    this.slugs.forEach((slug) => {
      if (this.catalogSettings[slug]) {
        slugMap.set(slug, this.catalogSettings[slug]);
      } else {
        if (this.decodedSlugs[slug]) {
          for (const addr of this.decodedSlugs[slug]) {
            const filter =
              this.filtersSettings[this.category]?.items[addr]?.items[slug];
            if (filter) {
              slugMap.set(slug, filter);
              break;
            }
          }
        }
      }
    });

    return slugMap;
  }

  @bind
  private keyTaxonToBreadcrumbs(keyTaxon: string): IBreadcrumbSlug {
    const breadcrumbSlugs: string[] = this.decodedSlugs[keyTaxon] as string[];
    return {
      label: breadcrumbSlugs
        .map((slug) => this.slugsMap.get(slug)?.label)
        .filter(Boolean)
        .join(SLUG_JOIN_KEY),
      slug: breadcrumbSlugs.join(FILTERS_JOIN_KEY),
      taxon: [keyTaxon],
    };
  }
}
