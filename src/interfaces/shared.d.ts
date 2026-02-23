export type IParams = { [key: string]: string | number | boolean };

export interface ISearch {
  page: number;
  pageSize: number;
  search?: string;
  params?: IParams;
}

export type ResultList<T = any> = { items: T; error?: any };
export type Result<T = any> = { data: T; error?: any };
