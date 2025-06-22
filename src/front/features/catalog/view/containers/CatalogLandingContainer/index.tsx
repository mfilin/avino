import React from 'react';
import { IPageProps } from 'src/types/portal/server';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

interface IOwnProps {
    pageProps: IPageProps;
}

const CatalogLandingContainer: React.FC<IOwnProps> = (props) => {
      return(
          <>
            <div className="section section--first">
                <div className="container">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={72}
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
            </div>{/*<-- .section first-swiper -->*/}
          </>
      )
};

export default CatalogLandingContainer;
