import React from 'react';
import { Modal, ModalContent } from '@nextui-org/modal';
import { EModalType, IModalsControl } from '../../../namespace';
import { IPageProps } from '../../../../../../types/portal/server';
import CatalogFilterModalContent from '../CatalogFilterModalContent';
import CatalogFilterChooseCountryModalContent from '../CatalogFilterChooseCountryModalContent';

interface IOwnProps {
  controls: IModalsControl;
  pageProps: IPageProps;
}

const CatalogFilterModals: React.FC<IOwnProps> = (props) => {
  const { controls, pageProps } = props;

  const closeHandler = React.useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        controls.onModalClose();
      }
    },
    [controls],
  );

  return (
    <>
      <Modal
        isOpen={Boolean(controls.currentModal)}
        onOpenChange={closeHandler}
        size="lg"
      >
        <ModalContent>
          {(onClose) => {
            let categoryKey, addr;

            switch (controls.currentModal?.modalKey) {
              case EModalType.filter:
                // src/front/features/catalog/view/components/CatalogFilterBlocks/index.tsx:20
                [categoryKey, addr] = controls.currentModal!.argument;

                return (
                  <>
                    <CatalogFilterModalContent
                      catalog={
                        pageProps.settings?.categories?.filters[categoryKey]
                          ?.items[addr]
                      }
                      categoryKey={categoryKey}
                      addr={addr}
                      onClose={onClose}
                    />
                  </>
                );
              // return null;
              case EModalType.country:
                [categoryKey, addr] = controls.currentModal!.argument;
                const [slug, blockAddr]: [string, string] = addr;

                return (
                  <CatalogFilterChooseCountryModalContent
                    catalog={
                      pageProps.settings?.categories?.filters[categoryKey]
                        ?.items[blockAddr]
                    }
                    selectedSlug={slug}
                    categoryKey={categoryKey}
                    addr={blockAddr}
                    onClose={onClose}
                  />
                );
            }

            return null;
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CatalogFilterModals;
