import React from 'react';
import styles from './SingleProductCardMobile.module.scss';
import ProductImagesGallery from '../../../../../components/ProductImagesGallery';
import Text from '../../../../../components/Typography/Text';
import ArrowDownIcon from '../../../../../images/arrow-down.svg';
import BellIcon from '../../../../../images/bell.svg';
import ArrowUpIcon from '../../../../../images/arrow-up.svg';
import CardExtraButtons from '../../../../../components/CardExtraButtons';
import CardTags from '../../../../../components/CardTags';
import Tooltip from '../../../../../components/Tooltip';
import { formatPriceString } from '../../../../../utils/price';
import { IProduct } from '../../../../../api/types/product';
import { TProductDictionary } from '../../../../../../types/portal/server';
import Title from 'src/front/components/Typography/Title';
import VolumesOrVintagesList from '../VolumesOrVintagesList/index';
import DefaultMobileProductCard from 'src/front/components/DefaultMobileProductCard';
import AddToCartCounter from 'src/front/components/AddToCartCounter';
import SingleProductCardMobileInStockSection from './components/SingleProductCardMobileInStockSection';
import SingleProductCardMobileNotInStockSection from './components/SingleProductCardMobileNotInStockSection';
import SingleProductCardMobilePrice from './components/SingleProductCardMobilePrice';
import SingleProductCardMobileParams from './components/SingleProductCardMobileParams';

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
  productInfo: IProduct;
  recommendedReplacement?: IProduct;
  propertiesDictionary: TProductDictionary;
  volumesAndVintages: {
    vintages: TVintageVolumeNew;
    volumes: TVintageVolumeNew;
  };
  onScrollToAllParams?: () => void;
  onAddToCart?: (product: IProduct, count: number) => void;
}

const SingleProductCardMobile: React.FC<IOwnProps> = ({
  recommendedReplacement,
  productInfo,
  productInfo: {
    slug,
    name_en,
    name_ru,
    is_hit,
    is_new,
    discount,
    sku2,
    properties,
    taxons,
    price,
    media,
    in_favorite,
    in_stock,
  },
  volumesAndVintages,
  propertiesDictionary,
  onScrollToAllParams,
}) => {
  const images = Object.values(media || {}).map((media) => {
    return `https://vinogradnevinovat.ru/storage/${media?.id}/${media?.file_name}`;
  });
  // console.log('productInfo', productInfo);

  const isRussianProduct = taxons.country?.value.toUpperCase() === 'РОССИЯ';

  const tags = [] as any;
  if (is_hit) {
    tags.push('buyersChoice');
  }
  if (is_new) {
    tags.push('new');
  }
  if (discount) {
    tags.push('discount');
  }

  return (
    <div className={styles.Wrapper}>
      <div className={styles.CardHeader}>
        <Title className={styles.Title} as="h1">
          {isRussianProduct ? name_ru : name_en}
        </Title>
        <div className={styles.DescriptionGroup}>
          <div className={styles.Vendor}>
            <Text level="s13h16w400" colorMode="grey">
              Артикул: {sku2 || '12345'}
            </Text>
          </div>
          <Text level="s13h16w400" colorMode="grey">
            {isRussianProduct ? name_en : name_ru}
          </Text>
        </div>
      </div>
      <div className={styles.ImagesBlock}>
        <div className={styles.Tags}>
          <CardTags
            isNew={!!is_new}
            isHit={!!is_hit}
            discount={discount}
            mode="mobile"
          />
        </div>
        <ProductImagesGallery images={images} />
        <div className={styles.ExtraButtons}>
          <CardExtraButtons
            singleProductMode
            isInFavorite={in_favorite}
            onShare={() => true}
            onAddToFavorite={() => true}
            onAddToComparison={() => true}
            viewMode="mobile"
          />
        </div>
      </div>
      <div className={styles.Info}>
        {in_stock ? (
          <>
            <SingleProductCardMobilePrice price={price} />
            <SingleProductCardMobileInStockSection />
            <SingleProductCardMobileParams
              propertiesDictionary={propertiesDictionary}
              productInfo={productInfo}
            />
            <div className={styles.ShowAllParams} onClick={onScrollToAllParams}>
              <Text level="s14h18w800" colorMode="orange">
                Смотреть все характеристики <ArrowDownIcon />
              </Text>
            </div>
            {(Object.keys(volumesAndVintages.volumes).length > 1 ||
              Object.keys(volumesAndVintages.vintages).length > 1) && (
              <div className={styles.VintagesAndVolumes}>
                <Text level="s18h15w600">Винтажи и объемы</Text>
                <VolumesOrVintagesList
                  title="Объем"
                  items={volumesAndVintages.volumes}
                  showMoreText="Остальные объемы"
                  productSlug={slug}
                  units="л"
                  productIsAvailable={!!productInfo.in_stock}
                />
                <VolumesOrVintagesList
                  title="Винтаж"
                  items={volumesAndVintages.vintages}
                  showMoreText="Остальные винтажи"
                  productSlug={slug}
                  units="г"
                  productIsAvailable={!!productInfo.in_stock}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <SingleProductCardMobileNotInStockSection />
            {recommendedReplacement && (
              <div className={styles.Replacement}>
                <Text level="s24h32w700"> Рекомендуемая замена </Text>
                <DefaultMobileProductCard
                  productInfo={recommendedReplacement!}
                  stretchedMode
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default SingleProductCardMobile;
