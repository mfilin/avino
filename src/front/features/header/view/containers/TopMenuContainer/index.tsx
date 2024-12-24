import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { BottomHeaderBar, MiddleHeaderBar, PagesMenu } from '../../components';
import { IPageProps } from '../../../../../../types/portal/server';
import CatalogMenu from '../../components/CatalogMenu';
import BottomHeadMenuCatalog from '../../components/BottomHeadMenuCatalog';
import { SearchBarContext } from '../../../../../providers/SearchBarProvider/SearchBarContext';
import { ISearchBarControl } from '../../../../../providers/SearchBarProvider/namespace';
import MobileHeader from '../../components/MobileHeader/index';
import { useScrollDirection } from 'src/front/hooks/useScrollDirection';
import { useDeviceInfo } from '../../../../../hooks/device';

import styles from './TopMenuContainer.module.scss';
import { BodyControlContext } from '../../../../../providers/BodyControlProvider/BodyControlContext';
import WorkOnSiteDisclaimer from '../../../../../components/WorkOnSiteDisclaimer';

interface IOwnProps {
  pageProps: IPageProps;
}

const TopMenuContainer: React.FC<IOwnProps> = (props) => {
  const { pageProps } = props;
  const { isMobile } = useDeviceInfo();

  const router = useRouter();

  const { setScrollableMode } = React.useContext(BodyControlContext);

  const searchBarControl: ISearchBarControl =
    React.useContext(SearchBarContext);

  const [currentCategory] = router.query?.slug || [];

  const [isCatalogOpen, setCatalogOpen] = React.useState(false);
  const [selectedCatalog, setSelectedCatalog] = React.useState(null);
  const closeCatalog = React.useCallback(() => {
    setCatalogOpen(false);
  }, [setCatalogOpen]);

  const scrollToTop = useScrollDirection();

  const dropDownControl = React.useMemo(() => {
    let timer = null;
    const tout = 400;
    let isOpen = false;

    const clearTimer = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };

    return {
      show(catalog: string) {
        clearTimer();

        if (isOpen) {
          // Nothing to wait when open
          setSelectedCatalog(catalog);
        } else {
          timer = setTimeout(() => {
            setSelectedCatalog(catalog);
            setScrollableMode(false);
            isOpen = true;
          }, tout);
        }
      },
      hide() {
        clearTimer();

        setScrollableMode(true);
        setSelectedCatalog(null);
        isOpen = false;
      },
    };
  }, [setSelectedCatalog, setScrollableMode]);

  // console.log({
  //   pageProps,
  //   menu: pageProps.settings?.categories.menu
  // });

  const handleSearchBarEnter = React.useCallback(() => {
    searchBarControl.pushSearchRoute();
  }, [searchBarControl]);

  if (isMobile) {
    return (
      <>
        <WorkOnSiteDisclaimer isMobile={isMobile} />
        <MobileHeader
          catalog={pageProps.settings.categories['catalog']}
          defaultValue={router.query.query as string}
          onSearchBarEnter={handleSearchBarEnter}
        />
      </>
    );
  }

  return (
    <>
      <WorkOnSiteDisclaimer isMobile={isMobile} />
      <div className={styles.TopMenuContainer}>
        <div>
          <div>
            <PagesMenu items={pageProps.pages} />
          </div>
          <div className={styles.MiddleRow}>
            {/* Catalog hamburger menu / Search bar / basket here*/}
            <MiddleHeaderBar
              onChangeCatalogState={setCatalogOpen}
              isCatalogOpen={isCatalogOpen}
              defaultValue={router.query.query as string}
              onSearchBarEnter={handleSearchBarEnter}
            />
          </div>
        </div>
        <div
          onMouseLeave={dropDownControl.hide}
          className={clsx({ [styles.StickyBottomHeader]: scrollToTop })}
        >
          <div className={styles.BottomRow}>
            <CatalogMenu
              cache={pageProps.settings?.categories}
              onSelect={closeCatalog}
              isVisible={isCatalogOpen}
            />
            <BottomHeaderBar
              categories={pageProps.topMenuItems}
              currentCategory={currentCategory}
              onMouseEnter={dropDownControl.show}
              onClick={dropDownControl.hide}
            />
          </div>
          <div>
            <BottomHeadMenuCatalog
              menuCatalog={pageProps.settings?.categories.menu}
              selectedItem={selectedCatalog}
              // selectedItem={'wine-all'}
              popularProducts={pageProps.settings?.popular_products}
              onClickMenuItem={dropDownControl.hide}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TopMenuContainer;
