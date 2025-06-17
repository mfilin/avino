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
import HowBuyBanner from '../features/main/view/components/HowBuyBanner';
import WineLibraryBanner from '../features/main/view/components/WineLibraryBanner';

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
            <FadeLayout>
                <HeaderContainer pageProps={pageProps} />

                <div className="primary">
                    <Swiper
                    className="swiper"
                    modules={[Navigation, Pagination, Autoplay]}
                    pagination={{
                        el: '.primary__pagination',
                        clickable: true
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false
                    }}
                    >
                    <SwiperSlide>
                        <div className="primary__item">
                        <div className="primary__main">
                            <div className="primary__wrap">
                            <div className="container">
                                <h1 className="primary__header">
                                Продукция винокурни<br />
                                Castle & Key Distillery
                                </h1>
                            </div>
                            </div>
                        </div>
                        <div className="primary__media primary__media--sm">
                            <img src="images/primary_image_xl__01.jpg" className="img-cover" style={{objectPosition: '100% 50%'}} alt="" />
                        </div>
                        <div className="primary__media primary__media--xl">
                            <img src="images/primary_image_xl__01.jpg" className="img-cover" alt="" />
                        </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="primary__item">
                        <div className="primary__main">
                            <div className="primary__wrap">
                            <div className="container">
                                <h1 className="primary__header">
                                Продукция винокурни<br />
                                Castle & Key Distillery
                                </h1>
                            </div>
                            </div>
                        </div>
                        <div className="primary__media primary__media--sm">
                            <img src="images/primary_image_xl__01.jpg" className="img-cover" style={{objectPosition: '100% 50%'}} alt="" />
                        </div>
                        <div className="primary__media primary__media--xl">
                            <img src="images/primary_image_xl__01.jpg" className="img-cover" alt="" />
                        </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="primary__item">
                        <div className="primary__main">
                            <div className="primary__wrap">
                            <div className="container">
                                <h1 className="primary__header">
                                Продукция винокурни<br />
                                Castle & Key Distillery
                                </h1>
                            </div>
                            </div>
                        </div>
                        <div className="primary__media primary__media--sm">
                            <img src="images/primary_image_xl__01.jpg" className="img-cover" style={{objectPosition: '100% 50%'}} alt="" />
                        </div>
                        <div className="primary__media primary__media--xl">
                            <img src="images/primary_image_xl__01.jpg" className="img-cover" alt="" />
                        </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="primary__item">
                        <div className="primary__main">
                            <div className="primary__wrap">
                            <div className="container">
                                <h1 className="primary__header">
                                Продукция винокурни<br />
                                Castle & Key Distillery
                                </h1>
                            </div>
                            </div>
                        </div>
                        <div className="primary__media primary__media--sm">
                            <img src="images/primary_image_xl__01.jpg" className="img-cover" style={{objectPosition: '100% 50%'}} alt="" />
                        </div>
                        <div className="primary__media primary__media--xl">
                            <img src="images/primary_image_xl__01.jpg" className="img-cover" alt="" />
                        </div>
                        </div>
                    </SwiperSlide>
                    </Swiper>
                    <div className="primary__control">
                    <div className="container">
                        <div className="primary__wrapper">
                        <div className="primary__pagination"></div>
                        </div>
                    </div>
                    </div>
                </div>{/*<-- .section main-swiper -->*/}

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

                <div className="section">
                    <div className="container">
                        <div className="section__header">
                            <h2 className="section__title">Популярные категории</h2>
                            <div className="d-flex align-center column-gap-30">
                                <button type="button" className="btn-nav" data-categories-prev>
                                    <svg className="ico-svg" viewBox="0 0 22 12" xmlns="http://www.w3.org/2000/svg">
                                        <use xlinkHref="images/sprites/sprite.svg#nav_prev" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </button>
                                <button type="button" className="btn-nav" data-categories-next>
                                    <svg className="ico-svg" viewBox="0 0 22 12" xmlns="http://www.w3.org/2000/svg">
                                        <use xlinkHref="images/sprites/sprite.svg#nav_next" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </button>
                            </div>
                        </div>               

                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={30}
                            slidesPerView={"auto"}
                            navigation={{
                                prevEl: '[data-categories-prev]',
                                nextEl: '[data-categories-next]'
                            }}
                            className="swiper"
                            data-categories
                        >
                            {[
                                { title: "ВИНО", image: "images/content/category_item_image_01.jpg", size: "sm" },
                                { title: "ВИСКИ", image: "images/content/category_item_image_02.jpg", size: "md" },
                                { title: "КОНЬЯК", image: "images/content/category_item_image_03.jpg", size: "md" },
                                { title: "КРЕПКИЕ НАПИТКИ (РОМ, ТЕКИЛЛА, ДЖИН, ГРАППА, САМБУКА, И ДР.)", image: "images/content/category_item_image_04.jpg", size: "sm" },
                                { title: "ЛИКЕРЫ", image: "images/content/category_item_image_05.jpg", size: "sm" },
                                { title: "ШАМПАНСКОЕ", image: "images/content/category_item_image_06.jpg", size: "md" },
                                { title: "ВОДКА", image: "images/content/category_item_image_07.jpg", size: "sm" }
                            ].map((category, index) => (
                                <SwiperSlide key={index}>
                                    <a href="#" className={`category-item category-item--${category.size}`}>
                                        <i className="category-item__image">
                                            <img src={category.image} className="img-fluid" alt="" />
                                        </i>
                                        <span className="category-item__title">{category.title}</span>
                                    </a>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>{/*<-- .section popular-category-swiper -->*/}

                {/* новинки */}

                {/* товары со скидкой */}

                {/* Неделя континентальной Австралии */}

                <div className="section">
                    <div className="action">
                        <div className="container">
                            <div className="action__main">
                                <div className="action__content">
                                    <div className="action__header">
                                        <div className="action__title">Все акции в кармане</div>
                                        <div className="action__sale">%</div>
                                    </div>
                                    <div className="action__text">
                                        Будьте всегда в курсе о новинках в мире алкоголя, а так же о всех действующих и будущих акциях Digestive, и не забудьте про секретные рассылки о закрытых распродажах и лимитированной продукции.
                                    </div>
                                </div>
                                <div className="action__media">
                                    <div className="action__image">
                                        <img src="images/action_image.jpg" className="img-fluid" alt="" />
                                    </div>
                                    <div className="action__line">
                                        <img src="images/action_line.svg" className="img-fluid" alt="" />
                                    </div>
                                </div>
                                <a href="#" className="action__button">
                                    <span>Подписаться <br />на акции и новости</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div> {/* акции */}
                
                {/* Вас могут заинтересовать */}

                <div className="section">
                    <div className="container">
                        <div className="section__header">
                            <h2 className="section__title">Популярные бренды</h2>
                        </div>

                        <Swiper
                            modules={[Navigation]}
                            observer={true}
                            observeParents={true}
                            slidesPerView={"auto"}
                            spaceBetween={10}
                            speed={800}
                            breakpoints={{
                                768: {
                                    slidesPerView: 'auto',
                                    spaceBetween: 20,
                                },
                                1240: {
                                    slidesPerView: 6,
                                    spaceBetween: 30,
                                },
                                1600: {
                                    slidesPerView: 6,
                                    spaceBetween: 50,
                                },
                            }}
                            className="swiper"
                            data-brands
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                <SwiperSlide key={num}>
                                    <div className="brand">
                                        <div className="brand__logo">
                                            <img src={`images/content/brands/brand_logo__${num.toString().padStart(2, '0')}.png`}
                                                className="img-contain" alt="" />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div> {/* Популярные бренды */}

                <div className="section">
                    <div className="container">
                        <div className="section-wrapper">
                            <HowBuyBanner />
                            <WineLibraryBanner />
                        </div>
                    </div>
                </div>{/* статьи */}

                <div className="section section--sm">
                    <div className="container">
                        <div className="lead">
                            <span>Мы занимаемся подъемом вашего</span>
                            <span>настроения и приносим радость</span>
                            <span>в ваши дружные компании</span>
                        </div>
                        <div className="data">
                            <div className="data__lead">10+ лет</div>
                            <div className="data__features">
                                <div className="data__item">
                                    <div className="data__value">90%</div>
                                    <div className="data__text">
                                        наших клиентов возвращаются к нам за покупками после первой покупки
                                    </div>
                                </div>
                                <div className="data__item">
                                    <div className="data__value">10 000+</div>
                                    <div className="data__text">
                                        наименований алкоголя уже на нашей витрине, и мы постоянно расширяем ассортимент
                                    </div>
                                </div>
                                <div className="data__item">
                                    <div className="data__value">15 секунд</div>
                                    <div className="data__text">
                                        максимальное время ожидания оператора
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{/* контент */}

                <div className="section">
                    <div className="container">
                        <div className="section__header section__header--sm">
                            <div className="section__title section__title--sm">Новости из мира алкоголя Виноград не Виноват</div>
                            <div className="d-none d-xl-flex align-center column-gap-30">
                                <button type="button" className="btn-nav" data-news-prev>
                                    <svg className="ico-svg" viewBox="0 0 22 12" xmlns="http://www.w3.org/2000/svg">
                                        <use xlinkHref="images/sprites/sprite.svg#nav_prev" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </button>
                                <button type="button" className="btn-nav" data-news-next>
                                    <svg className="ico-svg" viewBox="0 0 22 12" xmlns="http://www.w3.org/2000/svg">
                                        <use xlinkHref="images/sprites/sprite.svg#nav_next" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={30}
                            slidesPerView={"auto"}
                            navigation={{
                                prevEl: '[data-news-prev]',
                                nextEl: '[data-news-next]'
                            }}
                            className="swiper"
                            data-news
                        >
                            {[
                                { id: 1, image: "images/content/news/news_image__01.jpg", title: "Ирландские виски Bohemia. Изысканность в каждой капле.", size: "md" },
                                { id: 2, image: "images/content/news/news_image__02.jpg", title: "Ирландские виски Bohemia. Изысканность в каждой капле.", size: "" },
                                { id: 3, image: "images/content/news/news_image__03.jpg", title: "Ирландские виски Bohemia. Изысканность в каждой капле.", size: "" },
                                { id: 4, image: "images/content/news/news_image__04.jpg", title: "Ирландские виски Bohemia. Изысканность в каждой капле.", size: "md" },
                                { id: 5, image: "images/content/news/news_image__05.jpg", title: "Ирландские виски Bohemia. Изысканность в каждой капле.", size: "" },
                                { id: 6, image: "images/content/news/news_image__06.jpg", title: "Ирландские виски Bohemia. Изысканность в каждой капле.", size: "" },
                                { id: 7, image: "images/content/news/news_image__01.jpg", title: "Ирландские виски Bohemia. Изысканность в каждой капле.", size: "md" },
                                { id: 8, image: "images/content/news/news_image__02.jpg", title: "Ирландские виски Bohemia. Изысканность в каждой капле.", size: "" },
                                { id: 9, image: "images/content/news/news_image__03.jpg", title: "Ирландские виски Bohemia. Изысканность в каждой капле.", size: "" },
                                { id: 10, image: "images/content/news/news_image__04.jpg", title: "Ирландские виски Bohemia. Изысканность в каждой капле.", size: "md" },
                                { id: 11, image: "images/content/news/news_image__05.jpg", title: "Ирландские виски Bohemia. Изысканность в каждой капле.", size: "" },
                                { id: 12, image: "images/content/news/news_image__06.jpg", title: "Ирландские виски Bohemia. Изысканность в каждой капле.", size: "" }
                            ].map((news) => (
                                <SwiperSlide key={news.id}>
                                    <a href="#" className={`news-item${news.size ? ` news-item--${news.size}` : ''}`}>
                                        <i className="news-item__image">
                                            <img src={news.image} className="img-fluid" alt="" />
                                        </i>
                                        <span className="news-item__title">
                                            {news.title}
                                        </span>
                                    </a>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div> {/* Новости */}

                <Footer pageProps={pageProps} />

            </FadeLayout>

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
