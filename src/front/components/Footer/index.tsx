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
import Link from 'next/link';

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
      <footer className={styles.footer}>
        <div className="container">
          <div className="footer__top">
            <FooterColumnLeft />
            <FooterColumnCenter columns={columns} />
          </div>
          <div className="footer__main">
            <div className="footer__content">
              <div className="footer__lead">
                {`2022 - ${new Date().getFullYear()} © Виноград не Виноват - самая эстетичная винотека в Москве.`}
              </div>
              <div className="footer__text">
                <p>Алкогольная продукция, представленная на сайте https://vinogradnevinovat.ru/ может быть приобретена только в пункте выдачи по адресу: 125167, г. Москва, Ленинградский пр-т, д. 48 этаж 1, часть помещения V, антресоль 1, помещение I. Продажа осуществляется на основании лицензии на розничную продажу алкогольной продукции.</p>
                <p>
                  ООО «ВИНОГРАД НЕ ВИНОВАТ»: номер лицензии: 77РПА0016700, действует с 16 ноября 2023 г. до 15 ноября 2028 г. Точное местонахождения торгового объекта, время работы, а также иную информацию указана в разделе Контакты.
                </p>
                <p>Мы не осуществляем доставку алкогольной продукции. Запрет на дистанционную продажу алкогольной продукции установлен Федеральным законом от 22 ноября 1995 г. № 171-ФЗ и постановлением Правительства РФ от 27 сентября 2007 г. № 612.</p>
                <p>
                  <Link href="/privacy-policy">Политика конфиденциальности</Link>
                </p>
              </div>
              <div className={styles.payments}>
                <img src={PaymentsSvg.src} alt="Payment methods" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className={styles.Warning}>
        <Warning />
      </div>
    </>
  );
};

export default Footer;
