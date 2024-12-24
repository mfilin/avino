import React from 'react';
import FooterColumnLeft from './components/FooterColumnLeft';
import FooterColumnCenter, { IColumn } from './components/FooterColumnCenter';
import { IPageProps } from '../../../types/portal/server';
import bgImage from '../../images/footer-bg.jpg';
import PaymentsSvg from '../../images/payments-w.svg';
import Warning from '../../images/warning.svg';
import { TClientCatalogItem } from '../../../types/portal/client';
import { useDeviceInfo } from '../../hooks/device';
import FooterMobile from './components/FooterMobile/index';

import styles from './Footer.module.scss';

interface IOwnProps {
  pageProps: IPageProps;
}

const Footer: React.FC<IOwnProps> = (props) => {
  const { topMenuItems, settings } = props.pageProps;
  const catalog = settings?.categories.catalog;
  const { isMobile } = useDeviceInfo();

  const columns: IColumn[] = React.useMemo(() => {
    const res: IColumn[] = [];

    topMenuItems?.forEach((item) => {
      const cat = catalog?.[item.slug] || ({} as TClientCatalogItem);
      let catItems = cat.items?.['taxons.category']?.items || {};

      // Warning! Monkey patching results for whisky! Have to be fixed at API side
      if (item.slug === 'whisky') {
        catItems = cat.items['taxons.country']?.items || {};
      }

      if (catItems) {
        res.push({
          label: cat.label,
          slug: item.slug,
          rows: Object.keys(catItems)
            .map((slug) => {
              return {
                label: catItems[slug].label,
                addr: catItems[slug].addr,
                slug,
              };
            })
            .filter((row) => Boolean(row.slug)), // TODO: Some products broken and have no addr, should have solve system in future
          // Full problem describe here: src/api/core/category.tree.index.ts:104
        });
      }
    });

    return res;
  }, [catalog, topMenuItems]);

  if (isMobile) {
    return <FooterMobile />;
  }

  return (
    <>
      <div
        className={styles.Footer}
        style={{ background: `url(${bgImage.src})` }}
      >
        <div className={styles.SpaceBar}>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className={styles.Columns}>
                    <FooterColumnLeft />
                    <FooterColumnCenter columns={columns} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.BottomBar}>
                    <div>{/*<Button caption={'Написать директору'}/>*/}</div>
                    <div>
                      <PaymentsSvg />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.Warning}>
        <Warning />
      </div>
    </>
  );
};

export default Footer;
