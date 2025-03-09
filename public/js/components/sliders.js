/*
Документация по работе в шаблоне:
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Инициализация слайдеров
function initSliders() {
    // Перечень слайдеров
    if (document.querySelector('[data-swiper]')) {
        new Swiper('[data-swiper]', {
            // Подключаем модули слайдера
            // для конкретного случая
            //modules: [Navigation, Pagination],
            /*
            effect: 'fade',
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            */
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 0,
            autoHeight: true,
            speed: 800,
            //touchRatio: 0,
            //simulateTouch: false,
            //loop: true,
            //preloadImages: false,
            //lazy: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            // Arrows
            navigation: {
                nextEl: '.swiper__more .swiper__more--next',
                prevEl: '.swiper__more .swiper__more--prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 32,
                },
            },
            on: {}
        });
    }

    if (document.querySelector('[data-catalog-list]')) {
        new Swiper('[data-catalog-list]', {
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 20,
            autoHeight: true,
            speed: 800,
            breakpoints: {
                1024: {
                    slidesPerView: 'auto',
                    spaceBetween: 35,
                },
            },
        });
    }

    if (document.querySelector('[data-offer]')) {
        new Swiper('[data-offer]', {
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 10,
            autoHeight: true,
            speed: 800,
            breakpoints: {
                1024: {
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                },
            },
        });
    }

    if (document.querySelector('[data-compilation-sm]')) {
        new Swiper('[data-compilation-sm]', {
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 20,
            autoHeight: true,
            speed: 800,
            breakpoints: {
                1024: {
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                },
            },
        });
    }

    if (document.querySelector('[data-brands]')) {
        new Swiper('[data-brands]', {
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 10,
            speed: 800,
            breakpoints: {
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
            },
        });
    }

    if (document.querySelector('[data-categories]')) {
        new Swiper('[data-categories]', {
            modules: [Navigation],
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 15,
            speed: 800,
            navigation: {
                nextEl: '[data-categories-next]',
                prevEl: '[data-categories-prev]',
            },
            breakpoints: {
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                },
                1600: {
                    slidesPerView: 'auto',
                    spaceBetween: 50,
                },
            },
        });
    }

    if (document.querySelector('[data-new]')) {
        new Swiper('[data-new]', {
            modules: [Navigation],
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 16,
            speed: 800,
            navigation: {
                nextEl: '[data-new-next]',
                prevEl: '[data-new-prev]',
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
                1600: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                },
            },
        });
    }

    if (document.querySelector('[data-news]')) {
        new Swiper('[data-news]', {
            modules: [Navigation],
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 15,
            speed: 800,
            navigation: {
                nextEl: '[data-news-next]',
                prevEl: '[data-news-prev]',
            },
            breakpoints: {
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                },
                1600: {
                    slidesPerView: 'auto',
                    spaceBetween: 50,
                },
            },
        });
    }

    if (document.querySelector('[data-links]')) {
        new Swiper('[data-links]', {
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 22,
            speed: 800,
            breakpoints: {
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                },
                1240: {
                    slidesPerView: 8,
                    spaceBetween: 25,
                },
                1600: {
                    slidesPerView: 8,
                    spaceBetween: 72,
                },
            },
        });
    }

    if (document.querySelector('[data-primary]')) {
        new Swiper('[data-primary]', {
            modules: [Pagination],
            observer: true,
            loop: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
            pagination: {
                el: '[data-primary-pagination]',
                clickable: true,
            },
        });
    }

    if (document.querySelector('[data-tabs-control]')) {
        new Swiper('[data-tabs-control]', {
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 40,
            speed: 800,
            breakpoints: {
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 40,
                },
                1240: {
                    slidesPerView: 'auto',
                    spaceBetween: 120,
                },
            },
        });
    }

    if (document.querySelector('[data-comments]')) {
        new Swiper('[data-comments]', {
            observer: true,
            loop: false,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 40,
            speed: 800,
        });
    }

    if (document.querySelector('[data-stories]')) {

        new Swiper('[data-stories]', {
            modules: [Pagination],
            observer: true,
            loop: false,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 40,
            speed: 800,
            pagination: {
                el: '[data-stories-pagination]',
                clickable: true,
            },
        });

        document.addEventListener('click', (event) => {
            if (event.target.closest('[data-stories-toggle]')) {
                event.preventDefault()
                console.log('data-stories-toggle')
                document.body.classList.toggle('stories-open')
            }
        })
    }
}

window.addEventListener("load", function (e) {
    // Запуск инициализации слайдеров
    initSliders();
});
