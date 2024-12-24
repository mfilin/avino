export class TreeDictionaryItemDto<T> {
  code: string;
  slug: string;
  order: number | null;
  parent: string | null;
  props: T;
}
