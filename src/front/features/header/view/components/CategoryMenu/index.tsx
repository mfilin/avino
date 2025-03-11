import React from 'react';
import clsx from 'clsx';
import memoize from 'fast-memoize';
import { IClientCatalog } from '../../../../../../types/portal/client';
import { CatalogIcon } from '../../../../../elements';
import CatalogBlocks from '../CatalogBlocks';
import RightBracket from '../../../../../images/right-bracket.svg';
import { TIcon } from '../../../../../elements/CatalogIcon';

import styles from './CategoryMenu.module.scss';

interface IOwnProps {
  cache: IClientCatalog;
  // onSelect(): void;
  // isVisible: boolean;
}
const catalogSlugOrdered = [
  'wine-all',
  'bubbles',
  'whisky',
  'cognac-all',
  'vodka-all',
  'spirits',
  'mixology',
  'drugie_napitki',
  'glass-all',
];

const CategoryMenu: React.FC<IOwnProps> = (props) => {
  const { cache } = props;

  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(
    catalogSlugOrdered[0],
  );

  const connectSlugSelector = React.useMemo(() => {
    return memoize((slug) => () => {
      setSelectedSlug(slug);
    });
  }, [setSelectedSlug]);

  return (
    <div className="nav__primary">
      <ul className="nav-menu">
        <li className="nav-menu__item" data-nav-parent>
          <a href="#" className="nav-menu__link">
            {/* prettier-ignore */}
            <span>Виски</span>
            <i>
              <svg
                className="ico-svg"
                viewBox="0 0 7 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use
                  xlinkHref="img/sprites/sprite.svg#nav_arrow"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                ></use>
              </svg>
            </i>
          </a>
          <div className="nav-menu__secondary">
            <ul className="nav-menu">
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  {/* prettier-ignore */}
                  <span>Белое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        {/* prettier-ignore */}
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        {/* prettier-ignore */}
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        {/* prettier-ignore */}
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        {/* prettier-ignore */}
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      {/* prettier-ignore */}
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  {/* prettier-ignore */}
                  <span>Красное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        {/* prettier-ignore */}
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        {/* prettier-ignore */}
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        {/* prettier-ignore */}
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        {/* prettier-ignore */}
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      {/* prettier-ignore */}
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  {/* prettier-ignore */}
                  <span>Розовое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        {/* prettier-ignore */}
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        {/* prettier-ignore */}
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        {/* prettier-ignore */}
                        <span>Инзолия</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      {/* prettier-ignore */}
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  {/* prettier-ignore */}
                  <span>Сухое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        {/* prettier-ignore */}
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        {/* prettier-ignore */}
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        {/* prettier-ignore */}
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  {/* prettier-ignore */}
                  <span>Полусухое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        {/* prettier-ignore */}
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        {/* prettier-ignore */}
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        {/* prettier-ignore */}
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        {/* prettier-ignore */}
                        <span>Инзолия</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      {/* prettier-ignore */}
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Полусладкое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  {/* prettier-ignore */}
                  <span>Сладкое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      {/* prettier-ignore */}
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                <a href="#" className="nav-menu__link">
                  {/* prettier-ignore */}
                  <span>Виноградное</span>
                  <i>
                    <svg
                      className="ico-svg"
                      viewBox="0 0 7 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <use
                        xlinkHref="img/sprites/sprite.svg#nav_arrow"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      ></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Плодовое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Ягодное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Крепленое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Игристое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Пленочное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <div className="nav-menu__button">
              <a href="#" className="btn btn-sm w-100 btn-primary">
                <span>Показать все</span>
              </a>
            </div>
          </div>
        </li>
        <li className="nav-menu__item" data-nav-parent>
          <a href="#" className="nav-menu__link">
            <span>Коньяк</span>
            <i>
              <svg
                className="ico-svg"
                viewBox="0 0 7 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use
                  xlinkHref="img/sprites/sprite.svg#nav_arrow"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                ></use>
              </svg>
            </i>
          </a>
          <div className="nav-menu__secondary">
            <ul className="nav-menu">
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Полусухое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Полусладкое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Сладкое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Виноградное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Плодовое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Ягодное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Крепленое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Игристое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Пленочное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <div className="nav-menu__button">
              <a href="#" className="btn btn-sm w-100 btn-primary">
                <span>Показать все</span>
              </a>
            </div>
          </div>
        </li>
        <li className="nav-menu__item" data-nav-parent>
          <a href="#" className="nav-menu__link">
            <span>Водка</span>
            <i>
              <svg
                className="ico-svg"
                viewBox="0 0 7 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use
                  xlinkHref="img/sprites/sprite.svg#nav_arrow"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                ></use>
              </svg>
            </i>
          </a>
          <div className="nav-menu__secondary">
            <ul className="nav-menu">
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Сладкое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Виноградное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Плодовое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Ягодное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Крепленое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Игристое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Пленочное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <div className="nav-menu__button">
              <a href="#" className="btn btn-sm w-100 btn-primary">
                <span>Показать все</span>
              </a>
            </div>
          </div>
        </li>
        <li className="nav-menu__item" data-nav-parent>
          <a href="#" className="nav-menu__link">
            <span>Вино</span>
            <i>
              <svg
                className="ico-svg"
                viewBox="0 0 7 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use
                  xlinkHref="img/sprites/sprite.svg#nav_arrow"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                ></use>
              </svg>
            </i>
          </a>
          <div className="nav-menu__secondary">
            <ul className="nav-menu">
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Белое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Красное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Розовое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Сухое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Полусухое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Полусладкое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Сладкое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Виноградное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Плодовое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Ягодное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Крепленое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Игристое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Пленочное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <div className="nav-menu__button">
              <a href="#" className="btn btn-sm w-100 btn-primary">
                <span>Показать все</span>
              </a>
            </div>
          </div>
        </li>
        <li className="nav-menu__item" data-nav-parent>
          <a href="#" className="nav-menu__link">
            <span>Шампанское</span>
            <i>
              <svg
                className="ico-svg"
                viewBox="0 0 7 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use
                  xlinkHref="img/sprites/sprite.svg#nav_arrow"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                ></use>
              </svg>
            </i>
          </a>
          <div className="nav-menu__secondary">
            <ul className="nav-menu">
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Белое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Красное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Розовое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Сухое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Виноградное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Плодовое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Ягодное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Крепленое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Игристое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Пленочное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <div className="nav-menu__button">
              <a href="#" className="btn btn-sm w-100 btn-primary">
                <span>Показать все</span>
              </a>
            </div>
          </div>
        </li>
        <li className="nav-menu__item" data-nav-parent>
          <a href="#" className="nav-menu__link">
            <span>Крепкие напитки</span>
            <i>
              <svg
                className="ico-svg"
                viewBox="0 0 7 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use
                  xlinkHref="img/sprites/sprite.svg#nav_arrow"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                ></use>
              </svg>
            </i>
          </a>
          <div className="nav-menu__secondary">
            <ul className="nav-menu">
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Плодовое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Ягодное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Крепленое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Игристое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Пленочное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <div className="nav-menu__button">
              <a href="#" className="btn btn-sm w-100 btn-primary">
                <span>Показать все</span>
              </a>
            </div>
          </div>
        </li>
        <li className="nav-menu__item" data-nav-parent>
          <a href="#" className="nav-menu__link">
            <span>Ликеры</span>
            <i>
              <svg
                className="ico-svg"
                viewBox="0 0 7 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use
                  xlinkHref="img/sprites/sprite.svg#nav_arrow"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                ></use>
              </svg>
            </i>
          </a>
          <div className="nav-menu__secondary">
            <ul className="nav-menu">
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Белое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Красное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Розовое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Сухое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Полусухое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Полусладкое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Сладкое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Виноградное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Плодовое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Ягодное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Крепленое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Игристое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Пленочное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <div className="nav-menu__button">
              <a href="#" className="btn btn-sm w-100 btn-primary">
                <span>Показать все</span>
              </a>
            </div>
          </div>
        </li>
        <li className="nav-menu__item" data-nav-parent>
          <a href="#" className="nav-menu__link">
            <span>Стекло и аксессуары</span>
            <i>
              <svg
                className="ico-svg"
                viewBox="0 0 7 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use
                  xlinkHref="img/sprites/sprite.svg#nav_arrow"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                ></use>
              </svg>
            </i>
          </a>
          <div className="nav-menu__secondary">
            <ul className="nav-menu">
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Полусухое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Полусладкое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Сладкое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Виноградное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Плодовое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Ягодное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Крепленое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Игристое</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-menu__item">
                {/* prettier-ignore */}
                <a href="#" className="nav-menu__link">
                  <span>Пленочное</span>
                  <i>
                    <svg className="ico-svg" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="img/sprites/sprite.svg#nav_arrow"
                           xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                    </svg>
                  </i>
                </a>
                <div className="nav-menu__secondary">
                  <ul className="nav-menu">
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Инзолия</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Мерло</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Рислинг</span>
                      </a>
                    </li>
                    <li className="nav-menu__item">
                      <a href="#" className="nav-menu__link">
                        <span>Шенен Блан</span>
                      </a>
                    </li>
                  </ul>
                  <div className="nav-menu__button">
                    <a href="#" className="btn btn-sm w-100 btn-primary">
                      <span>Показать все</span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <div className="nav-menu__button">
              <a href="#" className="btn btn-sm w-100 btn-primary">
                <span>Показать все</span>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CategoryMenu;
