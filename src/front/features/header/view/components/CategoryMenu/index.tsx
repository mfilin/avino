import React from 'react';
import clsx from 'clsx';
import memoize from 'fast-memoize';
import { IClientCatalog } from '../../../../../../types/portal/client';
import RightBracket from '../../../../../images/right-bracket.svg';
import { getCategoryURL } from '../../../../../utils/category';

import styles from './CategoryMenu.module.scss';

interface IOwnProps {
  cache: IClientCatalog;
  onSelect(): void;
  isVisible: boolean;
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
  const { cache, isVisible, onSelect } = props;

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
        {catalogSlugOrdered.map((code) => {
          const item = cache?.catalog[code];
          console.log(cache?.catalog['cognac-all']);
          return (
            <li
              key={code}
              className={`nav-menu__item`}
              onClick={connectSlugSelector(code)}
            >
              <a href="#" className="nav-menu__link">
                <span>{item?.label || code}</span>
                <i>
                  <img src={RightBracket} alt="Arrow" />
                </i>
              </a>
              <div className="nav-menu__secondary">
                {item.items?.['taxons.category'] && (
                  <ul className="nav-menu">
                    {Object.entries(item.items['taxons.category'] || {}).map(
                      ([childSlug, childItem]) => (
                        <li key={childSlug} className="nav-menu__item">
                          <a href="#" className="nav-menu__link">
                            <span>{childItem.label || childSlug}</span>
                            {childItem.items &&
                              Object.keys(childItem.items).length > 0 && (
                                <i>
                                  <img src={RightBracket} alt="Arrow" />
                                </i>
                              )}
                          </a>
                        </li>
                      ),
                    )}
                  </ul>
                )}
                <div className="nav-menu__button">
                  <a href="#" className="btn btn-sm w-100 btn-primary">
                    <span>Показать все</span>
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryMenu;
