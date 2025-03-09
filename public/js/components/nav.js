export default () => {
    const NAV_PARENT = document.querySelectorAll('[data-nav-parent]')
    const NAV_SECTION_SECONDARY = document.querySelectorAll('[data-mobile-section-secondary]')
    const NAV_SECTION_THIRD =document.querySelectorAll('[data-mobile-section-third]')

    document.addEventListener('click',  (event) => {
        if(event.target.closest('[data-nav-toggle]')) {
            document.querySelector('body').classList.toggle('nav-mobile-open')
            NAV_SECTION_SECONDARY.forEach(el => {
                el.classList.remove('active')
            })
            NAV_SECTION_THIRD.forEach(el => {
                el.classList.remove('active')
            })
            return false
        }
    })

    document.addEventListener('click',  (event) => {
        if(event.target.closest('[data-mobile-primary]')) {
            const navPath = event.target.closest('[data-mobile-primary]').dataset.mobilePrimary;
            NAV_SECTION_SECONDARY.forEach(el => {
                el.classList.remove('active')
            })
            document.querySelector(`[data-mobile-section-secondary="${navPath}"]`).classList.add('active');
            return false
        }
    })

    document.addEventListener('click',  (event) => {
        if(event.target.closest('[data-mobile-secondary]')) {
            const navPath = event.target.closest('[data-mobile-secondary]').dataset.mobileSecondary;
            NAV_SECTION_THIRD.forEach(el => {
                el.classList.remove('active')
            })
            document.querySelector(`[data-mobile-section-third="${navPath}"]`).classList.add('active');
            return false
        }
    })

    document.addEventListener('click',  (event) => {
        if(event.target.closest('[data-mobile-section-close]')) {
            event.target.closest('.nav-mobile__section').classList.remove('active')
            return false
        }
    })

    document.addEventListener('click',  (event) => {
        if(event.target.closest('[data-catalog-toggle]')) {
            document.body.classList.toggle('nav-open')
            return false
        }
    })

    NAV_PARENT.forEach((el) => {
        el.addEventListener('mouseenter', e => {
            el.classList.add('hover');
            document.querySelector('.nav__wrap').classList.add('open');
        })
        el.addEventListener('mouseleave', e => {
            el.classList.remove('hover');
            document.querySelector('.nav__wrap').classList.remove('open');
        })
    })
};

