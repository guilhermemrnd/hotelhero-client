export interface APIGetResponse<T> {
  data: T;
  total: number;
  page: number;
  limit: number;
}
