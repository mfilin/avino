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
        <Link href="/wine/" target="_blank">Вино</Link>
        {/* prettier-ignore */}
        <Link href="/whisky/single-malt/" target="_blank">Виски</Link>
        {/* prettier-ignore */}
        <Link href="/cognac/" target="_blank">Коньяк</Link>
        {/* prettier-ignore */}
        <Link href="/armagnac/" target="_blank">Арманьяк</Link>
        {/* prettier-ignore */}
        <Link href="/brandy/" target="_blank">Бренди</Link>
        {/* prettier-ignore */}
        <Link href="/calvados/" target="_blank">Кальвадос</Link>
        {/* prettier-ignore */}
        <Link href="/chacha/" target="_blank">Чача</Link>
        {/* prettier-ignore */}
        <Link href="/polugar/" target="_blank">Полугар</Link>
        {/* prettier-ignore */}
        <Link href="/sake/" target="_blank">Саке</Link>
        {/* prettier-ignore */}
        <Link href="/raki/" target="_blank">Раки</Link>
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
