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

import styles from './HeaderContainer.module.scss';
import { BodyControlContext } from '../../../../../providers/BodyControlProvider/BodyControlContext';
import TopNavListMenu from '../../containers/TopNavListMenuContainer';
import WorkOnSiteDisclaimer from '../../../../../components/WorkOnSiteDisclaimer';
import TopMenuContainer from '../TopMenuContainer';
import TopNavListMenuContainer from '../../containers/TopNavListMenuContainer';

interface IOwnProps {
  pageProps: IPageProps;
}

const HeaderContainer: React.FC<IOwnProps> = (props) => {
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

  const handleCatalogToggle = React.useCallback(
    (isOpen: boolean) => {
      setCatalogOpen(isOpen);
      setScrollableMode(!isOpen); // Disable scrolling when catalog is open

      if (isOpen) {
        document.body.classList.add('nav-open');
      } else {
        document.body.classList.remove('nav-open');
      }
    },
    [setScrollableMode],
  );

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
      <header className="header">
        <div className="container">
          <div className="header__row">
            <div className="header__group header__group--left">
              <button type="button" className="header-burger" data-nav-toggle>
                <svg
                  className="ico-svg"
                  viewBox="0 0 20 18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use
                    xlinkHref="img/sprites/sprite.svg#header_burger"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  ></use>
                </svg>
              </button>
              <button type="button" className="header-search header-search--sm">
                <i>
                  <svg
                    className="ico-svg"
                    viewBox="0 0 20 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use
                      xlinkHref="img/sprites/sprite.svg#header_search"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    ></use>
                  </svg>
                </i>
              </button>
              <div className="header-contact">
                <div className="header-contact__icon">
                  <svg
                    className="ico-svg"
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use
                      xlinkHref="img/sprites/sprite.svg#header_pin"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    ></use>
                  </svg>
                </div>
                <div className="header-contact__main">
                  <div className="header-contact__title">
                    Самовывоз из магазина:
                  </div>
                  <div className="header-contact__content">
                    <div className="header-contact__address">
                      г. Москва, Ленинградский пр-т, 48
                    </div>
                    <div className="header-contact__divider"></div>
                    <a className="header-contact__phone" href="tel:84957897117">
                      8 (495) 789-71-17
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <a href="/" className="header__logo header-logo">
              <svg
                className="img-fluid"
                viewBox="0 0 200 44"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M157.036 35.4596V41.6176H155.699V35.4596H152.923V34.1473H159.811V35.4596H157.036ZM145.993 38.6323C145.489 38.3006 144.9 38.1276 144.296 38.142C143.491 38.142 142.685 38.517 142.685 39.3678C142.685 40.2187 143.174 40.5504 144.037 40.5504C144.799 40.5504 145.533 40.1899 145.993 39.5842V38.6323ZM145.993 41.5455V40.5792C145.403 41.3003 144.512 41.7041 143.563 41.6609C142.369 41.733 141.334 40.8388 141.262 39.6563C141.262 39.5553 141.262 39.4544 141.262 39.339C141.262 37.8392 142.47 36.945 144.109 36.945C144.77 36.9306 145.418 37.0892 145.993 37.4209C145.993 36.0221 145.763 35.0558 144.282 35.0558C143.548 35.0414 142.829 35.2433 142.211 35.6038L141.851 34.6232C142.614 34.1617 143.476 33.9021 144.368 33.9021C146.525 33.9021 147.272 35.027 147.272 36.9018V41.5022H145.993V41.5455ZM131.973 35.1712C131.369 35.1712 130.823 35.2 130.492 35.2145V37.4498H132.189C133.066 37.4498 133.698 37.0172 133.698 36.2817C133.713 35.5462 132.965 35.1712 131.973 35.1712ZM130.492 40.5071C130.895 40.5071 131.427 40.5071 132.016 40.5071C133.253 40.5071 133.943 40.1033 133.943 39.3246C133.943 38.5458 133.296 38.1709 132.074 38.1709L130.492 38.2141V40.5071V40.5071ZM133.627 37.7959C134.834 38.0122 135.381 38.6179 135.381 39.5553C135.381 40.9686 134.259 41.733 131.915 41.733C130.981 41.733 129.845 41.733 129.14 41.733V34.1473C129.787 34.1473 130.794 34.1473 131.887 34.1473C134 34.1473 135.151 34.7386 135.151 36.0798C135.151 36.9595 134.504 37.6949 133.627 37.7959ZM118.816 35.2C117.335 35.3154 116.213 36.5989 116.328 38.0699C116.429 39.3823 117.479 40.435 118.816 40.536C120.297 40.4206 121.419 39.1371 121.304 37.6661C121.203 36.3393 120.153 35.301 118.816 35.2ZM118.672 41.7906C116.515 41.7474 114.79 40.0024 114.79 37.868C114.718 35.7769 116.357 34.0175 118.471 33.9454C118.586 33.9454 118.701 33.9454 118.83 33.9454C121.016 33.9886 122.756 35.7769 122.713 37.9401C122.655 40.1033 120.858 41.8339 118.672 41.7906ZM107.169 41.6609V38.4593H102.97V41.632H101.561V34.1184H102.913V37.1902H107.169V34.1473H108.506V41.6609H107.169V41.6609ZM93.4799 41.632V36.0653L89.1086 41.632H87.7714V34.1328H89.1086V39.6995L93.4799 34.1328H94.8316V41.632H93.4799ZM77.936 35.1712C77.3034 35.1712 76.7857 35.2 76.455 35.2145V37.4498H78.1517C79.0432 37.4498 79.6615 37.0172 79.6615 36.2817C79.6615 35.5462 78.9138 35.1712 77.936 35.1712ZM76.455 40.5071C76.872 40.5071 77.3896 40.5071 77.9648 40.5071C79.2014 40.5071 79.906 40.1033 79.906 39.3246C79.906 38.5458 79.2446 38.1709 78.0367 38.1709L76.4406 38.2141V40.5071H76.455ZM79.5896 37.7959C80.7831 38.0122 81.3439 38.6179 81.3439 39.5553C81.3439 40.9686 80.2223 41.733 77.8641 41.733C76.9295 41.733 75.7935 41.733 75.1033 41.733L75.1177 34.1473C75.7648 34.1473 76.7569 34.1473 77.8498 34.1473C79.9779 34.1473 81.1138 34.7386 81.1138 36.0798C81.1282 36.9595 80.4668 37.6949 79.5896 37.7959ZM57.3738 35.2145C57.3019 35.2145 57.23 35.2145 57.1725 35.2145C55.979 35.1568 54.9437 36.0365 54.8143 37.219H59.3581C59.3725 36.1374 58.481 35.2289 57.3738 35.2145ZM60.7098 38.2718H54.8862C54.9437 39.5986 56.0797 40.6225 57.417 40.5648C57.4745 40.5648 57.5463 40.5504 57.6039 40.5504C58.4522 40.5792 59.2719 40.3052 59.9189 39.7716L60.264 40.8244C59.4732 41.4734 58.4666 41.8195 57.4313 41.8051C55.3607 41.9637 53.5489 40.435 53.3908 38.3872C53.3764 38.2285 53.3764 38.0699 53.3908 37.9113C53.247 35.8778 54.7999 34.104 56.8418 33.9598C56.9855 33.9454 57.1294 33.9454 57.2732 33.9598C59.1425 33.8877 60.7098 35.3298 60.7817 37.1902C60.7817 37.2623 60.7817 37.3344 60.7817 37.4065C60.7817 37.6805 60.7529 37.9834 60.7098 38.2718ZM45.741 41.6609V38.4593H41.5423V41.632H40.2051V34.1184H41.5423V37.1902H45.741V34.1473H47.0927V41.6609H45.741V41.6609Z"
                  className="header-logo__slogan"
                />
                <path
                  d="M191.66 6.16837H187.001L186.656 10.0045C186.426 13.1772 185.592 16.2634 184.197 19.1333H191.66V6.16837ZM195.097 27.9448V23.9933H180.89V27.9448H175.987V19.1333H178.446C179.352 17.9796 181.48 13.2782 181.753 5.83668L181.954 1.33717H196.894V19.1333H200V27.9448H195.097ZM160.486 8.01432L157.912 14.4319H163.046L160.486 8.01432ZM166.899 23.9933L165.001 19.2342H155.913L154.015 23.9933H148.767L158.286 1.30834H162.974L172.493 23.9933H166.899ZM137.638 6.18278C137.005 6.11068 136.43 6.13953 135.394 6.16837V11.4178C136.185 11.5187 136.976 11.5764 137.781 11.5908C139.277 11.7639 140.628 10.6967 140.801 9.2113C140.815 9.08151 140.815 8.93728 140.815 8.79307C140.801 6.8029 139.492 6.18278 137.638 6.18278ZM137.94 16.3788C137.091 16.3932 136.243 16.3499 135.394 16.2778V23.9933H130.146V1.30834C131.44 1.30834 135.394 1.30834 137.149 1.30834C144.123 1.30834 146.409 4.89927 146.409 8.82191C146.409 12.7301 143.245 16.3788 137.94 16.3788ZM115.551 6.16837V23.9933H110.317V1.30834H123.402V6.16837H115.551ZM91.1784 5.66361C87.5261 5.41844 84.3626 8.15854 84.1182 11.7639C84.1038 12.0523 84.1038 12.3552 84.1182 12.6436C84.0032 16.3211 86.9078 19.3929 90.6176 19.5082C90.6608 19.5082 90.6895 19.5082 90.7326 19.5082C95.1039 19.5082 97.3471 16.5086 97.3471 12.6436C97.5915 9.03825 94.8307 5.90877 91.1784 5.66361ZM91.4228 24.3971C91.1928 24.3971 90.9627 24.3971 90.7326 24.3827C83.7587 24.3827 78.611 19.8832 78.611 12.658C78.4672 6.31258 83.5574 1.04876 89.9705 0.904541C90.2294 0.904541 90.4882 0.904533 90.747 0.918955C97.7209 0.918955 102.869 5.41845 102.869 12.658C102.969 19.0179 97.8503 24.2817 91.4228 24.3971ZM65.9142 23.9933V14.8501H57.5886V23.9933H52.3259V1.30834H57.5886V10.0045H65.9285V1.30834H71.2345V23.9933H65.9142ZM38.0617 23.9933V9.91796L27.9244 24.0222L23.3518 23.9933V1.30834H28.5858V15.4125L38.7232 1.30834H43.2669V23.9933H38.0617ZM7.26151 14.8213H5.23404V19.0756C5.80921 19.2342 6.41311 19.2919 7.00265 19.2631C9.03012 19.2631 10.0367 18.3978 10.0367 16.8547C10.0367 15.326 8.97263 14.8213 7.26151 14.8213ZM6.8589 6.03858C6.31249 6.053 5.76606 6.09626 5.21965 6.16837V10.2785H6.95952C8.29678 10.2785 9.3896 9.73046 9.3896 8.07199C9.3896 6.7308 8.15302 6.03858 6.8589 6.03858ZM12.0066 11.8793C14.1347 12.7157 15.4576 14.8212 15.2851 17.071C15.2851 21.8301 11.5609 24.0654 6.58569 24.0654C4.38567 24.0654 1.33726 24.0654 0 23.8635V1.3516C1.27975 1.29392 4.45757 1.16412 6.94517 1.16412C12.4093 1.16412 14.6236 3.65904 14.6236 6.80292C14.7531 8.85077 13.7465 10.7976 12.0066 11.8793Z"
                  className="header-logo__name"
                />
              </svg>
            </a>
            <div className="header__group header__group--right">
              <button type="button" className="header-search header-search--xl">
                <i>
                  <svg
                    className="ico-svg"
                    viewBox="0 0 20 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use
                      xlinkHref="img/sprites/sprite.svg#header_search"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    ></use>
                  </svg>
                </i>
              </button>
              <a href="#" className="header-favorite">
                <i>
                  <svg
                    className="ico-svg"
                    viewBox="0 0 21 19"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use
                      xlinkHref="img/sprites/sprite.svg#header_heart"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    ></use>
                  </svg>
                </i>
              </a>
              <a href="#" className="header-auth">
                <i>
                  <svg
                    className="ico-svg"
                    viewBox="0 0 20 21"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use
                      xlinkHref="img/sprites/sprite.svg#header_user"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    ></use>
                  </svg>
                </i>
              </a>
              <a href="#" className="header-cart">
                <i className="header-cart__icon">
                  <svg
                    className="ico-svg"
                    viewBox="0 0 20 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use
                      xlinkHref="img/sprites/sprite.svg#header_bag"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    ></use>
                  </svg>
                </i>
                <span className="header-cart__counter">0</span>
              </a>
            </div>
          </div>
        </div>
      </header>
      <div className="header-trigger"></div>
      <TopNavListMenuContainer
        pageProps={pageProps}
        categories={pageProps.topMenuItems}
        currentCategory={currentCategory}
        onChangeCatalogState={handleCatalogToggle}
        isCatalogOpen={isCatalogOpen}
      />
    </>
  );
};

export default HeaderContainer;
