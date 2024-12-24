import React from 'react';
import styles from './MobileMenu.module.scss';
import Link from 'next/link';
import Text from '../../../../../../components/Typography/Text';
import VKLogo from '../../../../../../images/mobileHeader/vk.svg';
import FacebookIcon from '../../../../../../images/mobileHeader/facebook.svg';
import InstagramIcon from '../../../../../../images/mobileHeader/insta.svg';
import TelegramIcon from '../../../../../../images/mobileHeader/telegram.svg';
import CaretToLeft from '../../../../../../images/mobileHeader/caret-to-left.svg';
import DiscountLabel from '../../../../../../images/mobileHeader/discount-label.svg';
import ShallowLink from 'src/front/elements/ShallowLink';
import {
  IClientCatalogCategoryItem,
  TClientCatalogItem,
} from 'src/types/portal/client';
import memoize from 'fast-memoize';
import BreakLine from '../../../../../../components/BreakLine/index';
import Button from 'src/front/components/Button';

interface IOwnProps {
  catalog: { [key: string]: TClientCatalogItem };
  onClose?: () => void;
  onClickManagerCallBtn: () => void;
  onClickPromoAndDiscountsBtn: () => void;
}

const catalogOrders = [
  'whisky',
  'cognac-all',
  'vodka-all',
  'wine-all',
  'champagne-and-sparkling-wines',
  'spirits',
  'mixology',
  'waters',
  'glass-all',
];

const pages = [
  {
    key: 'about',
    name: 'О компании',
  },
  {
    key: 'how',
    name: 'Правила работы',
  },
  // {
  //   key: 'questions-and-answers',
  //   name: 'Вопросы и ответы',
  // },
  {
    key: 'contacts',
    name: 'Контакты',
  },
];

const MobileMenu: React.FC<IOwnProps> = ({
  catalog,
  onClose,
  onClickManagerCallBtn,
  onClickPromoAndDiscountsBtn,
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null,
  );
  const handleSelectCategory = React.useMemo(() => {
    return memoize((category: string) => () => {
      setSelectedCategory(category);
    });
  }, []);

  const handleClickLink = React.useCallback(() => {
    setSelectedCategory(null);
  }, []);

  const subCategories: { [key: string]: IClientCatalogCategoryItem } | false =
    React.useMemo(() => {
      if (selectedCategory && catalog[selectedCategory]) {
        switch (selectedCategory) {
          case 'whisky':
            return catalog[selectedCategory].items['taxons.country']?.items;
          default:
            return catalog[selectedCategory].items['taxons.category']?.items;
        }
      }

      return undefined;
    }, [catalog, selectedCategory]);

  return (
    <div className={styles.MobileMenu}>
      {selectedCategory && (
        <div className={styles.ToMenuBtn} onClick={handleSelectCategory(null)}>
          <CaretToLeft />
          <Text level="s17h15w700" colorMode="grey">
            В меню
          </Text>
        </div>
      )}
      {catalog && (
        <div className={styles.MenuCategories}>
          {subCategories
            ? Object.entries(subCategories).map(([key, value]) => {
                return (
                  <ShallowLink key={key} href={`${selectedCategory}/${key}`}>
                    <Text level="s17h15w700" className={styles.MenuItem}>
                      {value.label}
                    </Text>
                  </ShallowLink>
                );
              })
            : catalogOrders.map((key) => {
                const item = catalog[key];
                if (!item) {
                  return null;
                }
                return (
                  <div key={key} onClick={handleSelectCategory(key)}>
                    <Text level="s17h15w700" className={styles.MenuItem}>
                      {item.label}
                    </Text>
                  </div>
                );
              })}
        </div>
      )}
      <div
        className={styles.PromoAndDiscounts}
        onClick={onClickPromoAndDiscountsBtn}
      >
        <DiscountLabel />
        <Text level="s14h16w600">АКЦИИ И СКИДКИ</Text>
      </div>
      <div className={styles.PagesList}>
        {pages.map((page) => (
          <ShallowLink href={`/${page.key}`} key={page.key} legacyBehavior>
            <a onClick={handleClickLink}>
              <Text level="s15h15w500">{page.name}</Text>
            </a>
          </ShallowLink>
        ))}
      </div>
      <BreakLine marginBottom="24px" />
      <Button
        color="orange-black-outline"
        stretched
        onClick={onClickManagerCallBtn}
      >
        Заказать звонок менеджера
      </Button>
      <div className={styles.Socials}>
        <Link href="https://t.me/vinograd_ne_vinovat" target="_blank">
          <TelegramIcon />
        </Link>
        <Link href="https://vk.com/vnv_bar" target="_blank">
          <VKLogo />
        </Link>
        <Link
          href="https://instagram.com/vnv_bar?igshid=MzRlODBiNWFlZA=="
          target="_blank"
        >
          <InstagramIcon />
        </Link>
        <Link
          href="https://www.facebook.com/vnv.bar.msk?mibextid=LQQJ4d"
          target="_blank"
        >
          <FacebookIcon />
        </Link>
      </div>
    </div>
  );
};
export default MobileMenu;
