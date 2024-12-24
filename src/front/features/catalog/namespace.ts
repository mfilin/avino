export enum EModalType {
  filter,
  country,
}

export interface ICurrentModal {
  modalKey: EModalType;
  argument?: string | string[];
}

export interface IModalsControl {
  currentModal: ICurrentModal | null;
  showFilterModal(catalogKey: string, blockKey: string): void;
  showCountrySelectModal(catalogKey: string, blockKey: string | string[]): void;
  onModalClose(): void;
}

export type TCatalogListType = 'blocks' | 'hor-cards';
