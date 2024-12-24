import EventEmitter from 'events';
import { TOrderType } from '../types/portal/client';
import {
  TCategoryFiltersTemplate,
  TFilterValue,
  TVirtualFilterMap,
} from '../front/types/filters';
import { FILTERS_JOIN_KEY } from '../const';

export class FiltersControlCache extends EventEmitter {
  private categoryFilters: TCategoryFiltersTemplate;
  private addedVirtualFilters: TVirtualFilterMap = new Map();
  private removedVirtualFilters: TVirtualFilterMap = new Map();
  private page: number = 1;
  private orderBy: Set<string> = new Set();
  private orderByDesc: Set<string> = new Set();

  constructor(
    private categoryFiltersTemplate: TCategoryFiltersTemplate,
    orderBy: string[],
    orderByDesc: string[],
  ) {
    super();
    this.orderBy = new Set(orderBy);
    this.orderByDesc = new Set(orderByDesc);
    this.categoryFilters = {};
  }

  public restoreForNewCategory(
    category: string,
    startupSlugs: Record<string, string | string[]>,
    orderBy: string[] = [],
    orderByDesc: string[] = [],
  ) {
    this.orderBy = new Set(orderBy);
    this.orderByDesc = new Set(orderByDesc);
    this.categoryFilters = {};
    this.restoreFiltersFromTemplate({ [category]: startupSlugs }); // empty filters
  }

  // А как потом из строки поиска включить чекбокс?
  public addFilterValue(
    category: string,
    slug: string,
    value: TFilterValue,
    virtual: boolean = false,
  ) {
    this.categoryFilters[category]?.[slug]?.add(value);
    if (virtual) {
      this.putVirtualFilterValue(category, slug, value);
    }
    this.emit('onAddFilterValue', category, slug, value);
    this.emit('onStateChange');
  }

  private putVirtualFilterValue(
    category: string,
    slug: string,
    value: TFilterValue,
  ) {
    let slugMap = this.addedVirtualFilters.get(category);
    if (!slugMap) {
      slugMap = new Map();
      this.addedVirtualFilters.set(category, slugMap);
    }
    let valueSet = slugMap.get(slug);
    if (!valueSet) {
      valueSet = new Set();
      slugMap.set(slug, valueSet);
    }

    valueSet.add(value);
  }

  private removeVirtualFilterValue(
    category: string,
    slug: string,
    value: TFilterValue,
  ) {
    let slugMap = this.removedVirtualFilters.get(category);
    if (!slugMap) {
      slugMap = new Map();
      this.removedVirtualFilters.set(category, slugMap);
    }
    let valueSet = slugMap.get(slug);
    if (!valueSet) {
      valueSet = new Set();
      slugMap.set(slug, valueSet);
    }

    valueSet.add(value);
  }

  public deleteFilterValue(
    category: string,
    slug: string,
    value: TFilterValue,
    virtual: boolean = false,
  ) {
    this.categoryFilters[category]?.[slug]?.delete(value);
    if (virtual) {
      this.removeVirtualFilterValue(category, slug, value);
    }
    this.emit('onRemoveFilterValue', category, slug, value);
    this.emit('onStateChange');
  }

  public resetVirtualFilters() {
    for (const [categoryKey, slugMap] of this.addedVirtualFilters.entries()) {
      for (const [slugKey, valueSet] of slugMap.entries()) {
        for (const value of valueSet.values()) {
          this.deleteFilterValue(categoryKey, slugKey, value);
        }
      }
    }

    for (const [categoryKey, slugMap] of this.removedVirtualFilters.entries()) {
      for (const [slugKey, valueSet] of slugMap.entries()) {
        for (const value of valueSet.values()) {
          this.addFilterValue(categoryKey, slugKey, value);
        }
      }
    }

    this.addedVirtualFilters.clear();
  }

  public clearVirtualCategory(category: string, slug: string) {
    this.addedVirtualFilters.get(category)?.get(slug)?.clear();
    this.removedVirtualFilters.get(category)?.get(slug)?.clear();
  }

  public clearCategory(category: string, slug: string) {
    this.categoryFilters[category]?.[slug]?.clear();
    this.clearVirtualCategory(category, slug);
    this.emit('onClearCategory', category);
    this.emit('onStateChange');
  }

  public clear() {
    this.orderByDesc = new Set();
    this.orderBy = new Set();
  }

  public getPage() {
    return this.page;
  }

  public setPage(page: number) {
    this.page = page;
  }

  public resetOrderBy(fields: string[]) {
    let currentOrderType: TOrderType | undefined = undefined;

    fields.forEach((field) => {
      if (this.orderBy.has(field)) currentOrderType = 'asc';
      else if (this.orderByDesc.has(field)) currentOrderType = 'desc';
    });

    this.orderBy.clear();
    this.orderByDesc.clear();

    let nextState = undefined;
    let storeSet = undefined;
    switch (currentOrderType) {
      case 'asc':
        nextState = 'desc';
        storeSet = this.orderByDesc;
        break;
      case 'desc':
        nextState = undefined;
        break;
      default:
        nextState = 'asc';
        storeSet = this.orderBy;
    }

    if (nextState) {
      fields.forEach((field) => {
        storeSet.add(field);
      });
    }
  }

  /**
   * Switch between query products ordering
   * @param {string[]} fields
   * @param {"asc" | "desc"} orderType
   */
  public setOrderBy(
    fields: string[] = [],
    orderType: TOrderType | undefined = undefined,
  ) {
    switch (orderType) {
      case undefined:
        fields.forEach((field) => {
          this.orderByDesc.delete(field);
          this.orderBy.delete(field);
        });
        break;
      case 'asc':
        fields.forEach((field) => {
          this.orderByDesc.delete(field);
          if (this.orderBy.has(field)) {
            this.orderBy.delete(field);
          } else {
            this.orderBy.add(field);
          }
        });
        break;
      default: // desc
        fields.forEach((field) => {
          this.orderBy.delete(field);
          if (this.orderByDesc.has(field)) {
            this.orderByDesc.delete(field);
          } else {
            this.orderByDesc.add(field);
          }
        });
    }
  }

  public hasOrderFields(fields: string[] = []): boolean {
    for (const field of fields) {
      if (!this.orderBy.has(field) && !this.orderByDesc.has(field))
        return false;
    }

    return true;
  }

  public getOrderFields(): Set<string> {
    return this.orderBy;
  }

  public getFieldsOrderState(): Map<string, TOrderType> {
    const res: Map<string, TOrderType> = new Map();
    for (const field of this.orderBy) {
      res.set(field, 'asc');
    }
    for (const field of this.orderByDesc) {
      res.set(field, 'desc');
    }
    return res;
  }

  public has(category: string, slug: string, value: TFilterValue) {
    return Boolean(this.categoryFilters[category]?.[slug]?.has(value));
  }

  public getCategoryFilters(
    category: string,
    slug: string,
  ): Set<string> | undefined {
    return this.categoryFilters[category]?.[slug] as Set<string>;
  }

  public serialize(category: string) {
    console.log(
      'this.categoryFilters[category]:  ',
      this.categoryFilters[category],
    );
    if (this.categoryFilters.hasOwnProperty(category)) {
      const buf = Object.values(this.categoryFilters[category])
        .map((set) => Array.from(set))
        .filter((arr) => arr.length)
        .map((arr) => arr.join(FILTERS_JOIN_KEY))
        .flat();
      return buf.join('/');
    }

    return '';
  }

  public getQueryParams(): Record<string, string> {
    const res: Record<string, string> = {};
    if (this.page > 1) {
      res['page'] = String(this.page);
    }
    if (this.orderBy.size) {
      res['order'] = Array.from(this.orderBy).join(',');
    }
    if (this.orderByDesc.size) {
      res['orderDesc'] = Array.from(this.orderByDesc).join(',');
    }

    return res;
  }

  public restoreFiltersFromTemplate(
    newInstance?: TCategoryFiltersTemplate<string | string[]>,
  ) {
    for (const categoryKey in this.categoryFiltersTemplate) {
      const collector = this.categoryFiltersTemplate[categoryKey];
      (this.categoryFilters as any)[categoryKey] =
        this.categoryFilters[categoryKey] || {};
      for (const addr in collector) {
        this.categoryFilters[categoryKey][addr] = new Set(
          newInstance?.[categoryKey]?.[addr] || [],
        );
      }
    }
  }
}
