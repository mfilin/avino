import bind from 'bind-decorator';
import { IApiServices } from '../types';
import { ICartRequestFullForm, ICartRequestShortForm } from '../types/cart';
import { routesMap } from '../routes';

export default class CartApi {
  constructor(private services: IApiServices) {}

  @bind
  async sendCartFull(form: ICartRequestFullForm) {
    const result = await this.services.rest.root.axios.post(
      routesMap.cart.fullForm(),
      form,
    );

    return result;
  }

  @bind
  async sendCartShort(form: ICartRequestShortForm) {
    const result = await this.services.rest.root.axios.post(
      routesMap.cart.shortForm(),
      form,
    );

    return result;
  }
}
