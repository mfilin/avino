import bind from 'bind-decorator';
import { IApiServices } from '../types';
import { routesMap } from '../routes';

export default class CacheApi {
  constructor(private services: IApiServices) {}

  @bind
  async loadStatus() {
    const response = await fetch(
      new URL(routesMap.cache.status(), this.services.rest.root.baseURL).href,
      {
        next: { tags: ['status'] },
      },
    );
    try {
      const json = await response.json();
      console.log('json: ', json);
    } catch (error) {
      console.error(error);
    }
  }
}
