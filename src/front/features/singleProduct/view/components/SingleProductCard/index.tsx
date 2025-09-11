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

  const handleTabClick = React.useCallback((event) => {
    const tabsArray = document.querySelectorAll('[data-tabs]');
    if (tabsArray.length > 0) {
      if (event.target.closest('[data-tabs-nav]')) {
        const tabs = event.target.closest('[data-tabs]');
        const tabsNavs = tabs.querySelectorAll('[data-tabs-nav]');
        const tabsContent = tabs.querySelectorAll('[data-tabs-target]');
        const tabsPath = event.target.closest('[data-tabs-nav]').dataset.tabsNav;

        tabsNavs.forEach(elem => {
          elem.classList.remove('active');
        });
        tabsContent.forEach(elem => {
          elem.classList.remove('active');
        });
        tabs.querySelector(`[data-tabs-nav="${tabsPath}"]`).classList.add('active');
        tabs.querySelector(`[data-tabs-target="${tabsPath}"]`).classList.add('active');
      }
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener('click', handleTabClick);
    return () => {
      document.removeEventListener('click', handleTabClick);
    };
  }, [handleTabClick]);

  return (
    <>
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
                        <svg className="ico-svg" viewBox="0 0 28 28" xmlnsXlink="http://www.w3.org/2000/svg">
                            <use xlinkHref="images/sprites/sprite.svg#heart-small" />
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
                            <svg className="img-fluid" viewBox="0 0 28 28" xmlnsXlink="http://www.w3.org/2000/svg">
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
                    {propertiesDictionary && Object.entries(propertiesDictionary).slice(0, 10).map(([key, value]) => (
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
                    <img src="images/award.svg" width="35" height="35" alt="" />
                    <span>{isRussianProduct ? 'Вся продукция сертифицирована' : 'Продукция импортирована'}</span>
                </div>
            </div>
            <div className="product__text product__text--sm">
                <p>{properties?.description?.[0]?.value || ''}</p>
            </div>
        </div>
    </div>
    <div className="section" data-tabs>
        <div className="tabs-header">
            <div className="swiper" data-tabs-control>
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <button className="tabs-nav active" data-tabs-nav="tab1">
                            <span>О продукте</span>
                        </button>
                    </div>
                    <div className="swiper-slide">
                        <button className="tabs-nav" data-tabs-nav="tab2">
                            <span>О бренде</span>
                        </button>
                    </div>
                    <div className="swiper-slide">
                        <button className="tabs-nav" data-tabs-nav="tab3">
                            <span>О производителе</span>
                        </button>
                    </div>
                    <div className="swiper-slide">
                        <button className="tabs-nav" data-tabs-nav="tab4">
                            <span>Как заказать</span>
                        </button>
                    </div>
                    <div className="swiper-slide">
                        <button className="tabs-nav" data-tabs-nav="tab5">
                            <span>Отзывы</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="tabs-content active" data-tabs-target="tab1">
            <div className="product-content">
                <div className="product-content__block">
                    <p>Teanum, "Favugne" Rosso, San Severo DOP — красное сухое вино, изготовленное из винограда сорта Монтепульчано. Ягоды произрастают на виноградниках хозяйства в регионе Сан Северо на высоте 150-200 метров над уровнем моря. Сбор урожая проводится вручную, на винодельне плоды подвергаются 12-дневной мацерации на кожице в резервуарах из нержавеющей стали. Ферментация с последующей выдержкой проводится в стальных емкостях.</p>
                </div>
                <div className="product-content__block">
                    <p><strong>Награды вина:</strong></p>
                    <ul>
                        <li>— золотая медаль "AWC Vienna, 2013";</li>
                        <li>— серебряная медаль "AWC Vienna, 2012";</li>
                        <li>— серебряная медаль "AWC Vienna, 2011";</li>
                        <li>— серебряная медаль "Ensenada Tierra del Vino, 2010";</li>
                        <li>— золотая медаль "AWC Vienna, 2009";</li>
                        <li>— серебряная медаль "AWC Vienna, 2008";</li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="tabs-content" data-tabs-target="tab2"></div>

        <div className="tabs-content" data-tabs-target="tab3"></div>

        <div className="tabs-content" data-tabs-target="tab4"></div>

        <div className="tabs-content" data-tabs-target="tab5">
            <div className="comments">
                <div className="comments__rating comments-rating">
                    <div className="comments-rating__title">Оценка 4.8</div>
                    <div className="comments-rating__text">на основе 398 отзывов</div>
                    <div className="comments-rating__content">
                        <div className="comments-rating__item">
                            <div className="comments-rating__stars">
                                <div className="comments-rating__star fill">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                                <div className="comments-rating__star fill">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                                <div className="comments-rating__star fill">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                                <div className="comments-rating__star fill">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                                <div className="comments-rating__star fill">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                            </div>
                            <div className="comments-rating__label">366 отзывов</div>
                        </div>
                        <div className="comments-rating__item">
                            <div className="comments-rating__stars">
                                <div className="comments-rating__star fill">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                                <div className="comments-rating__star fill">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                                <div className="comments-rating__star fill">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                                <div className="comments-rating__star fill">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                                <div className="comments-rating__star">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                            </div>
                            <div className="comments-rating__label">15 отзывов</div>
                        </div>
                        <div className="comments-rating__item">
                            <div className="comments-rating__stars">
                                <div className="comments-rating__star fill">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                                <div className="comments-rating__star fill">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                                <div className="comments-rating__star fill">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                                <div className="comments-rating__star">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                                <div className="comments-rating__star">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                            </div>
                            <div className="comments-rating__label">4 отзывa</div>
                        </div>
                        <div className="comments-rating__item">
                            <div className="comments-rating__stars">
                                <div className="comments-rating__star fill">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                                <div className="comments-rating__star fill">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                                <div className="comments-rating__star">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                                <div className="comments-rating__star">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                                <div className="comments-rating__star">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                            </div>
                            <div className="comments-rating__label">8 отзывов</div>
                        </div>
                        <div className="comments-rating__item">
                            <div className="comments-rating__stars">
                                <div className="comments-rating__star fill">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                                <div className="comments-rating__star">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                                <div className="comments-rating__star">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                                <div className="comments-rating__star">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                                <div className="comments-rating__star">
                                    <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                        <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </div>
                            </div>
                            <div className="comments-rating__label">0 отзывов</div>
                        </div>
                    </div>
                </div>
                <div className="comments__main">
                    <div className="comments__header">
                        <div className="comments__title">Отзывы о товаре</div>
                        <div className="comments__subtitle">254 отзыва</div>
                    </div>
                    <div className="comments__sm">
                        <div className="swiper" data-comments>
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <div className="comment">
                                        <div className="comment__header">
                                            <div className="comment__info">
                                                <div className="comment__author">Ирина М.</div>
                                                <div className="comment__date">две недели назад</div>
                                            </div>
                                            <div className="comment__rating">
                                                <div className="comment__stars">
                                                    <div className="comment__star comment__star--base">
                                                        <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                                            <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                                        </svg>
                                                    </div>
                                                    <div className="comment__star comment__star--fill">
                                                        <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                                            <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="comment__value">4.8</div>
                                            </div>
                                        </div>
                                        <div className="comment__content">
                                            <div className="comment__text">
                                                <p>Всегда покупаю Просекко, совершенно достойное “шампанское” за эти деньги. Сухое, но не резкое. Сбалансированный вкус и аромат. С ним здорово делать коктейли и различные напитки.Всегда покупаю Просекко, совершенно достойное “шампанское” за эти деньги. Сухое, но не резкое. Сбалансированный вкус и аромат.</p>
                                            <p> С ним здорово делать коктейли и различные напитки.Всегда покупаю Просекко, совершенно достойное “шампанское” за эти деньги. Сухое, но не резкое. Сбалансированный вкус и аромат. С ним здорово делать коктейли и различные напитки.</p>
                                            </div>
                                            <div className="comment__media">
                                                <a href="img/content/comment_image__01.jpg" className="comment__image" data-fancybox="comments">
                                                    <img src="img/content/comment_image__01.jpg" className="img-cover" alt="" />
                                                </a>
                                                <a href="img/content/comment_image__02.jpg" className="comment__image" data-fancybox="comments">
                                                    <img src="img/content/comment_image__02.jpg" className="img-cover" alt="" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="comment">
                                        <div className="comment__header">
                                            <div className="comment__info">
                                                <div className="comment__author">Сергей А.</div>
                                                <div className="comment__date">06.08.24</div>
                                            </div>
                                            <div className="comment__rating">
                                                <div className="comment__stars">
                                                    <div className="comment__star comment__star--base">
                                                        <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                                            <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                                        </svg>
                                                    </div>
                                                    <div className="comment__star comment__star--fill">
                                                        <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                                            <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="comment__value">4.8</div>
                                            </div>
                                        </div>
                                        <div className="comment__content">
                                            <div className="comment__text">
                                                <p>Очень хорошее красное вино за адекватные деньги. Я оцениваю вино по критерию “куплю ли я его снова”, исходя из цены, вкуса и т.д  Так вот, это вино я куплю вновь). Очень хорошее красное вино за адекват.Очень хорошее красное вино за адекватные деньги. Я оцениваю вино по критерию “куплю ли я его снова”, исходя из цены, вкуса и т.д  Так вот, это вино я куплю вновь)ные деньги. Я оцениваю вино по критерию “куплю ли я его снова”, исходя из цены, вкуса и т.д  Так вот, это вино я куплю вновь)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="comment">
                                        <div className="comment__header">
                                            <div className="comment__info">
                                                <div className="comment__author">Тимур Б.</div>
                                                <div className="comment__date">06.08.24</div>
                                            </div>
                                            <div className="comment__rating">
                                                <div className="comment__stars">
                                                    <div className="comment__star comment__star--base">
                                                        <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                                            <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                                        </svg>
                                                    </div>
                                                    <div className="comment__star comment__star--fill">
                                                        <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                                            <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="comment__value">4.8</div>
                                            </div>
                                        </div>
                                        <div className="comment__content">
                                            <div className="comment__text">
                                                <p>Всегда покупаю Просекко, совершенно достойное “шампанское” за эти деньги. Сухое, но не резкое.</p>
                                                <p>Сбалансированный вкус и аромат. С ним здорово делать коктейли и различные напитки.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="comment">
                                        <div className="comment__header">
                                            <div className="comment__info">
                                                <div className="comment__author">Ирина М.</div>
                                                <div className="comment__date">две недели назад</div>
                                            </div>
                                            <div className="comment__rating">
                                                <div className="comment__stars">
                                                    <div className="comment__star comment__star--base">
                                                        <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                                            <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                                        </svg>
                                                    </div>
                                                    <div className="comment__star comment__star--fill">
                                                        <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                                            <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="comment__value">4.8</div>
                                            </div>
                                        </div>
                                        <div className="comment__content">
                                            <div className="comment__text">
                                                <p>Всегда покупаю Просекко, совершенно достойное “шампанское” за эти деньги. Сухое, но не резкое. Сбалансированный вкус и аромат. С ним здорово делать коктейли и различные напитки.Всегда покупаю Просекко, совершенно достойное “шампанское” за эти деньги. Сухое, но не резкое. Сбалансированный вкус и аромат.</p>
                                                <p> С ним здорово делать коктейли и различные напитки.Всегда покупаю Просекко, совершенно достойное “шампанское” за эти деньги. Сухое, но не резкое. Сбалансированный вкус и аромат. С ним здорово делать коктейли и различные напитки.</p>
                                            </div>
                                            <div className="comment__media">
                                                <a href="img/content/comment_image__01.jpg" className="comment__image" data-fancybox="comments">
                                                    <img src="img/content/comment_image__01.jpg" className="img-cover" alt="" />
                                                </a>
                                                <a href="img/content/comment_image__02.jpg" className="comment__image" data-fancybox="comments">
                                                    <img src="img/content/comment_image__02.jpg" className="img-cover" alt="" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="comments__button">
                            <button type="button" className="btn btn-primary" data-comments-open>
                                <span>Показать все</span>
                            </button>
                        </div>
                    </div>

                    <div className="comments__md">
                        <div className="comments__list">
                            <div className="comment">
                                <div className="comment__header">
                                    <div className="comment__info">
                                        <div className="comment__author">Ирина М.</div>
                                        <div className="comment__date">две недели назад</div>
                                    </div>
                                    <div className="comment__rating">
                                        <div className="comment__stars">
                                            <div className="comment__star comment__star--base">
                                                <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                                    <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                                </svg>
                                            </div>
                                            <div className="comment__star comment__star--fill">
                                                <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                                    <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="comment__value">4.8</div>
                                    </div>
                                </div>
                                <div className="comment__content">
                                    <div className="comment__text">
                                        <p>Всегда покупаю Просекко, совершенно достойное “шампанское” за эти деньги. Сухое, но не резкое. Сбалансированный вкус и аромат. С ним здорово делать коктейли и различные напитки.Всегда покупаю Просекко, совершенно достойное “шампанское” за эти деньги. Сухое, но не резкое. Сбалансированный вкус и аромат.</p>
                                        <p> С ним здорово делать коктейли и различные напитки.Всегда покупаю Просекко, совершенно достойное “шампанское” за эти деньги. Сухое, но не резкое. Сбалансированный вкус и аромат. С ним здорово делать коктейли и различные напитки.</p>
                                    </div>
                                    <div className="comment__media">
                                        <a href="img/content/comment_image__01.jpg" className="comment__image" data-fancybox="comments">
                                            <img src="img/content/comment_image__01.jpg" className="img-cover" alt="" />
                                        </a>
                                        <a href="img/content/comment_image__02.jpg" className="comment__image" data-fancybox="comments">
                                            <img src="img/content/comment_image__02.jpg" className="img-cover" alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="comment">
                                <div className="comment__header">
                                    <div className="comment__info">
                                        <div className="comment__author">Сергей А.</div>
                                        <div className="comment__date">06.08.24</div>
                                    </div>
                                    <div className="comment__rating">
                                        <div className="comment__stars">
                                            <div className="comment__star comment__star--base">
                                                <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                                    <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                                </svg>
                                            </div>
                                            <div className="comment__star comment__star--fill">
                                                <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                                    <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="comment__value">4.8</div>
                                    </div>
                                </div>
                                <div className="comment__content">
                                    <div className="comment__text">
                                        <p>Очень хорошее красное вино за адекватные деньги. Я оцениваю вино по критерию “куплю ли я его снова”, исходя из цены, вкуса и т.д  Так вот, это вино я куплю вновь). Очень хорошее красное вино за адекват.Очень хорошее красное вино за адекватные деньги. Я оцениваю вино по критерию “куплю ли я его снова”, исходя из цены, вкуса и т.д  Так вот, это вино я куплю вновь)ные деньги. Я оцениваю вино по критерию “куплю ли я его снова”, исходя из цены, вкуса и т.д  Так вот, это вино я куплю вновь)</p>
                                    </div>
                                </div>
                            </div>
                            <div className="comment">
                                <div className="comment__header">
                                    <div className="comment__info">
                                        <div className="comment__author">Тимур Б.</div>
                                        <div className="comment__date">06.08.24</div>
                                    </div>
                                    <div className="comment__rating">
                                        <div className="comment__stars">
                                            <div className="comment__star comment__star--base">
                                                <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                                    <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                                </svg>
                                            </div>
                                            <div className="comment__star comment__star--fill">
                                                <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                                    <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="comment__value">4.8</div>
                                    </div>
                                </div>
                                <div className="comment__content">
                                    <div className="comment__text">
                                        <p>Всегда покупаю Просекко, совершенно достойное “шампанское” за эти деньги. Сухое, но не резкое.</p>
                                        <p>Сбалансированный вкус и аромат. С ним здорово делать коктейли и различные напитки.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="comment">
                                <div className="comment__header">
                                    <div className="comment__info">
                                        <div className="comment__author">Ирина М.</div>
                                        <div className="comment__date">две недели назад</div>
                                    </div>
                                    <div className="comment__rating">
                                        <div className="comment__stars">
                                            <div className="comment__star comment__star--base">
                                                <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                                    <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                                </svg>
                                            </div>
                                            <div className="comment__star comment__star--fill">
                                                <svg className="ico-svg" viewBox="0 0 20 20" xmlnsXlink="http://www.w3.org/2000/svg">
                                                    <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="comment__value">4.8</div>
                                    </div>
                                </div>
                                <div className="comment__content">
                                    <div className="comment__text">
                                        <p>Всегда покупаю Просекко, совершенно достойное “шампанское” за эти деньги. Сухое, но не резкое. Сбалансированный вкус и аромат. С ним здорово делать коктейли и различные напитки.Всегда покупаю Просекко, совершенно достойное “шампанское” за эти деньги. Сухое, но не резкое. Сбалансированный вкус и аромат.</p>
                                        <p> С ним здорово делать коктейли и различные напитки.Всегда покупаю Просекко, совершенно достойное “шампанское” за эти деньги. Сухое, но не резкое. Сбалансированный вкус и аромат. С ним здорово делать коктейли и различные напитки.</p>
                                    </div>
                                    <div className="comment__media">
                                        <a href="img/content/comment_image__01.jpg" className="comment__image" data-fancybox="comments">
                                            <img src="img/content/comment_image__01.jpg" className="img-cover" alt="" />
                                        </a>
                                        <a href="img/content/comment_image__02.jpg" className="comment__image" data-fancybox="comments">
                                            <img src="img/content/comment_image__02.jpg" className="img-cover" alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="comments__btn">
                            <button type="button" className="btn btn-primary" data-comments-open>
                                <span>Показать еще</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};
export default SingleProductCard;
