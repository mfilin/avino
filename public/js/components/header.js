export default () => {
    const HEADER = document.querySelector('.header');
    const HEADER_TRIGGER = document.querySelector('.header-trigger');
    const TOP_NAV = document.querySelector('.top-nav')
    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
    const containHide = () => document.body.classList.contains('header-scroll');
    const defaultOffset = 0;
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        if (document.documentElement.scrollTop > HEADER_TRIGGER.offsetTop) {
            document.body.classList.add('header-white');
        } else {
            document.body.classList.remove('header-white');
        }

        if(scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
            //scroll down
            document.body.classList.add('header-scroll');
        }
        else if(scrollPosition() < lastScroll && containHide()){
            //scroll up
            document.body.classList.remove('header-scroll');
        }

        lastScroll = scrollPosition();
    });
};
