import React from 'react';
import { IPageProps } from '../../../../../../types/portal/server';
import { IProduct } from 'src/front/api/types/product';
import Text from 'src/front/components/Typography/Text';
import SingleProductCard from '../../components/SingleProductCard/index';
import ColorIcon from '../../../../../images/wine-color.svg';
import AromaIcon from '../../../../../images/aroma.svg';
import SmacksIcon from '../../../../../images/smacks.svg';
import CombinationsIcon from '../../../../../images/combinations.svg';
import { UserDataContext } from 'src/front/providers/userDataStoreProvider';
import { getCheckedProductsByStorage } from 'src/front/utils/getCheckedProductsByStorage';
import ParsedHTMLElement from '../../../../../elements/ParsedHTMLElement';
import { useTaxonDescription } from 'src/front/hooks/useTaxonDescription';
import Link from 'next/link';
import { useSingleProduct } from '../../../../../hooks/useSingleProduct';
import SingleProductCardMobile from '../../components/SingleProductCardMobile/index';
import { Layout } from 'src/front/components';
import clsx from 'clsx';
import TastingNotes from '../../components/TastingNotes/index';
import AddToCartCounter from 'src/front/components/AddToCartCounter';
import ShallowLink from 'src/front/elements/ShallowLink';
import Button from 'src/front/components/Button';
import { useDeviceInfo } from '../../../../../hooks/device';

import styles from './SingleProductContainer.module.scss';
import MainLayout from 'src/front/layouts/MainLayout';

interface IOwnProps {
  productId: number;
  pageProps: IPageProps;
}

const SingleProductContainer: React.FC<IOwnProps> = (props) => {

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.className = '';
      document.body.classList.add('page-base');
    }
  }, []);

  const { pageProps, productId } = props;
  const { isMobile } = useDeviceInfo();
  const { userData, updateCartWithProduct } = React.useContext(UserDataContext);

  const { productGroup } = useSingleProduct(productId);

  const { checkedProduct, volumesAndVintages } = React.useMemo(() => {
    if (productGroup) {
      const currentProduct = productGroup?.products.find(
        (product) => product.id === productId,
      );

      return {
        checkedProduct: getCheckedProductsByStorage(
          [currentProduct],
          userData,
        )[0],
        volumesAndVintages: productGroup?.products.reduce(
          (acc, product) => {
            const keyForVintage = [
              'orange-wine',
              'wine',
              'plodovoe-vino',
              'bezalkogolnoe_vino',
            ].includes(product.taxons?.category?.slug)
              ? 'pyear'
              : 'vintage';
            const volume = product.properties.pval?.[0]?.value;
            const vintage = product.properties[keyForVintage]?.[0]?.value;
            const inPack = product.properties.pack?.[0].slug !== 'bez-upakovki';
            const newObject = {
              volume,
              vintage,
              price: product.price,
              available: product.in_stock > 0,
              slug: product.slug,
              inPack,
            };
            const accVolumes = acc?.volumes;
            const accVintages = acc?.vintages;
            const newVolumes = accVolumes[volume]
              ? {
                  ...accVolumes,
                  [volume]: {
                    items: [...accVolumes[volume].items, newObject],
                    available:
                      accVolumes[volume].available || newObject.available,
                  },
                }
              : {
                  ...accVolumes,
                  [volume]: {
                    items: [newObject],
                    available: newObject.available,
                  },
                };
            const newVintages = accVintages[vintage]
              ? {
                  ...accVintages,
                  [vintage]: {
                    items: [...accVintages[vintage].items, newObject],
                    available:
                      accVintages[vintage].available || newObject.available,
                  },
                }
              : {
                  ...accVintages,
                  [vintage]: {
                    items: [newObject],
                    available: newObject.available,
                  },
                };
            return {
              volumes: volume ? newVolumes : acc.volumes,
              vintages: vintage ? newVintages : acc.vintages,
            };
          },
          { volumes: {}, vintages: {} },
        ),
      };
    }

    return {};
  }, [productGroup, productId, userData]);

  let recommendedReplacement: IProduct | undefined = undefined;

  const tastingNotes = [
    {
      title: 'Цвет',
      key: 'color_text',
      icon: <ColorIcon />,
    },
    {
      title: 'Вкус',
      key: 'smack_text',
      icon: <SmacksIcon />,
    },
    {
      title: 'Аромат',
      key: 'aroma_text',
      icon: <AromaIcon />,
    },
    {
      title: 'Гастрономические сочетания',
      key: 'food_text',
      icon: <CombinationsIcon />,
    },
  ];

  const handleScrollToAllParams = React.useCallback(() => {
    document
      .getElementById('tastingNotes')
      .scrollIntoView({ behavior: 'smooth' });
  }, []);
  const brandSlug = checkedProduct?.taxons?.brand?.slug;
  const factorySlug = checkedProduct?.taxons?.factory?.slug;
  const { description: aboutBrandFactory } = useTaxonDescription(
    brandSlug,
    factorySlug,
  );

  const siteUrl =
    aboutBrandFactory?.[factorySlug]?.site_url ||
    aboutBrandFactory?.[brandSlug]?.site_url;

  const isNotShampagneOrWine = ![
    'champagne-and-sparkling-wines',
    'wine-all',
  ].includes(checkedProduct?.taxons?.root.slug);

  const isNotVodka = checkedProduct?.taxons?.root.slug !== 'vodka-all';
  //const ProductCard = isMobile ? SingleProductCardMobile : SingleProductCard;
  const ProductCard = SingleProductCard;

  const tastingNotesWithText = tastingNotes.map((note) => ({
    ...note,
    text: checkedProduct?.[note.key],
  }));

  const handleAddToCart = React.useCallback(
    (count = 1) => {
      updateCartWithProduct?.(checkedProduct, count);
    },
    [checkedProduct],
  );

  const handleBuyNowWithOne = React.useCallback(
    (e?) => {
      e.stopPropagation();
      updateCartWithProduct?.(checkedProduct, 1);
    },
    [checkedProduct],
  );

  const handleBuyNow = React.useCallback((e?) => {
    e.stopPropagation();
  }, []);

  if (!checkedProduct?.in_stock) {
    recommendedReplacement = productGroup?.products?.find(
      (product) => !!product.in_stock,
    );
  }
  if (!checkedProduct) {
    return null;
  }

  return (
    <MainLayout haveHeadPanel={true}>
      {checkedProduct && (
        <>
          {Boolean(productGroup) ? (
            <ProductCard
              productInfo={checkedProduct}
              propertiesDictionary={pageProps.settings?.dict}
              recommendedReplacement={recommendedReplacement}
              volumesAndVintages={volumesAndVintages}
              onAddToCart={updateCartWithProduct} 
              onScrollToAllParams={handleScrollToAllParams}
            />
          ) : null}
        </>
      )}      
    </MainLayout>
    
    /*
    <Layout>
      <div
        className={clsx(styles.SingleProductContainer, {
          [styles.MobileView]: isMobile,
        })}
      >
        {checkedProduct && (
          <>
            {Boolean(productGroup) ? (
              <ProductCard
                productInfo={checkedProduct}
                propertiesDictionary={pageProps.settings?.dict}
                recommendedReplacement={recommendedReplacement}
                volumesAndVintages={volumesAndVintages}
                onAddToCart={updateCartWithProduct}
                onScrollToAllParams={handleScrollToAllParams}
              />
            ) : null}
          </>
        )}

        <TastingNotes tastingNotes={tastingNotesWithText} />

        <div className={styles.AboutProduct}>
          <Text level={isMobile ? 's18h20w800' : 's24h32w700'}>О продукте</Text>
          <div className={styles.Description}>
            <ParsedHTMLElement htmlText={checkedProduct.description} />
          </div>
        </div>

        {aboutBrandFactory && (
          <>
            {isNotShampagneOrWine &&
              aboutBrandFactory?.[brandSlug] &&
              brandSlug !== factorySlug && (
                <div className={styles.AboutBrand}>
                  <Text level={isMobile ? 's18h20w800' : 's24h32w700'}>
                    О бренде
                  </Text>
                  <div className={styles.Description}>
                    <ParsedHTMLElement
                      htmlText={aboutBrandFactory?.[brandSlug]?.descr}
                    />
                  </div>
                </div>
              )}
            {isNotVodka && aboutBrandFactory?.[factorySlug] && (
              <div className={styles.AboutFactory}>
                <Text level={isMobile ? 's18h20w800' : 's24h32w700'}>
                  О производителе
                </Text>
                <div className={styles.Description}>
                  <ParsedHTMLElement
                    htmlText={aboutBrandFactory?.[factorySlug]?.descr}
                  />
                </div>
              </div>
            )}
            {siteUrl && (
              <div className={styles.Site}>
                <Text level="s14h20w400" colorMode="grey">
                  Сайт производителя:{' '}
                </Text>
                <Link href={siteUrl} target="_blank">
                  <Text level="s14h20w400" colorMode="orange">
                    {siteUrl}
                  </Text>
                </Link>
              </div>
            )}
          </>
        )}

        {isMobile && (
          <div className={styles.AddToCartBar}>
            <AddToCartCounter
              onChange={handleAddToCart}
              count={checkedProduct.count_in_cart}
            />
            <ShallowLink
              href="/cart"
              prefetch={false}
              scroll
              onClick={
                checkedProduct.count_in_cart > 0
                  ? handleBuyNow
                  : handleBuyNowWithOne
              }
            >
              <Button>Купить сейчас</Button>
            </ShallowLink>
          </div>
        )}
      </div>
    </Layout>
    */
  );
};

export default SingleProductContainer;
