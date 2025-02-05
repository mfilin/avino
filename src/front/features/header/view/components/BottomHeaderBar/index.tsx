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
    <>
      <div className={styles.BottomHeaderBar} onClick={props.onClick}>
        {/* prettier-ignore */}
        <div className={styles.menuitem}>
          <Link href="/wine/" target="_blank">Вино</Link>
        </div>
        {/* prettier-ignore */}
        <div className={styles.menuitem}>
          <Link href="/whisky/single-malt/" target="_blank">Виски</Link>
        </div>
        {/* prettier-ignore */}
        <div className={styles.menuitem}>
        <Link href="/cognac/" target="_blank">Коньяк</Link>
        </div>
        {/* prettier-ignore */}
        <div className={styles.menuitem}>
        <Link href="/armagnac/" target="_blank">Арманьяк</Link>
        </div>
        {/* prettier-ignore */}
        <div className={styles.menuitem}>
          <Link href="/brandy/" target="_blank">Бренди</Link>
        </div>
        {/* prettier-ignore */}
        <div className={styles.menuitem}>
          <Link href="/calvados/" target="_blank">Кальвадос</Link>
        </div>
        {/* prettier-ignore */}
        <div className={styles.menuitem}>
          <Link href="/chacha/" target="_blank">Чача</Link>
        </div>
        {/* prettier-ignore */}
        <div className={styles.menuitem}>
          <Link href="/polugar/" target="_blank">Полугар</Link>
        </div>
        {/* prettier-ignore */}
        <div className={styles.menuitem}>
          <Link href="/sake/" target="_blank">Саке</Link>
        </div>
        {/* prettier-ignore */}
        <div className={styles.menuitem}>
          <Link href="/raki/" target="_blank">Раки</Link>
        </div>
      </div>
    </>
    // <div className={styles.BottomHeaderBar} onClick={props.onClick}>
    //   {(props.categories || []).map((category) => {
    //     return (
    //       <shallowlink key={category.slug} href={`/${category.slug}`}>
    //         <div
    //           classname={clsx(styles.menuitem, {
    //             [styles.menuitem_selected]:
    //               category.slug === props.currentcategory,
    //           })}
    //           onmouseenter={mouseenterhandler(category.slug)}
    //         >
    //           {category.title_menu}
    //         </div>
    //       </shallowlink>
    //     );
    //   })}
    // </div>
  );
};
export default BottomHeaderBar;
