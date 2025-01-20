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
/*
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
*/
    <div className={styles.BottomHeaderBarMobile} onClick={props.onClick}>
      <Link href="111">
        link1
      </Link>
      <Link href="222">
        link2
      </Link>
      <Link href="333">
        link3
      </Link>
      <Link href="444">
        link4
      </Link>
    </div>
  );
};

export default BottomHeaderBar;
