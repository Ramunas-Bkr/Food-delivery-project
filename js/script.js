'use strict';

window.addEventListener('DOMContentLoaded', () => {

    // Tabs START
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    // Tabs END
    // Timer START
    const deadline = '2021-03-01';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClocks, 1000);

        updateClocks();

        function updateClocks() {
            const t = getTimeRemaining(endtime),
                dayTitle = timer.querySelector('#day-title'),
                hourTitle = timer.querySelector('#hour-title'),
                minutesTitle = timer.querySelector('#minutes-title'),
                secondsTitle = timer.querySelector('#seconds-title');

            if (t.days % 10 === 1 && t.days !== 11) {
                dayTitle.innerHTML = 'diena';
            } else if (t.days % 10 == 0 || t.days > 10 && t.days < 20) {
                dayTitle.innerHTML = 'dienų';
            } else {
                dayTitle.innerHTML = 'dienos';
            }

            if (t.hours % 10 === 1 && t.hours !== 11) {
                hourTitle.innerHTML = 'valanda';
            } else if (t.hours > 9 && t.hours < 21) {
                hourTitle.innerHTML = 'valandų';
            } else {
                hourTitle.innerHTML = 'valandos';
            }

            if (t.minutes % 10 === 1 && t.minutes !== 11) {
                minutesTitle.innerHTML = 'minutė';
            } else if (t.minutes % 10 == 0 || t.minutes > 10 && t.minutes < 20) {
                minutesTitle.innerHTML = 'minučių';
            } else {
                minutesTitle.innerHTML = 'minutės';
            }

            if (t.seconds % 10 === 1 && t.seconds !== 11) {
                secondsTitle.innerHTML = 'sekundė';
            } else if (t.seconds % 10 == 0 || t.seconds > 10 && t.seconds < 20) {
                secondsTitle.innerHTML = 'sekundžių';
            } else {
                secondsTitle.innerHTML = 'sekundės';
            }

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Timer END
    // Modal START

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

    // modalEND
    // Class for cards START

    class MenuCards {
        constructor(src, alt, title, desc, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.desc = desc;
            this.price = price.toFixed(2);
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
        }


        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.desc}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Kaina:</div>
                        <div class="menu__item-total"><span>${this.price}</span> EUR/diena</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }
    new MenuCards(
        "img/tabs/vegy.jpg",
        "vegy",
        'Meniu "Fitnes"',
        'Meniu "Fitnes" - tai naujas požiūris į maisto gaminimą: daugiau šviežių vaisių ir daržovių. Aktyviems, sveikiems ir sportuojantiems žmonėms.Tai visiškai naujas, aukštos kokybės, produktas už optimalią kainą!',
        7.5,
        '.menu .container',
        'menu__item',
        'first'
    ).render();

    new MenuCards(
        "img/tabs/elite.jpg",
        "elite",
        'Meniu "Premium"',
        'Meniu "Premium" - naudojame ne tik gražų pakuotės dizainą, bet ir aukščiausios kokybės produktus.Šviežia žvis, jūros gėrybės, vaisiai - kaip geriausiuose resoranuose, tik visa tai namuose!',
        16.8,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCards(
        "img/tabs/post.jpg",
        "post",
        'Meniu "Gavėnia"',
        'Mūsų specialus „Gavėnios meniu“ - kruopštus ingredientų pasirinkimas: jokių gyvūninių produktų.Visiška harmonija su savimi ir gamta kiekviename kasnyje!',
        12.3,
        '.menu .container',
        'menu__item'
    ).render();

    // Class for cards END
    // POST Data from forms START

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/forms/spinner.svg',
        success: 'Ačiū, netrukus susisieksime',
        failure: 'Ups... Kažkas negerai, pabandykite iš naujo'
    };
    forms.forEach(form => {
        postData(form);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            // request.setRequestHeader('Content-type', 'multipart/form-data');
            // Su Form-data sito nereikia
            // Su JSON, reikia:
            request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);

            // jei json formData perkeliame i objekta:
            const object = {};
            formData.forEach(function (item, key) {
                object[key] = item;
            });
            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showMessageModal(message.success);
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 3000);
                } else {
                    showMessageModal(message.failure);
                }
            });
        });
    }

    function showMessageModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModalWindow();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(showMessageModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModalWindow();
        }, 4000);
    }
});