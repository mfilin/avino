import React from 'react';
import { Taxons } from '../../../../../../api/database/models/Taxons';
import Link, { LinkProps } from 'next/link';
import CatalogMenu from '../../components/CatalogMenu';
import styles from './TopNavListMenu.module.scss';
import CategoryMenu from '../CategoryMenu';
import { BodyControlContext } from '../../../../../providers/BodyControlProvider/BodyControlContext';

interface IOwnProps {
  categories: Taxons[];
  currentCategory?: string;
  onChangeCatalogState: (isOpen: boolean) => void;
  isCatalogOpen: boolean;
  defaultValue?: string;
}

const TopNavListMenu: React.FC<IOwnProps> = (props) => {
  const { isCatalogOpen, onChangeCatalogState, defaultValue } = props;
  const { setScrollableMode } = React.useContext(BodyControlContext);

  const handleHamburgerClick = React.useMemo(() => {
    let openedState = false;
    return () => {
      openedState = !openedState;
      onChangeCatalogState(openedState);
      setScrollableMode(!openedState);
    };
  }, [onChangeCatalogState, setScrollableMode]);

  return (
    <>
      <nav className="top-nav">
        <div className="container">
          <ul className="top-nav__menu">
            {/* prettier-ignore */}
            <li className="top-nav__item">
              <button type="button" className="nav-toggle" data-catalog-toggle onClick={handleHamburgerClick}>
                <i className="nav-toggle__icon"></i>
                <span className="nav-toggle__text">Каталог</span>
              </button>
            </li>
            {/* prettier-ignore */}
            <li className="top-nav__item">
              <Link href="/wine/" target="_blank">Вино</Link>
            </li>
            {/* prettier-ignore */}
            <li className="top-nav__item">
              <Link href="/bubbles/" target="_blank">Шампанское</Link>
            </li>
            {/* prettier-ignore */}
            <li className="top-nav__item">
              <Link href="/whisky/" target="_blank">Виски</Link>
            </li>
            {/* prettier-ignore */}
            <li className="top-nav__item">
              <Link href="/cognac/" target="_blank">Коньяк</Link>
            </li>
            {/* prettier-ignore */}
            <li className="top-nav__item">
              <Link href="/vodka/" target="_blank">Водка</Link>
            </li>
            {/* prettier-ignore */}
            <li className="top-nav__item">
              <Link href="/spirits/" target="_blank">Крепкие напитки</Link>
            </li>
            {/* prettier-ignore */}
            <li className="top-nav__item">
              <Link href="/mixology/" target="_blank">Ликеры</Link>
            </li>
            {/* prettier-ignore */}
            <li className="top-nav__item">
              <Link href="/drugie_napitki/" target="_blank">Прочее</Link>
            </li>
            {/* prettier-ignore */}
            <li className="top-nav__item">
              <Link href="/glass-all/" target="_blank">Стекло</Link>
            </li>
            {/* prettier-ignore */}
            <li className="top-nav__item">
              <Link href="/accessory/" target="_blank">Аксессуары</Link>
            </li>
            {/* prettier-ignore */}
            <li className="top-nav__item">
              <Link href="/promo/" target="_blank">Акции</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* <CatalogMenu
              cache={pageprops.settings?.categories}
              onselect={closecatalog}
              isvisible={iscatalogopen}
            /> */}

      <nav className="nav">
        <div className="container">
          <div className="nav__container">
            <div className="nav__main">
              <CategoryMenu cache={undefined} />
            </div>
            <div className="nav__media">
              <div className="nav__wrap">
                <div className="nav-item">
                  <div className="nav-item__media" data-nav-media>
                    <div className="nav-item__image">
                      <img
                        src="img/content/nav_media_item.png"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="nav-item__rating">
                    <div
                      className="rating"
                      data-rating="4.8"
                      data-rating-readonly="true"
                    >
                      <div className="rating__body">
                        <div className="rating__stars">
                          <div className="rating__star">
                            <svg
                              className="ico-svg"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use
                                xlinkHref="img/sprites/sprite.svg#star"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              ></use>
                            </svg>
                          </div>
                          <div className="rating__star">
                            <svg
                              className="ico-svg"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use
                                xlinkHref="img/sprites/sprite.svg#star"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              ></use>
                            </svg>
                          </div>
                          <div className="rating__star">
                            <svg
                              className="ico-svg"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use
                                xlinkHref="img/sprites/sprite.svg#star"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              ></use>
                            </svg>
                          </div>
                          <div className="rating__star">
                            <svg
                              className="ico-svg"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use
                                xlinkHref="img/sprites/sprite.svg#star"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              ></use>
                            </svg>
                          </div>
                          <div className="rating__star">
                            <svg
                              className="ico-svg"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use
                                xlinkHref="img/sprites/sprite.svg#star"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              ></use>
                            </svg>
                          </div>
                        </div>
                        <div className="rating__active" data-rating-active>
                          <div className="rating__star">
                            <svg
                              className="ico-svg"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use
                                xlinkHref="img/sprites/sprite.svg#star"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              ></use>
                            </svg>
                          </div>
                          <div className="rating__star">
                            <svg
                              className="ico-svg"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use
                                xlinkHref="img/sprites/sprite.svg#star"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              ></use>
                            </svg>
                          </div>
                          <div className="rating__star">
                            <svg
                              className="ico-svg"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use
                                xlinkHref="img/sprites/sprite.svg#star"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              ></use>
                            </svg>
                          </div>
                          <div className="rating__star">
                            <svg
                              className="ico-svg"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use
                                xlinkHref="img/sprites/sprite.svg#star"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              ></use>
                            </svg>
                          </div>
                          <div className="rating__star">
                            <svg
                              className="ico-svg"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use
                                xlinkHref="img/sprites/sprite.svg#star"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              ></use>
                            </svg>
                          </div>
                        </div>
                        <div className="rating__items">
                          <div
                            className="rating__item"
                            data-rating-item="5"
                          ></div>
                          <div
                            className="rating__item"
                            data-rating-item="4"
                          ></div>
                          <div
                            className="rating__item"
                            data-rating-item="3"
                          ></div>
                          <div
                            className="rating__item"
                            data-rating-item="2"
                          ></div>
                          <div
                            className="rating__item"
                            data-rating-item="1"
                          ></div>
                        </div>
                      </div>
                      <div className="rating__value">
                        <span data-rating-value>4.8</span> (23)
                      </div>
                    </div>
                  </div>
                  <div className="nav-item__title">
                    Белое вино "Peter Mertes" Alcoholfree White Sweet 0.75 л
                  </div>
                  <div className="nav-item__weight">800 мл</div>
                  <div className="nav-item__price">
                    <div className="nav-item__price-current">1140 р.</div>
                    <div className="nav-item__price-old">1200 р.</div>
                  </div>
                  <div className="nav-item__lead">
                    Неделя континентальной Австралии{' '}
                    <span className="color-orange">
                      до -30% на вина марки YALDARA
                    </span>
                  </div>
                  <a href="#" className="nav-item__link"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="nav-layout" data-catalog-toggle></div>
    </>
  );
};
export default TopNavListMenu;
