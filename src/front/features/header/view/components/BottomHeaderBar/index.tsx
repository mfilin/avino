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
      dddd
    </div>
  );
};

export default BottomHeaderBar;

// return (
//   <div classname={styles.bottomheaderbar} onclick={props.onclick}>
//     {(props.categories || []).map((category) => {
//       return (
//         <shallowlink key={category.slug} href={`/${category.slug}`}>
//           <div
//             classname={clsx(styles.menuitem, {
//               [styles.menuitem_selected]:
//                 category.slug === props.currentcategory,
//             })}
//             onmouseenter={mouseenterhandler(category.slug)}
//           >
//             {category.title_menu}
//           </div>
//         </shallowlink>
//       );
//     })}
//   </div>
// );