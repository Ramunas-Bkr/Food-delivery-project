function modal() {
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modalWindow = document.querySelector('.modal');

    function openModalWindow() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModalWindow() {
        modalWindow.classList.remove('show');
        modalWindow.classList.add('hide');
        document.body.style.overflow = '';
    }


    modalTrigger.forEach(item => {
        item.addEventListener('click', openModalWindow);
    });

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModalWindow();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains('show')) {
            closeModalWindow();
        }
    });

    const modalTimerId = setTimeout(openModalWindow, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight + 20 >= document.documentElement.scrollHeight) {
            openModalWindow();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;