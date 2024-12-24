import React from 'react';
import styles from './VolumesOrVintagesList.module.scss';
import Text from '../../../../../components/Typography/Text';
import ValueAndPriceCard from '../ValueAndPriceCard/index';
import ShallowLink from 'src/front/elements/ShallowLink';
import { formatPriceString } from 'src/front/utils/price';
import clsx from 'clsx';

type TVintageVolume = {
  value: string;
  volume: string;
  vintage: string;
  price: number;
  available: boolean;
  slug: string;
  inPack?: boolean;
};

type TVintageVolumeNew = Record<
  string,
  { items: TVintageVolume[]; available: boolean }
>;
interface IOwnProps {
  title: string;
  showMoreText: string;
  productSlug: string;
  productIsAvailable: boolean;
  items: TVintageVolumeNew;
  units: 'л' | 'г';
}
const VolumesOrVintagesList: React.FC<IOwnProps> = ({
  title,
  items,
  showMoreText,
  productSlug,
  units,
  productIsAvailable,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const list = React.useMemo(
    () => (showAll ? Object.entries(items) : Object.entries(items).slice(0, 3)),
    [showAll],
  );

  if (list.length < 2) {
    return null;
  }
  const isVintagesList = title === 'Винтаж';
  const subUnits = isVintagesList ? 'л' : 'г';
  const propToSort = isVintagesList ? 'volume' : 'vintage';
  return (
    <div className={styles.VolumesOrVintagesList}>
      <Text level="s12h16w400">{title}:</Text>
      <div className={styles.ItemsList}>
        {list.map(([key, { items, available }], index) => {
          const slug = items[0].slug;
          const isMoreThanOne = items.length > 1;
          const active = items.some(({ slug }) => slug === productSlug);
          const price = isMoreThanOne
            ? `${formatPriceString(items[0].price)} - ${formatPriceString(
                items.at(-1).price,
              )}`
            : formatPriceString(items[0].price);
          return (
            <div className={styles.CardWrapper} key={key}>
              <ShallowLink href={`${slug}`} prefetch={false} scroll>
                <ValueAndPriceCard
                  value={`${key} ${units}`}
                  price={price}
                  isCurrentAvailable={productIsAvailable}
                  isAnotherAvailableInGroup={available}
                  active={active}
                />
              </ShallowLink>
              <div className={styles.Tooltip}>
                {!isMoreThanOne ? (
                  <>
                    {available ? (
                      <Text level="s12h16w400" colorMode="green">
                        В наличии
                      </Text>
                    ) : (
                      <Text level="s12h16w400" colorMode="red">
                        Нет в наличии
                      </Text>
                    )}
                  </>
                ) : (
                  <div className={styles.Links}>
                    {items
                      // eslint-disable-next-line
                      //@ts-ignore
                      .sort((a, b) => a[propToSort] - b[propToSort])
                      .map((item, index) => (
                        <div
                          className={clsx(styles.ListItem, {
                            [styles.unavailable]: !item.available,
                          })}
                          key={index}
                        >
                          <ShallowLink
                            href={`${item.slug}`}
                            prefetch={false}
                            scroll
                          >
                            <Text
                              level="s12h16w400"
                              colorMode={item.available ? undefined : 'grey'}
                            >
                              {`${
                                isVintagesList && item.volume
                                  ? `${item.volume} ${subUnits} -`
                                  : item.vintage
                                  ? `${item.volume} ${subUnits} -`
                                  : ''
                              }  ${formatPriceString(item.price)} ${
                                item.inPack ? '(в коробке)' : ''
                              }`}
                            </Text>
                          </ShallowLink>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {Object.entries(items).length > 3 && (
        <div
          className={styles.ShowMore}
          onClick={() => setShowAll((prev) => !prev)}
        >
          <Text level="s12h16w400" colorMode="orange">
            {showAll ? 'Свернуть' : showMoreText}
          </Text>
        </div>
      )}
    </div>
  );
};
export default VolumesOrVintagesList;
