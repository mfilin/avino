import React from 'react';
import styles from './SingleProductCard.module.scss';
import ProductImagesGallery from '../../../../../components/ProductImagesGallery';
import Text from '../../../../../components/Typography/Text';
import CardSocialRating from '../../../../../components/CardSocialRating';
import CardVivinoRating from '../../../../../components/CardVivinoRating';
import ArrowDownIcon from '../../../../../images/arrow-down.svg';
import BellIcon from '../../../../../images/bell.svg';
import ArrowUpIcon from '../../../../../images/arrow-up.svg';
import CreditCardIcon from '../../../../../images/credit-cards.svg';
import SertificatedIcon from '../../../../../images/sertificated.svg';
import SslIcon from '../../../../../images/ssl.svg';
import ShallowLink from '../../../../../elements/ShallowLink';
import CardExtraButtons from '../../../../../components/CardExtraButtons';
import CardTags from '../../../../../components/CardTags';
import Button from '../../../../../components/Button';
import AddToCartCounter from '../../../../../components/AddToCartCounter';
import Tooltip from '../../../../../components/Tooltip';
import { formatPriceString } from '../../../../../utils/price';
import { IProduct } from '../../../../../api/types/product';
import DefaultProductCard from '../../../../../components/DefaultProductCard';
import { TProductDictionary } from '../../../../../../types/portal/server';
import Title from 'src/front/components/Typography/Title';
import VolumesOrVintagesList from '../VolumesOrVintagesList/index';

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

const SingleProductCard: React.FC<IOwnProps> = ({
  recommendedReplacement,
  productInfo,
  productInfo: {
    id,
    slug,
    name_en,
    name_ru,
    is_hit,
    is_new,
    discount,
    in_stock,
    sku2,
    properties,
    taxons,
    price,
    count_in_cart,
    media,
    in_favorite,
  },
  propertiesDictionary,
  volumesAndVintages,
  onScrollToAllParams,
  onAddToCart,
}) => {
  const images = Object.values(media || {}).map((media) => {
    return `https://vinogradnevinovat.ru/storage/${media?.id}/${media?.file_name}`;
  });
  // console.log('productInfo', productInfo);
  const handleAddToCart = React.useCallback(
    (count = 1) => {
      onAddToCart?.(productInfo, count);
    },
    [productInfo],
  );

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
        <Title className={styles.Title} as="h2">
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
      <div className={styles.ContentBlock}>
        <div className={styles.FirstBlock}>
          <ProductImagesGallery images={images} />
          <div className={styles.Info}>
            <div className={styles.ExtraButtons}>
              <CardExtraButtons
                singleProductMode
                isInFavorite={in_favorite}
                onShare={() => true}
                onAddToFavorite={() => true}
                onAddToComparison={() => true}
              />
            </div>
            <div className={styles.Rating}>
              <CardSocialRating grade={(productInfo as any).grade} />
              <CardVivinoRating rating={(productInfo as any).rating} />
            </div>
            <div className={styles.Params}>
              {productInfo?.taxons &&
                Object.entries(taxons).map(([key, value]) => {
                  if (key === 'root' || key === 'importer') {
                    return null;
                  }
                  return (
                    <div key={key} className={styles.ParamRow}>
                      <Text level="s15h15w500" colorMode="grey">
                        {propertiesDictionary?.[`taxons.${key}`] || key}:
                      </Text>
                      <Text level="s15h15w500">{value?.value}</Text>
                    </div>
                  );
                })}
              {productInfo?.properties &&
                Object.entries(properties).map(([key, value]) => {
                  if (key === 'perc') {
                    return null;
                  }
                  let name = propertiesDictionary?.[`properties.${key}`] || key;
                  let values = value;
                  if (key === 'psort') {
                    name = 'Виноград';
                    values = value.map((val) => {
                      const perc = properties.perc?.find(
                        (x) => x.sorted === val.sorted,
                      );
                      return {
                        ...val,
                        value: `${val.value}${perc ? `: ${perc.value}` : ''}`,
                      };
                    });
                  }
                  return (
                    <div key={key} className={styles.ParamRow}>
                      <Text level="s15h15w500" colorMode="grey">
                        {name}:
                      </Text>
                      <div className={styles.RowValues}>
                        {values.map((val) => (
                          <Text level="s15h15w500">{val.value}</Text>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
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
                  productIsAvailable={!!in_stock}
                />
                <VolumesOrVintagesList
                  title="Винтаж"
                  items={volumesAndVintages.vintages}
                  showMoreText="Остальные винтажи"
                  productSlug={slug}
                  units="г"
                  productIsAvailable={!!in_stock}
                />
              </div>
            )}
          </div>
        </div>
        {(!!in_stock || recommendedReplacement) && (
          <div className={styles.SecondBlock}>
            {in_stock ? (
              <>
                {!!tags?.length && (
                  <div className={styles.Tags}>
                    <CardTags tags={tags} discount={discount} />
                  </div>
                )}
                <div className={styles.PriceBlock}>
                  <Text level="s36hnw800">{formatPriceString(price)}</Text>
                </div>
                <div className={styles.AboutPriceDecrease}>
                  <Tooltip text="Подписаться и добавить в избранное">
                    <div className={styles.Group}>
                      <BellIcon fill="#797979" />
                      <Text level="s13h16w400" colorMode="grey">
                        Узнать о снижении цены
                      </Text>
                    </div>
                  </Tooltip>
                </div>
                <div className={styles.Buttons}>
                  {!!count_in_cart && (
                    <>
                      <ShallowLink href="/cart">
                        <Button color="orange-fill">
                          <Text level="s16h17w700" colorMode="white">
                            В корзине
                          </Text>
                          <Text level="s16h17w500" colorMode="white">
                            перейти
                          </Text>
                        </Button>
                      </ShallowLink>
                      <AddToCartCounter
                        bigMode
                        count={count_in_cart}
                        onChange={handleAddToCart}
                      />
                    </>
                  )}
                  {!count_in_cart && (
                    <Button
                      stretched
                      color="orange-outline"
                      onClick={() => handleAddToCart()}
                    >
                      Добавить в корзину
                    </Button>
                  )}
                </div>
                <div className={styles.AvailableInStore}>
                  <Text level="s15h18w800" colorMode="green">
                    В наличии на складе и в 1 магазине
                  </Text>
                  <Text level="s12h16w400" colorMode="grey">
                    Наличие в магазинах
                  </Text>
                  <div className={styles.StoreAddresses}>
                    <div className={styles.Visible}>
                      <div>
                        <Text level="s12h11w500">Ленинградский проспект -</Text>{' '}
                        <Text level="s12h11w500" colorMode="green">
                          в наличии
                        </Text>
                      </div>
                      <ArrowUpIcon />
                    </div>
                    <div className={styles.Extendable}>
                      <Text level="s11h16w400" colorMode="grey">
                        Адрес: Москва, Ленинградский просп.,48
                      </Text>
                      <div className={styles.Group}>
                        <Text level="s11h16w400" colorMode="grey">
                          Метро:
                        </Text>
                        <Text level="s11h16w400" colorMode="green">
                          Аэропорт, Динамо,
                        </Text>
                        <Text level="s11h16w400" color="#00C5C3">
                          Петровский парк
                        </Text>
                      </div>
                      <Text level="s11h16w400" colorMode="grey">
                        Принимаем заказы круглосуточно онлайн и рады видеть вас
                        в винотеке с 11:00 до 23:00
                      </Text>
                      <div className={styles.Group}>
                        <Text level="s11h16w400" colorMode="grey">
                          Уточняйте наличие по тел.
                        </Text>
                        <Text level="s11h16w400">+7 (926) 018-07-07</Text>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.Tips}>
                  <div>
                    <SslIcon />
                    <Text level="s12h16w400" colorMode="grey">
                      Надежная покупка с SSL-сертификатом
                    </Text>
                  </div>
                  <div>
                    <CreditCardIcon />
                    <Text level="s12h16w400" colorMode="grey">
                      Принимаем Visa, Master Card, МИР
                    </Text>
                  </div>
                  <div>
                    <SertificatedIcon />
                    <Text level="s12h16w400" colorMode="grey">
                      Вся продукция сертифицирована
                    </Text>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.Replacement}>
                  <Text level="s14h16w600" colorMode="red">
                    Товар отсутствует
                  </Text>
                  <Text level="s24h32w700"> Рекомендуемая замена </Text>
                </div>
                <DefaultProductCard
                  productInfo={recommendedReplacement!}
                  noPaddingAndBorderMode
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default SingleProductCard;
