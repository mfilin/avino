import React from 'react';
import { EModalType, ICurrentModal, IModalsControl } from '../namespace';

export function useModals(): [IModalsControl, ICurrentModal] {
  const [currentModal, setCurrentModal] = React.useState<ICurrentModal | null>(
    null,
  );

  const controls: IModalsControl = React.useMemo(() => {
    return {
      currentModal: null,
      showFilterModal(catalogKey: string, blockKey: string) {
        this.currentModal = {
          modalKey: EModalType.filter,
          argument: [catalogKey, blockKey],
        };
        setCurrentModal(this.currentModal);
      },
      showCountrySelectModal(catalogKey: string, blockKey: string | string) {
        this.currentModal = {
          modalKey: EModalType.country,
          argument: [catalogKey, blockKey],
        };
        setCurrentModal(this.currentModal);
      },
      onModalClose() {
        this.currentModal = null;
        setCurrentModal(this.currentModal);
      },
    };
  }, [setCurrentModal]);

  return [controls, currentModal];
}
