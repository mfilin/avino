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
    <div className="section">
        <div className="product">
            <h1 className="product__header product__header--sm">{name_ru}</h1>
            <div className="product__media">
            <div className="product-media" data-gallery>
                <div className="product-media__gallery">
                {images.map((image, index) => (
                    <div 
                    key={index}
                    className={`product-media__image ${index === 0 ? 'active' : ''}`} 
                    data-gallery-image={index + 1}
                    >
                    <img src={image} className="img-fluid" alt="" />
                    </div>
                ))}
                </div>
                <div className="product-media__thumbs">
                {images.map((image, index) => (
                    <div 
                    key={index}
                    className="product-media__thumb" 
                    data-gallery-thumb={index + 1}
                    >
                    <div className="product-media__wrap">
                        <img src={image} className="img-fluid" alt="" />
                    </div>
                    </div>
                ))}
                </div>
            </div>
            <button type="button" className={`product__favorite ${in_favorite ? 'active' : ''}`} onClick={() => {}}>
                <i>
                    <svg className="ico-svg" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                        <use xlinkHref="img/sprites/sprite.svg#heart-small" />
                    </svg>
                </i>
            </button>
            <div className="product__tags">
                {tags.map((tag, index) => (
                <div key={index} className={`item__tag ${tag === 'discount' ? 'item__tag--orange' : 'item__tag--dark'}`}>
                    {tag === 'discount' ? `-${discount}%` : tag}
                </div>
                ))}
            </div>
            </div>
            <div className="product__main">
            <h1 className="product__header product__header--xl">{name_ru}</h1>
            <div className="product__text product__text--xl">
                <p>{properties?.description?.[0]?.value || ''}</p>
            </div>
            <div className="product__available">
                <div className="product-available">
                <span className="product-available__text">{in_stock ? 'В наличии на складе и в 1 магазине' : 'Нет в наличии'}</span>
                <a href="#" className="product-available__icon">
                    <svg className="img-fluid" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                    <use xlinkHref="img/sprites/sprite.svg#question" />
                    </svg>
                </a>
                </div>
            </div>
            <div className="product__features">
                {volumesAndVintages && (
                <>
                    <div className="product__group">
                    <div className="product__label">Выберите объем:</div>
                    <div className="option-group">
                        {Object.keys(volumesAndVintages).map((volume) => (
                        <label key={volume} className="option option--sm">
                            <input type="radio" name="product-volume" value={volume} defaultChecked={properties?.pval?.[0]?.value === volume} />
                            <span>{volume}</span>
                        </label>
                        ))}
                    </div>
                    </div>
                    <div className="product__group">
                    <div className="product__label">Выберите винтаж:</div>
                    <div className="d-flex">
                        <div className="select" data-select>
                        <input type="hidden" name="view" data-select-value defaultValue={properties?.vintage?.[0]?.value} />
                        <div className="select__header" data-select-toggle>
                            <div className="select_active" data-select-active>{properties?.vintage?.[0]?.value}</div>
                        </div>
                        <div className="select__dropdown" data-select-dropdown>
                            {volumesAndVintages[properties?.pval?.[0]?.value]?.map((vintage) => (
                            <div key={vintage} className="select__item" data-select-item={vintage}>{vintage}</div>
                            ))}
                        </div>
                        </div>
                    </div>
                    </div>
                </>
                )}
            </div>
            <div className="product__price">
                <div className="product__price-current">{price}</div>
                {discount && <div className="product__price-old">{price}</div>}
            </div>
            <div className="product__purchase">
                <div className="product-purchase" data-purchase>
                <div className="product-purchase__button">
                    <button 
                    type="button" 
                    className="btn btn-primary product-purchase__btn" 
                    data-purchase-add
                    onClick={() => handleAddToCart(1)}
                    >
                    <span>В Беру</span>
                    </button>
                </div>
                <div className="product-purchase__quantity">
                    <button className="product-purchase__control product-purchase__control--minus" data-purchase-change="minus"></button>
                    <div className="product-purchase__field">
                    <input type="number" className="product-purchase__input" min="0" max="99" defaultValue={count_in_cart || 0} data-purchase-quantity />
                    </div>
                    <button className="product-purchase__control product-purchase__control--plus" data-purchase-change="plus"></button>
                </div>
                </div>
            </div>
            </div>
            <div className="product__info">
            <div className="product-info">
                {propertiesDictionary && Object.entries(propertiesDictionary).map(([key, value]) => (
                <div key={key} className="product-info__row">
                    <div className="product-info__label">{value}</div>
                    <div className="product-info__value">
                        {/* {Array.isArray(value.values) ? value.values.map((val, idx) => (
                            <React.Fragment key={idx}>
                            {idx > 0 && ', '}
                            <a href="#" onClick={(e) => { e.preventDefault(); onScrollToAllParams?.(); }}>{val}</a>
                            </React.Fragment>
                        )) : (
                            <a href="#" onClick={(e) => { e.preventDefault(); onScrollToAllParams?.(); }}>{value.values}</a>
                        )} */}
                    </div>
                </div>
                ))}
            </div>
            <div className="product__docs">
                <img src="img/award.svg" width="35" height="35" alt="" />
                <span>{isRussianProduct ? 'Вся продукция сертифицирована' : 'Продукция импортирована'}</span>
            </div>
            </div>
            <div className="product__text product__text--sm">
            <p>{properties?.description?.[0]?.value || ''}</p>
            </div>
        </div>
    </div>
  );
};
export default SingleProductCard;
