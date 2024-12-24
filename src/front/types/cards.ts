import { IProduct } from '../api/types/product';

export interface IDefaultCardProps {
  productInfo: IProduct;
  noButtonsMode?: boolean;
  onBuyNow?: (product: IProduct) => void;
  onAddToCart?: (product: IProduct, count: number) => void;
  onAddToComparison?: (product: IProduct) => void;
  onAddToFavorite?: (product: IProduct) => void;
}

export enum EAvailabilityStatuses {
  available = 'available',
  unavailable = 'unavailable',
}
