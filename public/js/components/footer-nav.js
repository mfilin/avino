import  { hide, show, toggle } from 'slidetoggle';

export default () => {
    document.addEventListener('click', (event) => {
        if (event.target.closest('.footer-nav__title')) {
            event.preventDefault();
            if (document.documentElement.clientWidth < 1250) {
                let footerNav = event.target.closest('.footer-nav');
                let footerNavContent = footerNav.querySelector('.footer-nav__content');

                toggle(
                    footerNavContent,
                    {
                        miliseconds: 200,
                    }
                )
                footerNav.classList.toggle('open')
            }
        }
    });
};
