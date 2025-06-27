// блок статьи у категории для promo
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

interface IOwnProps {
    pageProps: IPageProps;
}

const PromoCategoryArticleContainer: React.FC<IOwnProps> = (props) => {
    return(
        <>
            <div className="catalog-offer">
                <div className="offer">
                    <div className="offer__header offer__header--sm">
                        Неделя континентальной Австралии <span className="color-orange">до -30% на вина марки YALDARA</span>
                    </div>
                    <div className="offer__media">
                        <div className="offer__image">
                            <img src="images/offer_image.jpg" className="img-cover" alt="" />
                        </div>
                    </div>
                    <div className="offer__content">
                        <div className="offer__header offer__header--md">
                            Неделя континентальной Австралии <br /><span className="color-orange">до -30% на вина марки YALDARA</span>
                        </div>
                        <div className="offer__subtitle">Выберите свой напиток</div>
                        <div className="offer__slider">
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                slidesPerView={4}
                                spaceBetween={20}
                                navigation
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 5000 }}
                                className="swiper-offer"
                            >
                                {[
                                    { id: 1, image: "images/content/items/item_image__01.png" },
                                    { id: 2, image: "images/content/items/item_image__02.png" },
                                    { id: 3, image: "images/content/items/item_image__03.png" },
                                    { id: 4, image: "images/content/items/item_image__04.png" }
                                ].map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <div className="item item-offer">
                                            <div className="item__media">
                                                <div className="item__image">
                                                    <img src={item.image} className="img-contain" alt="" />
                                                </div>
                                                <div className="item__info">
                                                    <div className="item__flag">
                                                        <img src="images/flag_italy.svg" className="img-cover" alt="" />
                                                    </div>
                                                    <div className="item__vol">40%</div>
                                                </div>
                                                <button type="button" className="item__favorite" data-add-favorite>
                                                    <i>
                                                        <svg className="ico-svg" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                                                            <use xlinkHref="img/sprites/sprite.svg#heart-small" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                                        </svg>
                                                    </i>
                                                </button>
                                                <button type="button" className="item__purchase" data-item-purchase>
                                                    <span>Беру</span>
                                                </button>
                                            </div>
                                            <div className="item__content">
                                                <div className="item__rating">
                                                    <div className="rating" data-rating="4.8" data-rating-readonly="true">
                                                        <div className="rating__body">
                                                            <div className="rating__stars">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <div className="rating__star" key={i}>
                                                                        <svg className="ico-svg" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                            <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                                                        </svg>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="rating__active" data-rating-active>
                                                                {[...Array(5)].map((_, i) => (
                                                                    <div className="rating__star" key={i}>
                                                                        <svg className="ico-svg" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                            <use xlinkHref="img/sprites/sprite.svg#star" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                                                        </svg>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="rating__value"><span data-rating-value>4.8</span> (23)</div>
                                                    </div>
                                                </div>
                                                <div className="item__title">
                                                    <a href="#">Коньяк Frapin VSOP Grande Chsmpagne 2020 г</a>
                                                </div>
                                                <div className="item__volumes">
                                                    <div className="item__volume">800 мл</div>
                                                    <div className="item__volume">1.2 л</div>
                                                    <div className="item__volume">1.5 л</div>
                                                </div>
                                                <div className="item__price">
                                                    <div className="item__price-current">1640 р.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="offer__text">
                            «Из рислинга получаются вина непревзойденного качества, вина изысканные, аристократические и, как это не смешно, немодные», — отмечала критик Дженсис Робинсон в книге «Vines, Grapes & Wines». Книга была написана в середине восьмидесятых, когда рислинг переживал не лучшие времена и действительно был аутсайдером. С тех пор все изменилось: вина из этого сорта вернулись в высшую лигу.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default PromoCategoryArticleContainer;
