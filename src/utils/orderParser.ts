import { ISortOrder } from '../api/product/types';

export const ALLOWED_SORT_FIELDS = new Set([
  'is_hit',
  'is_new',
  'name',
  'price',
]);

interface IParserOptions {
  onFieldNotAllowed?(field, message): void;
}

export function orderParser(
  order: string,
  type: 'asc' | 'desc',
  options: IParserOptions = {},
) {
  const sortFieldsSrc = order?.split(',') || [];
  const finalSortFields = [];
  for (const field of sortFieldsSrc) {
    if (!ALLOWED_SORT_FIELDS.has(field)) {
      options?.onFieldNotAllowed?.(
        field,
        `Sort field [${field}] not in allowed filter list, removed from ordering`,
      );
      continue;
    }
    finalSortFields.push(field);
  }

  const sort = finalSortFields.map(
    (fieldName) =>
      ({
        order: type,
        fieldName,
      } as ISortOrder),
  );

  return sort || [];
}

export function ascDescOrderParser(
  ascOrder: string,
  descOrder: string,
  options: IParserOptions = {},
) {
  return [
    ...orderParser(ascOrder, 'asc', options),
    ...orderParser(descOrder, 'desc', options),
  ];
}
