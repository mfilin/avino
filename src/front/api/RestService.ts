import axios, { AxiosError, AxiosInstance } from 'axios';
import bind from 'bind-decorator';

export default class RestService {
  private _instance: AxiosInstance;

  constructor(
    private _baseURL: string,
    private errorInterceptor?: (error: Error | AxiosError) => void,
  ) {
    this._instance = this.axiosInstance;
  }

  private get axiosInstance() {
    const instance = axios.create({
      baseURL: this._baseURL,
      withCredentials: true,
    });

    instance.interceptors.response.use(undefined, this.errorHandlerInterceptor);

    return instance;
  }

  public set baseURL(value: string) {
    this._baseURL = value;
    this._instance = this.axiosInstance;
  }

  public get baseURL() {
    return this._baseURL;
  }

  public get axios() {
    return this._instance;
  }

  @bind
  private async errorHandlerInterceptor(error: Error | AxiosError) {
    if (this.errorInterceptor) {
      return await this.errorInterceptor(error);
    }

    return Promise.reject(error);
  }
}
