import bind from 'bind-decorator';
import Api from '.';
import { IUserDataStore } from './types/userData';
import { IProduct } from './types/product';

export const initialUserData = {
  favorite: [],
  comparison: [],
  cart: [],
  removedFromCart: [],
  orders: [],
  order: null,
  adultConfirmed: undefined,
};

export default class UserDataStoreApi {
  private static _instance: UserDataStoreApi;
  public _userData: IUserDataStore = initialUserData;
  public static get instance() {
    return (this._instance = this._instance || new UserDataStoreApi());
  }
  @bind
  getUserDataStore(): IUserDataStore {
    const newStorage = Api.instance.storage.get('userDataStore');
    const parsed = JSON.parse(newStorage) || initialUserData;
    if (!newStorage) {
      this.setUserDataStore(initialUserData);
    }
    return parsed;
  }

  @bind
  private setUserDataStore(userData: IUserDataStore) {
    Api.instance.storage.set('userDataStore', JSON.stringify(userData));
  }

  @bind
  updateCartWithProduct(
    product: IProduct,
    count: number,
    changedInCart = false,
  ): IUserDataStore {
    const prevUserData = this.getUserDataStore();
    let newUserData = { ...prevUserData };
    if (count === 0) {
      let newRemovedFromCartList = newUserData.removedFromCart;
      if (
        changedInCart &&
        !newUserData.removedFromCart.some((item) => item.id === product.id)
      ) {
        newRemovedFromCartList = [...newUserData.removedFromCart, product];
      }
      newUserData = {
        ...newUserData,
        cart: newUserData.cart.filter((item) => item.id !== product.id),
        removedFromCart: newRemovedFromCartList,
      };
    } else {
      const productToUpdateIdx = newUserData.cart.findIndex(
        (item) => item.id === product.id,
      );
      if (productToUpdateIdx >= 0) {
        newUserData.cart[productToUpdateIdx].count_in_cart = count;
      } else {
        newUserData.cart.push({ ...product, count_in_cart: 1 });
      }
      newUserData = {
        ...newUserData,
        cart: newUserData.cart,
        lastAddedToCart: product,
        removedFromCart: newUserData.removedFromCart.some(
          (item) => item.id === product.id,
        )
          ? newUserData.removedFromCart.filter((item) => item.id !== product.id)
          : newUserData.removedFromCart,
      };
    }
    this._userData = newUserData;
    this.setUserDataStore(newUserData);
    return newUserData;
  }

  @bind
  removeFromRemovedList(id: number): IUserDataStore {
    const prevUserData = this.getUserDataStore();
    const newUserData = {
      ...prevUserData,
      removedFromCart: prevUserData.removedFromCart.filter(
        (item) => item.id !== id,
      ),
    };
    this.setUserDataStore(newUserData);
    return newUserData;
  }

  @bind
  clearCart(): IUserDataStore {
    const prevUserData = this.getUserDataStore();
    const newUserData = {
      ...prevUserData,
      cart: [],
    };
    this.setUserDataStore(newUserData);
    return newUserData;
  }

  @bind
  moveFromCartToOrder(discount: number, codeDiscount: number): IUserDataStore {
    const prevUserData = this.getUserDataStore();
    const newUserData = {
      ...prevUserData,
      order: { discount, codeDiscount, products: prevUserData.cart },
    };
    this.setUserDataStore(newUserData);
    return newUserData;
  }

  @bind
  handleConfirmIsAdult(): IUserDataStore {
    const prevUserData = this.getUserDataStore();
    const newUserData = {
      ...prevUserData,
      adultConfirmed: true,
    };
    this.setUserDataStore(newUserData);
    return newUserData;
  }
  @bind
  clearLastAddedToCart(): IUserDataStore {
    const prevUserData = this.getUserDataStore();
    const newUserData = {
      ...prevUserData,
      lastAddedToCart: undefined,
    };
    console.log('newUserData', newUserData);
    this.setUserDataStore(newUserData);
    return newUserData;
  }
}
