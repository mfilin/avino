import RestService from '../RestService';

export interface IRestServices {
  root: RestService;
}

export interface IApiServices {
  rest: IRestServices;
}

export interface ISuggestItem<T> {
  item: T;
  score: number;
}

export interface ISuggestResult<T> {
  query: string;
  total: number;
  result: ISuggestItem<T>[];
}
