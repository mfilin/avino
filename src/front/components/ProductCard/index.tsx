import React from 'react';
import ProductAmount from '../ProductAmount';
import CardTags from '../CardTags';
import CardSocialRating from '../CardSocialRating';
import Text from '../Typography/Text';
import Button from '../Button';
import AddToCartCounter from '../AddToCartCounter';
import CardVivinoRating from '../CardVivinoRating';
import CardExtraButtons from '../CardExtraButtons';
import clsx from 'clsx';
import CardHoverOverlay from '../CardHoverOverlay';
import { formatPriceString } from '../../utils/price';
import { IDefaultCardProps } from '../../types/cards';
import Link from 'next/link';
import { getProductImages } from '../../utils/getProductImages';
import { UserDataContext } from 'src/front/providers/userDataStoreProvider';
import { getCheckedProductsByStorage } from 'src/front/utils/getCheckedProductsByStorage';
import ShallowLink from 'src/front/elements/ShallowLink';
import { ImageSafe } from '../index';

interface IOwnProps {
    additionalClassName?: string;
}

const ProductCard: React.FC<IDefaultCardProps & IOwnProps> = ({
  productInfo,
  noButtonsMode,
  additionalClassName,
  onAddToComparison,
  onAddToFavorite,
}) => {

    const {
        id,
        slug,
        name,
        media,
        price,
        is_hit,
        is_new,
        in_stock,
        sku2,
        taxons,
        properties,
        discount,
      } = productInfo || {};
      const { userData, updateCartWithProduct } = React.useContext(UserDataContext);
      const { in_comparison, in_favorite, count_in_cart } =
        getCheckedProductsByStorage([productInfo], userData)[0];
    
      const description = `${taxons?.country?.value || ''}, ${
        properties?.pval?.[0].value || ''
      } л, ${properties?.strength?.[0].value || ''}`;
    
      const handleAddToFavorite = React.useCallback(() => {
        onAddToFavorite?.(productInfo);
      }, [id]);
      const handleAddToComparison = React.useCallback(() => {
        onAddToComparison?.(productInfo);
      }, [productInfo]);
    
      const handleBuyNowWithOne = React.useCallback(
        (e?) => {
          e.stopPropagation();
          updateCartWithProduct?.(productInfo, 1);
        },
        [productInfo],
      );
      const handleBuyNow = React.useCallback((e?) => {
        e.stopPropagation();
      }, []);
      const handleAddToCart = React.useCallback(
        (count: number) => {
          updateCartWithProduct?.(productInfo, count);
        },
        [id],
      );

      console.log(productInfo);

      return(        
        <div className={clsx("item", additionalClassName)}>
            <div className="item__media">
                <div className="item__image">
                    <ImageSafe
                        src={getProductImages(media)?.[0]}
                        className="img-contain"
                        alt={name || ""}
                    />
                </div>
                <div className="item__info">
                {taxons?.country?.value && (
                    <div className="item__flag">
                        <img src={`/images/flag_${taxons.country.slug.toLowerCase()}.svg`} className="img-cover" alt={taxons.country.value} />
                    </div>
                )}
                {properties?.strength?.[0].value && (
                    <div className="item__vol">{properties.strength[0].value}</div>
                )}
                </div>
                <div className="item__tags">
                    {is_new && (
                        <div className="item__tag item__tag--dark">new</div>
                    )}
                    {is_hit && (
                        <div className="item__tag">hit</div>
                    )}
                </div>
                <button
                    type="button"
                    className={clsx("item__favorite", { "added-favorite": in_favorite })}
                    onClick={handleAddToFavorite}
                >
                    <i>
                        <svg className="ico-svg" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                        <use xlinkHref="/images/sprites/sprite.svg#heart-small" />
                        </svg>
                    </i>
                </button>
                {in_stock && !noButtonsMode && (
                    <button
                        type="button"
                        className="item__purchase"
                        onClick={handleBuyNowWithOne}
                    >
                        <span>Беру</span>
                    </button>
                )}
                {!in_stock && (
                <div className="item__out-stock">Out of stock</div>
                )}
            </div>
            <div className="item__content">
                <div className="item__rating">
                    {/* <CardSocialRating rating={4.8} reviewCount={23} /> */}
                </div>
                <div className="item__title">
                    <ShallowLink href={`${slug}`}>
                        <a>{name}</a>
                    </ShallowLink>
                </div>
                <div className="item__volumes">
                    {properties?.pval?.map((vol, index) => (
                        <div key={index} className="item__volume">{vol.value}</div>
                    ))}
                </div>
                <div className="item__price">
                    <div className="item__price-current">{formatPriceString(price)}</div>
                </div>
            </div>
        </div>
      )
};

export default ProductCard;
