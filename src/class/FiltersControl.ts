import EventEmitter from 'events';
import bind from 'bind-decorator';
import Router from 'next/router';

import { FiltersControlCache } from './FiltersControlCache';
import {
  IFiltersControl,
  TCategoryFiltersTemplate,
  TFilterValue,
} from '../front/types/filters';
import {
  IClientCatalog,
  IClientFiltersCatalog,
  TOrderType,
} from '../types/portal/client';
import { IPageProps } from '../types/portal/server';
import { routeSlugToArray } from '../front/utils/slug';

export interface IStateChangeEvent {
  category: string;
  slug?: string;
}

export class FiltersControl extends EventEmitter implements IFiltersControl {
  private static _instance: FiltersControl;
  public static createIfNotExists(
    filterSettings: IClientCatalog['filters'],
    srvQueryProps: IPageProps['queryProps'],
  ) {
    this._instance =
      this._instance || new FiltersControl(filterSettings, srvQueryProps);
  }
  public static get instance() {
    return this._instance;
  }

  public static forDecodedSlugs(
    decodedSlugs: Record<string, string | string[]>,
  ) {
    this._instance?.restoreForCatalog(decodedSlugs);
    return this.instance;
  }

  private control: FiltersControlCache;
  private currentCategory: string;
  private pushTaskExists: boolean = false;
  private isClient = Boolean(typeof window !== 'undefined');

  constructor(
    private filterSettings: IClientCatalog['filters'],
    private srvQueryProps: IPageProps['queryProps'],
  ) {
    super();
    const categoryFiltersTemplate: TCategoryFiltersTemplate = {};

    Object.entries(this.filterSettings || {}).forEach(
      ([categoryKey, category]: [string, IClientFiltersCatalog]) => {
        const collector = {};

        Object.keys(category.items).forEach((addr) => {
          collector[addr] = new Set();
        });

        categoryFiltersTemplate[categoryKey] = collector;
      },
    );

    const [order, orderDesc] = this.orderState;

    this.control = new FiltersControlCache(
      categoryFiltersTemplate,
      order,
      orderDesc,
    );

    Router.events.on('routeChangeComplete', this.routeChangeHandler);
  }

  private restoreForCatalog(decodedSlugs: Record<string, string | string[]>) {
    const [order, orderDesc] = this.orderState;

    this.currentCategory = this.routeCategory;
    this.control.clear();
    this.control.restoreForNewCategory(
      this.currentCategory,
      decodedSlugs,
      order,
      orderDesc,
    );
  }

  private get routeCategory() {
    return this.isClient ? routeSlugToArray(Router.query?.slug)[0] : undefined;
  }

  private get orderState(): string[][] {
    const { order = '', orderDesc = '' } = this.isClient
      ? Router.query
      : this.srvQueryProps;
    return [
      (order as string).split(',').filter(Boolean),
      (orderDesc as string).split(',').filter(Boolean),
    ];
  }

  @bind
  private routeChangeHandler(url: string, { shallow }) {
    this.currentCategory = this.routeCategory;
    this.emit('routeChangeComplete', {
      url,
      category: this.currentCategory,
      shallow,
    });
  }

  private pushTaskExecution(shallow: boolean) {
    const nextFilterStringValue = this.control.serialize(this.currentCategory);
    const pathPart = `/${this.currentCategory}${
      nextFilterStringValue ? `/${nextFilterStringValue}` : ''
    }`;
    const queryPart = new URLSearchParams(
      this.control.getQueryParams() as Record<string, string>,
    ).toString();

    console.log(
      `[pushTaskExecution] pathPart: ${pathPart} queryPart: ${queryPart}, shallow: ${shallow}`,
    );

    Router.push(`${pathPart}${queryPart ? `?${queryPart}` : ''}`, undefined, {
      scroll: false,
      shallow,
    });
  }

  push(apply?: boolean) {
    console.log('>>>> push pushTaskExists: ', this.pushTaskExists);
    if (this.pushTaskExists) return;
    this.pushTaskExists = true; // Mutex type route change

    // Only single task should be resolved in loop stack
    Promise.resolve().then(() => {
      console.log('[push]');
      this.pushTaskExecution(!apply);
      this.pushTaskExists = false;
    });
  }

  addFilterValue(
    category: string,
    slug: string,
    value: TFilterValue,
    virtual: boolean = false,
  ) {
    console.log('[addFilterValue]', { category, slug, value, virtual });
    this.control.addFilterValue(category, slug, value, virtual);
    if (!virtual) {
      this.push();
    }
    this.emit('onStateChange', { category, slug: value } as IStateChangeEvent);
  }

  deleteFilterValue(
    category: string,
    slug: string,
    value: TFilterValue,
    virtual: boolean = false,
  ) {
    console.log('[deleteFilterValue]', { category, slug, value, virtual });
    this.control.deleteFilterValue(category, slug, value, virtual);
    if (!virtual) {
      this.push();
    }
    this.emit('onStateChange', { category, slug: value } as IStateChangeEvent);
  }

  clearCategory(category: string, slug: string) {
    this.control.clearCategory(category, slug);
    this.push();
    this.emit('onStateChange', { category } as IStateChangeEvent);
  }

  has(category: string, slug: string, value: TFilterValue) {
    return this.control.has(category, slug, value);
  }

  get(category: string, slug: string) {
    return this.control.getCategoryFilters(category, slug);
  }

  getParents(category: string, slug: string, value: string): string[] {
    return (
      this.filterSettings[category]?.items[slug]?.items[value]?.parent || []
    );
  }

  getAllLevelsSelectedSlugs(category: string, addr: string): Set<string> {
    let res = new Set<string>();
    Array.from(this.get(category, addr)).forEach((slug) => {
      res = new Set([slug, ...res, ...this.getParents(category, addr, slug)]);
    });
    return res;
  }

  resetOrderBy(fields: string[]) {
    this.control.resetOrderBy(fields);
    this.push();
    this.emit('onOrderStateChange');
  }

  setOrderBy(fields: string[], type?: TOrderType) {
    this.control.setOrderBy(fields, type);
    this.push();
    this.emit('onOrderStateChange');
  }

  hasOrderFields(...fields: string[]) {
    return this.control.hasOrderFields(fields);
  }

  getOrderFields() {
    return this.control.getOrderFields();
  }

  getFieldsOrderState(): Map<string, TOrderType> {
    return this.control.getFieldsOrderState();
  }

  getPage() {
    return this.control.getPage();
  }

  setPage(pageNum: number) {
    this.control.setPage(pageNum);
    this.push();
  }

  resetVirtualFilters() {
    this.control.resetVirtualFilters();
  }
}
