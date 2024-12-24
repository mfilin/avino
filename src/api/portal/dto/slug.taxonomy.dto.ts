export class SlugTaxonomyDto {
  parent: Record<string, Array<string>>;
  slug: Record<string, string[] | string>;
}
