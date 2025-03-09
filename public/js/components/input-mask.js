import IMask from 'imask';

document.querySelectorAll('[data-mask]').forEach(elem => {
    let maskPattern = elem.dataset.mask;
    IMask(elem, {
        mask: elem.dataset.mask
    });
});

document.querySelectorAll('input[name="phone"]').forEach(elem => {
    IMask(elem, {
        mask: '+{7}(000)000-00-00'
    });
});
