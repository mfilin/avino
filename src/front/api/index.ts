import EventEmitter from 'events';
import bind from 'bind-decorator';
import { default as axios, AxiosError } from 'axios';
import { IApiServices } from './types';
import RestService from './RestService';
import Config from '../config';
import { apiEvents } from './constants';
import ProductApi from './modules/ProductApi';
import PortalApi from './modules/PortalApi';
import LocalStorageApi from './LocalStorageApi';
import CartApi from './modules/CartApi';
import CacheApi from './modules/CacheApi';

export default class Api extends EventEmitter {
  private static _instance: Api;
  public static get instance() {
    return (this._instance = this._instance || new Api());
  }

  private services: IApiServices;
  public product: ProductApi;
  public portal: PortalApi;
  public cart: CartApi;
  public cache: CacheApi;
  public storage: LocalStorageApi;
  private _apiBaseURL: string;

  constructor() {
    super();

    // For server side use (base URL should work with localhost)
    this._apiBaseURL =
      typeof window === 'undefined'
        ? `http://127.0.0.1:${process.env.PORT}${Config.apiBaseURL}`
        : Config.apiBaseURL;

    this.services = {
      rest: {
        root: new RestService(this._apiBaseURL, this.responseErrorInterceptor),
      },
    };

    this.product = new ProductApi(this.services);
    this.portal = new PortalApi(this.services);
    this.cart = new CartApi(this.services);
    this.cache = new CacheApi(this.services);
    this.storage = new LocalStorageApi();
  }

  @bind
  private responseErrorInterceptor(error: Error | AxiosError) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        // Unauthorized request
        this.emit(apiEvents.unauthorized);
      }
      const errorObject = {
        message: `[axios] ${error.config.method.toUpperCase()} to ${
          error.config.url
        } failed due to ${error.message}`,
        data: error.response?.data,
      };
      // console.error(
      //   `[axios] ${error.config.method} to ${error.config.url} failed due to ${error.message}`,
      //   error.response.data,
      // );
      return Promise.reject(errorObject);
    }

    return Promise.reject(error);
  }

  public get apiBaseURL() {
    return this._apiBaseURL;
  }
}
