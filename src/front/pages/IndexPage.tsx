import * as React from 'react';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { usePortalStatic } from '../hooks/usePortalStatic';
import { FadeLayout, Footer, LoadingIndicator } from '../components';
import MobileBottomMenu from '../components/MobileBottomMenu';
import featureHeader from '../features/header';
import featureMain from '../features/main';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useEffect, useRef } from 'react';

const { HeaderContainer } = featureHeader.containers;
const { MainPageContainer } = featureMain.containers;

const IndexPage: NextPage = () => {
  const router = useRouter();
  const { pageProps } = usePortalStatic();
  const swiperRef = useRef<any>(null);
  
  // Initialize Swiper when component mounts
  useEffect(() => {
    // Swiper will be automatically initialized when component renders
  }, []);

  return (
    <div className="root">
      <NextSeo
        title={`Виноград не виноват – интернет-каталог алкоголя в Москве`}
        description={`Спиртные напитки и элитный алкоголь купить в магазине алкоголя Виноград не виноват! Выгодные цены в Москве, широкий ассортимент, подробное описание товаров с дегустационными заметками.`}
      />
      {router.isFallback ? (
        <LoadingIndicator />
      ) : (
        <>
          <HeaderContainer pageProps={pageProps} />

          <div className="section section--first">
              <div className="container">
                  <Swiper
                      ref={swiperRef}
                      modules={[Navigation, Pagination, Autoplay]}
                      spaceBetween={20}
                      slidesPerView={"auto"}
                      navigation
                      pagination={{ clickable: true }}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      className="swiper"
                      data-links
                  >
                      <SwiperSlide>
                          <a href="#" className="link">
                              <i className="link__media">
                                  <i className="link__image">
                                      <img src="images/links/link_image__01.jpg" className="img-cover" alt="" />
                                  </i>
                              </i>
                              <span className="link__title">Акции</span>
                          </a>
                      </SwiperSlide>
                      <SwiperSlide>
                          <a href="#" className="link">
                              <i className="link__media">
                                  <i className="link__image">
                                      <img src="images/links/link_image__02.jpg" className="img-cover" alt="" />
                                  </i>
                              </i>
                              <span className="link__title">Как заказать</span>
                          </a>
                      </SwiperSlide>
                      <SwiperSlide>
                          <a href="#" className="link">
                              <i className="link__media">
                                  <i className="link__image">
                                      <img src="images/links/link_image__03.jpg" className="img-cover" alt="" />
                                  </i>
                              </i>
                              <span className="link__title">Новинки</span>
                          </a>
                      </SwiperSlide>
                      <SwiperSlide>
                          <a href="#" className="link">
                              <i className="link__media">
                                  <i className="link__image">
                                      <img src="images/links/link_image__04.jpg" className="img-cover" alt="" />
                                  </i>
                              </i>
                              <span className="link__title">Дегустация</span>
                          </a>
                      </SwiperSlide>
                      <SwiperSlide>
                          <a href="#" className="link">
                              <i className="link__media">
                                  <i className="link__image">
                                      <img src="images/links/link_image__05.jpg" className="img-cover" alt="" />
                                  </i>
                              </i>
                              <span className="link__title">Коньяк</span>
                          </a>
                      </SwiperSlide>
                      <SwiperSlide>
                          <a href="#" className="link">
                              <i className="link__media">
                                  <i className="link__image">
                                      <img src="images/links/link_image__06.jpg" className="img-cover" alt="" />
                                  </i>
                              </i>
                              <span className="link__title">Белое вино</span>
                          </a>
                      </SwiperSlide>
                      <SwiperSlide>
                          <a href="#" className="link">
                              <i className="link__media">
                                  <i className="link__image">
                                      <img src="images/links/link_image__07.jpg" className="img-cover" alt="" />
                                  </i>
                              </i>
                              <span className="link__title">Портвейн</span>
                          </a>
                      </SwiperSlide>
                      <SwiperSlide>
                          <a href="#" className="link">
                              <i className="link__media">
                                  <i className="link__image">
                                      <img src="images/links/link_image__08.jpg" className="img-cover" alt="" />
                                  </i>
                              </i>
                              <span className="link__title">Красное вино</span>
                          </a>
                      </SwiperSlide>
                  </Swiper>
              </div>
          </div>{/*<-- .section swiper -->*/}


          {/* <FadeLayout>
            <MainPageContainer pageProps={pageProps} />
            <MobileBottomMenu />
            <Footer pageProps={pageProps} />
          </FadeLayout> */}
        </>
      )}
    </div>
  );
};

export default IndexPage;
