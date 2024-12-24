import React from 'react';
import styles from './CatalogMobileMenu.module.scss';
import Text from '../Typography/Text';
import ShallowLink from 'src/front/elements/ShallowLink';
import {
  IClientCatalogCategoryItem,
  TClientCatalogItem,
} from 'src/types/portal/client';
import memoize from 'fast-memoize';
import CaretToLeft from '../../images/mobileHeader/caret-to-left.svg';
import { CatalogIcon } from '../../elements';
import { TIcon } from '../../elements/CatalogIcon';

interface IOwnProps {
  catalog: { [key: string]: TClientCatalogItem };
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

const CatalogMobileMenu: React.FC<IOwnProps> = ({ catalog }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null,
  );
  const handleSelectCategory = React.useMemo(() => {
    return memoize((category: string | null) => () => {
      setSelectedCategory(category);
    });
  }, []);

  const subCategories: { [key: string]: IClientCatalogCategoryItem } | false =
    React.useMemo(() => {
      return (
        selectedCategory &&
        catalog &&
        catalog[selectedCategory]?.items['taxons.category']?.items
      );
    }, [catalog, selectedCategory]);

  return (
    <div className={styles.CatalogMobileMenu}>
      {selectedCategory && (
        <div className={styles.ToMenuBtn} onClick={handleSelectCategory(null)}>
          <CaretToLeft />
          <Text level="s17h15w700" colorMode="grey">
            В каталог
          </Text>
        </div>
      )}
      {catalog && (
        <div className={styles.MenuCategories}>
          {subCategories
            ? Object.entries(subCategories).map(([key, value]) => {
                //TODO: uncomment when categories will have images
                // if (value.img) {
                //   return (
                //     <ShallowLink key={key} href={`/${key}`}>
                //       <div className={styles.SubCategoryWithImage}>
                //         <img src={value.img} />
                //         <Text level="s14h16w700">{value.label}</Text>
                //       </div>
                //     </ShallowLink>
                //   );
                // }
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
                    <CatalogIcon icon={key as TIcon} />
                    <Text level="s17h15w700" className={styles.MenuItem}>
                      {item.label}
                    </Text>
                  </div>
                );
              })}
        </div>
      )}
    </div>
  );
};
export default CatalogMobileMenu;
