export default () => {
    if (document.querySelectorAll('[data-select]').length > 0) {

        document.addEventListener('click', (event) => {
            if (event.target.closest('[data-select-toggle]')) {
                let selectContainer = event.target.closest('[data-select]');
                if (selectContainer.classList.contains('open')) {
                    selectContainer.classList.remove('open');
                }
                else {
                    selectClose();
                    selectContainer.classList.add('open');
                }
            }
            else {
                if (!event.target.closest('[data-select-content]')) {
                    selectClose();
                }
            }
            function selectClose() {
                document.querySelectorAll('[data-select]').forEach(el => {
                    el.classList.remove('open');
                });
            }
        });

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
    }
};
