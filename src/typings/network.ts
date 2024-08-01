export type IBaseResponse<T = object> = {
  code: number;
  msg: string | null;
  data?: T;
}

export type IPaginationResponse<T = object> = Omit<IBaseResponse<T>, 'data'> & {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  data: T[];
}

export interface IPaginationQuery {
  page?: number;
  pageSize?: number;
}