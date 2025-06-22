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

  const { pageProps } = props;

  const catalogItems = [
    { href: "#", image: "images/content/catalog_sm__01.jpg", title: "Белое вино" },
    { href: "#", image: "images/content/catalog_sm__02.jpg", title: "Красное вино" },
    { href: "#", image: "images/content/catalog_sm__03.jpg", title: "Вермут" },
    { href: "#", image: "images/content/catalog_sm__04.jpg", title: "Портвейн" },
    { href: "#", image: "images/content/catalog_sm__05.jpg", title: "Херес" },
    { href: "#", image: "images/content/catalog_sm__06.jpg", title: "В подарок" },
  ];
  
  return(
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={"auto"}
            className="swiper"
            data-catalog-list
        >
            {catalogItems.map((item, index) => (
                <SwiperSlide key={index}>
                    <a href={item.href} className="catalog-item" data-stories-item>
                        <i className="catalog-item__image">
                            <img src={item.image} className="img-cover" alt="" />
                        </i>
                        <span className="catalog-item__text">{item.title}</span>
                    </a>
                </SwiperSlide>
            ))}
        </Swiper>
  )
};

export default CatalogLandingContainer;
