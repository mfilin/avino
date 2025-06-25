// блок Swiper для карусели с ссылками на разделы каталога
// TODO: 


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

import styles from './PromoContainer.module.scss';

interface IOwnProps {
    pageProps: IPageProps;
}

const PromoContainer: React.FC<IOwnProps> = (props) => {
  const { pageProps } = props;

  const slides = [
      { href: "#", image: "images/links/link_image__01.jpg", title: "Акции" },
      { href: "#", image: "images/links/link_image__02.jpg", title: "Как заказать" },
      { href: "#", image: "images/links/link_image__03.jpg", title: "Новинки" },
      { href: "#", image: "images/links/link_image__04.jpg", title: "Дегустация" },
      { href: "#", image: "images/links/link_image__05.jpg", title: "Коньяк" },
      { href: "#", image: "images/links/link_image__06.jpg", title: "Белое вино" },
      { href: "#", image: "images/links/link_image__07.jpg", title: "Портвейн" },
      { href: "#", image: "images/links/link_image__08.jpg", title: "Красное вино" },
  ];

  return (
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
                  {slides.map((slide, index) => (
                      <SwiperSlide key={index}>
                          <a href={slide.href} className="link">
                              <i className="link__media">
                                  <i className="link__image">
                                      <img src={slide.image} className="img-cover" alt="" />
                                  </i>
                              </i>
                              <span className="link__title">{slide.title}</span>
                          </a>
                      </SwiperSlide>
                  ))}
              </Swiper>
          </div>
      </div>      
  );
};

export default PromoContainer;
