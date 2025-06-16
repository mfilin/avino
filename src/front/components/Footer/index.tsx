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
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <a href="/" className="footer__logo">
                <img src="images/footer_logo.svg" className="img-cover" alt="" />
            </a>
            <a href="#" className="footer__button">
                <span>Написать директору</span>
            </a>
          </div>
          <div className="footer-contact footer-contact--sm">
            <div className="footer-contact__header">КОНТАКТЫ</div>
            <div className="footer-contact__content">
                <div className="footer-contact__group">
                    Москва, Ленинградский пр-т, 48
                </div>
                <div className="footer-contact__group">
                    <div className="footer-contact__title">Отдел продаж:</div>
                    <div className="footer-contact__phones">
                        <div>
                            <a href="tel:+74957897117">+7 (495) 789-71-17</a>;
                        </div>
                        <div>
                            <a href="tel:+79030013113">+7 (903) 001-31-13</a>
                        </div>
                    </div>
                </div>
                <div className="footer-contact__group">
                    <div className="footer-contact__title">Электронная почта:</div>
                    <a href="mailto:vnv.shop@mail.ru">vnv.shop@mail.ru</a>
                </div>
            </div>
            <div className="footer-contact__messengers">
                <a href="#" className="footer-messenger">
                    <i>
                        <svg className="ico-svg" viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg">
                            <use xlinkHref="img/sprites/sprite.svg#whatsapp" />
                        </svg>
                    </i>
                    <span>WhatsApp</span>
                </a>
                <a href="#" className="footer-messenger">
                    <i>
                        <svg className="ico-svg" viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg">
                            <use xlinkHref="img/sprites/sprite.svg#telegram" />
                        </svg>
                    </i>
                    <span>Telegram</span>
                </a>
            </div>
          </div>
          <div className="footer__main">
            {topMenuItems?.map((item, index) => {
              return (
                <div className={`footer-nav footer-nav--${index + 1}`}>
                  <div className="footer-nav__title">
                    <span>{item.name}</span>
                  </div>
                  <div className="footer-nav__content">
                    <ul className="footer-nav__menu">
                      {/* Using catalog data instead of item.items which doesn't exist on Taxons */}
                      {catalog?.[item.slug]?.items?.['taxons.category']?.items && 
                        Object.keys(catalog[item.slug].items['taxons.category'].items).map((subItemKey, subIndex) => {
                          const subItem = catalog[item.slug].items['taxons.category'].items[subItemKey];
                          return (
                            <li key={`footer-nav-item-${subIndex}-${subItemKey}`} className="footer-nav__item">
                              <a href="#" className="footer-nav__link">{subItem.label}</a>
                            </li>
                          );
                        })
                      }
                    </ul>
                  </div>
                </div>
              );
            })}
            <div className="footer-contact footer-contact--xl">
                <div className="footer-contact__header">КОНТАКТЫ</div>
                <div className="footer-contact__content">
                  <div className="footer-contact__group">
                      Москва, Ленинградский пр-т, 48
                  </div>
                  <div className="footer-contact__group">
                    <div className="footer-contact__title">Отдел продаж:</div>
                    <div className="footer-contact__phones">
                      <div>
                        <a href="tel:+74957897117">+7 (495) 789-71-17</a>;
                      </div>
                      <div>
                        <a href="tel:+79030013113">+7 (903) 001-31-13</a>
                      </div>
                    </div>
                  </div>
                  <div className="footer-contact__group">
                    <div className="footer-contact__title">Электронная почта:</div>
                    <a href="mailto:vnv.shop@mail.ru">vnv.shop@mail.ru</a>
                  </div>
                </div>
                <div className="footer-contact__messengers">
                  <a href="#" className="footer-messenger">
                    <i>
                      <svg className="ico-svg" viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg">
                        <use xlinkHref="img/sprites/sprite.svg#whatsapp"></use>
                      </svg>
                    </i>
                    <span>WhatsApp</span>
                  </a>
                  <a href="#" className="footer-messenger">
                    <i>
                      <svg className="ico-svg" viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg">
                        <use xlinkHref="img/sprites/sprite.svg#telegram"></use>
                      </svg>
                    </i>
                    <span>Telegram</span>
                  </a>
                </div>
            </div>
            <div className="footer__content">
              <div className="footer__lead">
                {`2022 - ${new Date().getFullYear()} © Виноград не Виноват - самая эстетичная винотека в Москве.`}
              </div>
              <div className="footer__text">
                <p>Алкогольная продукция, представленная на&nbsp;сайте https://vinogradnevinovat.ru/ может быть приобретена только в&nbsp;пункте выдачи по&nbsp;адресу: 125167, г. Москва, Ленинградский пр-т, д.&nbsp;48&nbsp;этаж&nbsp;1, часть помещения&nbsp;V, антресоль&nbsp;1, помещение I.&nbsp;Продажа осуществляется на&nbsp;основании лицензии на&nbsp;розничную продажу алкогольной продукции.</p>
                <p>
                  ООО &laquo;ВИНОГРАД НЕ&nbsp;ВИНОВАТ&raquo;: номер лицензии: 77РПА0016700, действует с&nbsp;16&nbsp;ноября 2023&nbsp;г.&nbsp;до&nbsp;15&nbsp;ноября 2028&nbsp;г. Точное местонахождения торгового объекта, время работы, а&nbsp;также иную информацию указана в&nbsp;разделе Контакты.
                </p>
                <p>Мы&nbsp;не&nbsp;осуществляем доставку алкогольной продукции. Запрет на&nbsp;дистанционную продажу алкогольной продукции установлен Федеральным законом от&nbsp;22&nbsp;ноября 1995&nbsp;г. &#8470;&nbsp;171-ФЗ и&nbsp;постановлением Правительства РФ&nbsp;от&nbsp;27&nbsp;сентября 2007&nbsp;г. &#8470;&nbsp;612.</p>
                <p>
                  <a href="#">Политика конфиденциальности</a>
                </p>
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
