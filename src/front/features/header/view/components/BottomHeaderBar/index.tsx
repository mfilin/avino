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
        <div className={styles.MenuItem}>
          <Link href="/wine/" target="_blank">Вино</Link>
        </div>
        {/* prettier-ignore */}
        <div className={styles.MenuItem}>
          <Link href="/bubbles/" target="_blank">Шампанское</Link>
        </div>
        {/* prettier-ignore */}
        <div className={styles.MenuItem}>
          <Link href="/whisky/" target="_blank">Виски</Link>
        </div>
        {/* prettier-ignore */}
        <div className={styles.MenuItem}>
        <Link href="/cognac/" target="_blank">Коньяк</Link>
        </div>
        {/* prettier-ignore */}
        <div className={styles.MenuItem}>
        <Link href="/vodka/" target="_blank">Водка</Link>
        </div>
        {/* prettier-ignore */}
        <div className={styles.MenuItem}>
          <Link href="/spirits/" target="_blank">Крепкие напитки</Link>
        </div>
        {/* prettier-ignore */}
        <div className={styles.MenuItem}>
          <Link href="/mixology/" target="_blank">Ликеры</Link>
        </div>
        {/* prettier-ignore */}
        <div className={styles.MenuItem}>
          <Link href="/drugie_napitki/" target="_blank">Прочее</Link>
        </div>
        {/* prettier-ignore */}
        <div className={styles.MenuItem}>
          <Link href="/glass-all/" target="_blank">Стекло</Link>
        </div>
        {/* prettier-ignore */}
        <div className={styles.MenuItem}>
          <Link href="/accessory/" target="_blank">Аксессуары</Link>
        </div>
        {/* prettier-ignore */}
        <div className={styles.MenuItem}>
          <Link href="/promo/" target="_blank">Акции</Link>
        </div>
      </div>
    </>
    // <div className={styles.BottomHeaderBar} onClick={props.onClick}>
    //   {(props.categories || []).map((category) => {
    //     return (
    //       <shallowlink key={category.slug} href={`/${category.slug}`}>
    //         <div
    //           classname={clsx(styles.MenuItem, {
    //             [styles.MenuItem_selected]:
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
