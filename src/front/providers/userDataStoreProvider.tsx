import React from 'react';
import { IProduct } from 'src/front/api/types/product';
import { IUserDataStore } from 'src/front/api/types/userData';
import UserDataStoreApi, {
  initialUserData,
} from 'src/front/api/UserDataStoreApi';

interface IUserDataContext {
  userData: IUserDataStore | undefined;
  updateCartWithProduct: (
    product: IProduct,
    count: number,
    changedInCart?: boolean,
  ) => void;
  removeFromRemovedList: (id: number) => void;
  moveFromCartToOrder: (discount: number, codeDiscount: number) => void;
  clearCart: () => void;
  handleConfirmIsAdult: () => void;
  clearLastAddedToCart: () => void;
}

const initialContext = {
  userData: initialUserData,
} as IUserDataContext;

const UserDataContext = React.createContext(initialContext);

const UserDataStoreProvider = ({ children }) => {
  const [userData, setUserData] = React.useState<IUserDataStore>(undefined);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserData(UserDataStoreApi.instance.getUserDataStore());
    }
  }, []);

  const updateCartWithProduct = React.useCallback(
    (product: IProduct, count: number, changedInCart?: boolean) => {
      setUserData(
        UserDataStoreApi.instance.updateCartWithProduct(
          product,
          count,
          changedInCart,
        ),
      );
    },
    [],
  );

  const removeFromRemovedList = React.useCallback((id: number) => {
    setUserData(UserDataStoreApi.instance.removeFromRemovedList(id));
  }, []);

  const clearCart = React.useCallback(() => {
    setUserData(UserDataStoreApi.instance.clearCart());
  }, []);

  const moveFromCartToOrder = React.useCallback(
    (discount: number, codeDiscount: number) => {
      setUserData(
        UserDataStoreApi.instance.moveFromCartToOrder(discount, codeDiscount),
      );
    },
    [],
  );

  const handleConfirmIsAdult = React.useCallback(() => {
    setUserData(UserDataStoreApi.instance.handleConfirmIsAdult());
  }, []);

  const clearLastAddedToCart = React.useCallback(() => {
    setUserData(UserDataStoreApi.instance.clearLastAddedToCart());
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        userData,
        updateCartWithProduct,
        removeFromRemovedList,
        clearCart,
        moveFromCartToOrder,
        handleConfirmIsAdult,
        clearLastAddedToCart,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataStoreProvider, UserDataContext };
