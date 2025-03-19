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
        {catalogSlugOrdered.map((slug) => (
          <li
            key={slug}
            className={`nav-menu__item`}
            onClick={connectSlugSelector(slug)}
          >
            <a href="#" className="nav-menu__link">
              <span>{cache[slug]?.name || slug}</span>
              <i>
                <img src={RightBracket} alt="Arrow" />
              </i>
            </a>
            {selectedSlug === slug && (
              <div className="nav-menu__secondary">
                {cache[slug]?.children && (
                  <ul className="nav-menu">
                    {Object.keys(cache[slug].children).map((childSlug) => (
                      <li key={childSlug} className="nav-menu__item">
                        <a href="#" className="nav-menu__link">
                          <span>{cache[slug].children[childSlug].name}</span>
                          {cache[slug].children[childSlug].children && (
                            <i>
                              <img src={RightBracket} alt="Arrow" />
                            </i>
                          )}
                        </a>
                        {cache[slug].children[childSlug].children && (
                          <div className="nav-menu__secondary">
                            <ul className="nav-menu">
                              {Object.keys(
                                cache[slug].children[childSlug].children,
                              ).map((grandChildSlug) => (
                                <li
                                  key={grandChildSlug}
                                  className="nav-menu__item"
                                >
                                  <a href="#" className="nav-menu__link">
                                    <span>
                                      {
                                        cache[slug].children[childSlug]
                                          .children[grandChildSlug].name
                                      }
                                    </span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                            <div className="nav-menu__button">
                              <a
                                href="#"
                                className="btn btn-sm w-100 btn-primary"
                              >
                                <span>Показать все</span>
                              </a>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="nav-menu__button">
                  <a href="#" className="btn btn-sm w-100 btn-primary">
                    <span>Показать все</span>
                  </a>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;
