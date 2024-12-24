import { IProduct } from '../api/types/product';
import { IUserDataStore } from '../api/types/userData';

export const getCheckedProductsByStorage = (
  products: IProduct[],
  userData: IUserDataStore,
) => {
  return (products || []).map((item) => {
    const inFavorite = userData?.favorite.some(
      (product) => product.id === item.id,
    );
    const inComparison = userData?.comparison.some(
      (product) => product.id === item.id,
    );
    const inCartCount = userData?.cart.find(
      (product) => product.id === item.id,
    )?.count_in_cart;
    return {
      ...item,
      in_favorite: inFavorite,
      in_comparison: inComparison,
      count_in_cart: inCartCount,
    };
  });
};
