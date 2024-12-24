import EventEmitter from 'events';
import { TOrderType } from '../../types/portal/client';
import { IStateChangeEvent } from '../../class/FiltersControl';

export type TFilterValue = number | boolean | string | string[];

export type TVirtualFilterMap = Map<string, Map<string, Set<TFilterValue>>>;

export type TCategoryFiltersTemplate<T = Set<TFilterValue>> = {
  [key: string]: Record<string, T>;
};

export interface IOrderControl {
  has(fields: string[]): boolean;
  getFieldTypes(fields: string[]): undefined | TOrderType | 'ascdesc';
  handlerSwitch(fields: string[]): () => void;
}

export interface IFiltersControl extends EventEmitter {
  addFilterValue(
    category: string,
    slug: string,
    value: TFilterValue,
    virtual?: boolean,
  ): void;
  deleteFilterValue(
    category: string,
    slug: string,
    value: TFilterValue,
    virtual?: boolean,
  ): void;
  clearCategory(category: string, slug: string): void;
  has(category: string, slug: string, value: TFilterValue): boolean;
  get(category: string, slug: string): Set<string> | undefined;
  getParents(category: string, slug: string, value: string): string[];
  getAllLevelsSelectedSlugs(category: string, addr: string): Set<string>;
  // on(event: string, listener: () => void);
  // on(event: 'onStateChange', listener: IStateChangeEvent): void;
  // on(eventName: string, handler: () => void): void;
  // off(eventName: string, handler: () => void): void;
  resetVirtualFilters(): void;
  resetOrderBy(fields: string[]): void;
  setOrderBy(fields: string[], type?: TOrderType): void;
  getOrderFields(): Set<string>;
  getFieldsOrderState(): Map<string, TOrderType>;
  hasOrderFields(...fields: string[]): void;
  getPage(): number;
  setPage(pageNum: number): void;
  push(apply?: boolean): void;
}
