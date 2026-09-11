import React from 'react';
import Link from 'next/link';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IProduct } from 'src/front/api/types/product';
import { ImageSafe, LoadingIndicator } from 'src/front/components';
import { useDeviceInfo } from 'src/front/hooks/device';
import { formatPriceString } from 'src/front/utils/price';
import { getProductImages } from 'src/front/utils/getProductImages';

import styles from './NewArrivalsCarousel.module.scss';

interface IOwnProps {
  products: IProduct[];
  isFetching: boolean;
}

const MAX_PRODUCTS = 12;

const NewArrivalsCarousel: React.FC<IOwnProps> = ({ products, isFetching }) => {
  const { isMobile } = useDeviceInfo();
  const visibleProducts = products.slice(0, MAX_PRODUCTS);

  return (
    <section className={styles.NewArrivals} id="new-products">
      <div className="container">
        <div className={styles.Header}>
          <h2 className="section__title">Новинки</h2>
          {!isMobile && visibleProducts.length > 1 && (
            <div className={styles.Navigation}>
              <button
                aria-label="Предыдущие новинки"
                className={`btn-nav ${styles.PrevButton}`}
                type="button"
              >
                ←
              </button>
              <button
                aria-label="Следующие новинки"
                className={`btn-nav ${styles.NextButton}`}
                type="button"
              >
                →
              </button>
            </div>
          )}
        </div>

        {isFetching ? (
          <div className={styles.Status}>
            <LoadingIndicator />
          </div>
        ) : visibleProducts.length === 0 ? (
          <p className={styles.Status}>Новинки пока не появились.</p>
        ) : (
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: `.${styles.PrevButton}`,
              nextEl: `.${styles.NextButton}`,
            }}
            observer
            observeParents
            slidesPerView="auto"
            spaceBetween={16}
            breakpoints={{
              768: { spaceBetween: 20 },
              1240: { slidesPerView: 4, spaceBetween: 30 },
              1600: { slidesPerView: 4, spaceBetween: 50 },
            }}
            className={styles.Carousel}
          >
            {visibleProducts.map((product) => {
              const image = getProductImages(product.media)[0];
              const country = product.taxons?.country?.value;
              const volume = product.properties?.pval?.[0]?.value;
              const strength = product.properties?.strength?.[0]?.value;
              const details = [country, volume && `${volume} л`, strength]
                .filter(Boolean)
                .join(', ');

              return (
                <SwiperSlide className={styles.Slide} key={product.id}>
                  <article className={styles.Card}>
                    <Link
                      className={styles.ImageLink}
                      href={`/${product.slug}`}
                    >
                      <div className={styles.ImageWrapper}>
                        {product.is_new ? (
                          <span className={styles.Tag}>Новинка</span>
                        ) : null}
                        <ImageSafe
                          alt={product.name}
                          className={styles.Image}
                          src={image}
                        />
                      </div>
                    </Link>
                    <div className={styles.Content}>
                      <Link className={styles.Name} href={`/${product.slug}`}>
                        {product.name}
                      </Link>
                      {details ? (
                        <p className={styles.Details}>{details}</p>
                      ) : null}
                      <p className={styles.Price}>
                        {formatPriceString(product.price)}
                      </p>
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default NewArrivalsCarousel;
