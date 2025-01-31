import React from 'react';
import clsx from 'clsx';
import memoize from 'fast-memoize';
import { Taxons } from '../../../../../../api/database/models/Taxons';
import ShallowLink from '../../../../../elements/ShallowLink';

import Link, { LinkProps } from 'next/link';

import styles from './BottomHeaderBar.module.scss';

interface IOwnProps {
  categories: Taxons[];
  currentCategory?: string;
  onMouseEnter(slug: string): void;
  onClick(): void;
}

const BottomHeaderBar: React.FC<IOwnProps> = (props) => {
  const mouseEnterHandler = React.useMemo(() => {
    return memoize((slug: string) => () => {
      props.onMouseEnter(slug);
    });
  }, [props.onMouseEnter]);
  return (
    <div className={styles.BottomHeaderBar} onClick={props.onClick}>
      {(props.categories || []).map((category) => {
        return (
          <ShallowLink key={category.slug} href={`/${category.slug}`}>
            <div
              className={clsx(styles.MenuItem, {
                [styles.MenuItem_selected]:
                  category.slug === props.currentCategory,
              })}
              onMouseEnter={mouseEnterHandler(category.slug)}
            >
              {category.title_menu}
            </div>
          </ShallowLink>
        );
      })}
    </div>
  );
};
export default BottomHeaderBar;
