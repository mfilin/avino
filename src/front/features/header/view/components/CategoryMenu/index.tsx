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

      </ul>
    </div>
  );
};

export default CategoryMenu;
