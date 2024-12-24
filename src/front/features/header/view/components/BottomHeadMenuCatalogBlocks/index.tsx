import React from 'react';
import clsx from 'clsx';
import {
  IMenuCatalogItemCatalog,
  IPopularProductItem,
} from '../../../../../../types/portal/client';
import CatalogPriceButtons from '../CatalogPriceButtons';
import PopularProductCarousel from '../PopularProductCarousel';

import PopularProductButtons from '../PopularProductButtons';
import useSliderControls from '../../../../../hooks/useSliderControls';
import BottomHeadMenuCatalogBlockItem from '../BottomHeadMenuCatalogBlockItem';

import styles from './BottomHeadMenuCatalogBlocks.module.scss';

interface IOwnProps {
  items: { [key: string]: IMenuCatalogItemCatalog };
  active: boolean;
  catalogKey: string;
  popularProducts: Array<IPopularProductItem>;
  onClickMenuItem(): void;
}

const BottomHeadMenuCatalogBlocks: React.FC<IOwnProps> = (props) => {
  const { items, popularProducts, catalogKey, active, onClickMenuItem } = props;
  const { pause, resume, currentIndex, inc, dec } = useSliderControls(
    3000,
    popularProducts?.length || 0,
  );

  const incHandler = React.useCallback(() => inc(1), [inc]);
  const decHandler = React.useCallback(() => dec(1), [dec]);

  React.useEffect(() => {
    if (active) {
      resume();
    } else {
      // Stop play slider in background, when parent block display: none
      pause();
    }
  }, [active, pause, resume]);

  const {
    ['product.price']: productPrice,
    // ['product.is_hit']: hitProducts,
    ...restItems
  } = items;

  return (
    <div className={styles.BottomHeadMenuCatalogBlocks}>
      <div className={styles.LeftPart}>
        <div className={styles.Content}>
          {Object.entries(restItems).map((entry) => {
            const [key, item]: [string, IMenuCatalogItemCatalog] = entry;

            // const catalogBaseUrl = `/catalog/${catalogKey}/${item.cat}`;
            // const catalogBaseUrl = `/catalog/${catalogKey}/${FiltersControlCache.forSingleFilter(catalogKey, item.cat)}`;

            return (
              <div key={key} className={styles.CatalogMenuBlockContent}>
                <h6 className={clsx(styles.Label, 'noselect')}>{item.label}</h6>
                <BottomHeadMenuCatalogBlockItem
                  list={item.items}
                  catalogKey={catalogKey}
                  catalogSlug={item.cat}
                  onClick={onClickMenuItem}
                  // catalogBaseUrl={catalogBaseUrl}
                />
              </div>
            );
          })}
        </div>
        {productPrice && (
          <div className={styles.Bottom}>
            <CatalogPriceButtons item={productPrice} catalogKey={catalogKey} />
          </div>
        )}
      </div>
      {popularProducts?.length && (
        <div className={styles.RightPart}>
          <div className={styles.RightPartTopBar}>
            <h6 className={styles.Label}>Выбор покупателей</h6>
            <PopularProductButtons
              onBack={decHandler}
              onNext={incHandler}
              onMouseEnter={pause}
              onMouseLeave={resume}
            />
          </div>
          <PopularProductCarousel
            products={popularProducts}
            currentIndex={currentIndex}
            pause={pause}
            resume={resume}
          />
        </div>
      )}
    </div>
  );
};

export default BottomHeadMenuCatalogBlocks;
