export interface IPagingResponse<T> {
  total: number;
  page: number;
  items: T[];
}
