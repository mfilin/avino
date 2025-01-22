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

    <div classname={styles.bottomheaderbar} onclick={props.onclick}>
      {(props.categories || []).map((category) => {
        return (
          <ShallowLink key={category.slug} href={`/${category.slug}`}>
            <div
              classname={clsx(styles.menuitem, {
                [styles.menuitem_selected]:
                  category.slug === props.currentcategory,
              })}
              onmouseenter={mouseEnterHandler(category.slug)}
            >
              {category.title_menu}
            </div>
          </ShallowLink>
        );
      })}
    </div>

    // <div className={styles.BottomHeaderBarMobile} onClick={props.onClick}>
    //   <Link href={"111"}>
    //     {"link1"}
    //   </Link>
    //   <Link href={"222"}>
    //     {"link2"}
    //   </Link>
    //   <Link href={"333"}>
    //     {"link3"}
    //   </Link>
    //   <Link href={"444"}>
    //     {"link4"}
    //   </Link>
    // </div>
  );
};

export default BottomHeaderBar;
