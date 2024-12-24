import React from 'react';
import clsx from 'clsx';
import styles from './MainBanners.module.scss';
import Text from '../../../../../components/Typography/Text';
import Button from '../../../../../components/Button';
import ShallowLink from 'src/front/elements/ShallowLink';
import Config from '../../../../../config';
import Title from 'src/front/components/Typography/Title';
import ArrowIcon from '../../../../../images/arrow-category.svg';
import { useDeviceInfo } from '../../../../../hooks/device';

const secondBanners = [
  {
    id: 'consultation',
    text: 'Консультации по телефону 8\u00A0(926)\u00A0018-07-07',
    buttonText: 'Послать запрос',
    href: '',
    image: '/images/consultation.png',
    callback: () => console.log('need to open form'),
  },
  {
    id: 'cheap-products',
    text: 'Купить дешевые спиртные напитки до 2500руб.',
    buttonText: 'К предложениям',
    href: '/catalog',
    image: '/images/buy-cheap.png',
  },
  {
    id: 'new-flavors',
    text: 'Откройте для себя новые вкусы в магазине Виноград\u00A0не\u00A0виноват',
    buttonText: 'К новинкам',
    href: '',
    image: '/images/new-flavors.png',
    callback: () => {
      document
        .getElementById('new-products')
        .scrollIntoView({ behavior: 'smooth' });
    },
  },
  {
    id: 'presents',
    text: 'Вы ищите хороший подарок для друзей?',
    buttonText: 'Идеи для подарков',
    href: '/catalog',
    image: '/images/presents.png',
  },
];

interface IOwnProps {
  banners?: typeof secondBanners;
}

const MainBanners: React.FC<IOwnProps> = ({ banners }) => {
  const { isMobile } = useDeviceInfo();

  if (isMobile) {
    return (
      <div className={clsx(styles.MainBanners, styles.MobileView)}>
        <div className={styles.BigBanner}>
          <div className={styles.Image}>
            <img
              src={`${Config.basePath}/images/first-banner-small.png`}
              alt="banner-photo"
            />
          </div>
          <div className={styles.Info}>
            <Title className={styles.Title} colorMode="white">
              HOLA
            </Title>
            <Text className={styles.SubTitle} colorMode="white">
              Cava Brut Organic
            </Text>
            <Text className={styles.Description} colorMode="white">
              Изготовлено по традиционному рецепту каталонских игристых вин.
              Аромат наполнен тонами винограда, зеленого яблока и цитрусовых
              фруктов с нотками свежей выпечки и миндаля.
            </Text>
            <Text
              className={clsx(styles.Description, styles.ColoredDescription)}
              colorMode="orange"
            >
              Кава - бутылочка на все случаи жизни с приятной ценой.
            </Text>
            <ShallowLink href="web/champagne-and-sparkling-wines/ola?page=1">
              <Button color="orange-outline">
                Узнать больше <ArrowIcon fill="#fff" />
              </Button>
            </ShallowLink>
          </div>
        </div>
        <div className={styles.SmallBannersList}>
          {(banners || secondBanners).map((banner) => {
            return (
              <div className={styles.SmallBanner} key={banner.id}>
                <Text
                  level="s13h16w400"
                  color="#EFEFEF"
                  className={styles.SmallBanner__Title}
                >
                  {banner.text}
                </Text>
                {banner.href ? (
                  <ShallowLink href={banner.href} scroll prefetch={false}>
                    <Text level="s12h16w400" colorMode="orange">
                      {banner.buttonText}
                    </Text>
                  </ShallowLink>
                ) : (
                  <Text
                    level="s12h16w400"
                    colorMode="orange"
                    className={styles.Button}
                    onClick={() => banner.callback?.()}
                  >
                    {banner.buttonText}
                  </Text>
                )}
                <img
                  src={`${Config.basePath}${banner.image}`}
                  alt="banner-photo"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <div className={styles.MainBanners}>
      <div className={styles.BigBanner}>
        <div className={styles.Info}>
          <Title className={styles.Title} colorMode="white">
            HOLA
          </Title>
          <Text
            className={styles.SubTitle}
            level="s18h22w400"
            colorMode="white"
          >
            Cava Brut Organic
          </Text>
          <Text
            level="s14h17w400"
            className={styles.Description}
            colorMode="white"
          >
            Изготовлено по традиционному рецепту каталонских игристых вин.
            Аромат наполнен тонами винограда, зеленого яблока и цитрусовых
            фруктов с нотками свежей выпечки и миндаля.
          </Text>
          <Text
            level="s14h17w400"
            className={styles.Description}
            colorMode="orange"
          >
            Кава - бутылочка на все случаи жизни с приятной ценой.
          </Text>
          <ShallowLink href="web/champagne-and-sparkling-wines/ola?page=1">
            <Button color="orange-outline">
              Узнать больше <ArrowIcon fill="#fff" />
            </Button>
          </ShallowLink>
        </div>
        <div className={styles.Image}>
          <img
            src={`${Config.basePath}/images/first-banner.png`}
            alt="banner-photo"
          />
        </div>
      </div>
      <div className={styles.SmallBannersList}>
        {(banners || secondBanners).map((banner) => {
          return (
            <div className={styles.SmallBanner} key={banner.id}>
              <Text
                level="s18h24w400"
                color="#EFEFEF"
                className={styles.SmallBanner__Title}
              >
                {banner.text}
              </Text>
              {banner.href ? (
                <ShallowLink href={banner.href} scroll prefetch={false}>
                  <Button color="orange-outline">{banner.buttonText}</Button>
                </ShallowLink>
              ) : (
                <Button
                  color="orange-outline"
                  onClick={() => banner.callback?.()}
                >
                  {banner.buttonText}
                </Button>
              )}
              <div className={styles.Image}>
                <img
                  src={`${Config.basePath}${banner.image}`}
                  alt="banner-photo"
                  width={420}
                  height={180}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MainBanners;
