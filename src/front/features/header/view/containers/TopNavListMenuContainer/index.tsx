import React from 'react';
import Link, { LinkProps } from 'next/link';
import CategoryMenu from '../../components/CategoryMenu';
import { IPageProps } from '../../../../../../types/portal/server';

import styles from './TopNavListMenuContainer.module.scss';
import { Taxons } from 'src/api/database/models/Taxons';

interface IOwnProps {
  pageProps: IPageProps;
  categories: Taxons[];
  currentCategory: string;
  onChangeCatalogState(boolean): void;
  isCatalogOpen: boolean;
}

const TopNavListMenuContainer: React.FC<IOwnProps> = (props) => {
  const { pageProps } = props;

  function closecatalog(): void {
    console.log('Function not implemented.');
  }

  return (
    <>
      <nav className="top-nav">
        <div className="container">
          <ul className="top-nav__menu">
            <li className="top-nav__item">
              <button type="button" className="nav-toggle" data-catalog-toggle>
                <i className="nav-toggle__icon"></i>
                <span className="nav-toggle__text">Каталог</span>
              </button>
            </li>
            {[
              { url: '/wine', linkText: 'Вино' },
              { url: '/bubbles', linkText: 'Шампанское' },
              { url: '/whisky', linkText: 'Виски' },
              { url: '/cognac', linkText: 'Коньяк' },
              { url: '/vodka', linkText: 'Водка' },
              { url: '/spirits', linkText: 'Крепкие напитки' },
              { url: '/mixology', linkText: 'Ликеры' },
              { url: '/drugie_napitki', linkText: 'Прочее' },
              { url: '/glass-all', linkText: 'Стекло' },
              { url: '/accessory', linkText: 'Аксессуары' },
              { url: '/promo', linkText: 'Акции' },
            ].map((item, index) => (
              <li className="top-nav__item" key={index}>
                <Link href={item.url} target="_blank">
                  {item.linkText}
                </Link>
              </li>
            ))}
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
              <CategoryMenu
                cache={pageProps.settings?.categories}
                onSelect={closecatalog}
                isVisible={props.isCatalogOpen}
              />
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
export default TopNavListMenuContainer;
