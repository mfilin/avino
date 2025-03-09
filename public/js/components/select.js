export default () => {
    document.addEventListener('click', (event) => {
        if (event.target.closest('[data-select-item]')) {
            console.log('select')
            const select        = event.target.closest('[data-select]')
            const selectActive  = select.querySelector('[data-select-active]')
            const selectValue   = select.querySelector('[data-select-value]')

            let selectItem= event.target.closest('[data-select-item]').dataset.selectItem

            select.querySelectorAll('[data-select-item]').forEach(elem => {
                elem.classList.remove('active');
            });
            event.target.closest('[data-select-item]').classList.add('active')
            select.classList.remove('open')
            selectActive.innerHTML = selectItem
            selectValue.value = selectItem
        }
    });
};
