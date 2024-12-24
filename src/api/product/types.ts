export interface ISortOrder {
  fieldName: string;
  order: 'asc' | 'desc';
}

export interface ILoadProductOptions {
  pageSize: number;
  page: number;
  sort?: ISortOrder[];
  priceFrom?: number;
  priceTo?: number;
  query?: string;
  dateFrom?: string;
  dateTo?: string;
}
