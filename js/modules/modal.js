function openModalWindow(modalSelection, modalTimerId) {
    const modalWindow = document.querySelector(modalSelection);
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModalWindow(modalSelection) {
    const modalWindow = document.querySelector(modalSelection);
    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
    document.body.style.overflow = '';
}

function modal(triggerSelection, modalSelection, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelection),
        modalWindow = document.querySelector(modalSelection);

    modalTrigger.forEach(item => {
        item.addEventListener('click', () => openModalWindow(modalSelection, modalTimerId));
    });

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModalWindow(modalSelection);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains('show')) {
            closeModalWindow(modalSelection);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight + 20 >= document.documentElement.scrollHeight) {
            openModalWindow(modalSelection, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export { openModalWindow, closeModalWindow };