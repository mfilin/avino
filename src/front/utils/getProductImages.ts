import { IProductMedia } from '../api/types/product';

export const getProductImages = (media: IProductMedia[] = []): string[] => {
  return media.map(
    (item) =>
      `https://vinogradnevinovat.ru/storage/${item.id}/${item.file_name}`,
  );
};
