function slider({ container, slide, nextArrow, prevArrow, totalCounter, curentCounter, wrapper, field }) {
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(curentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '1s all';

    slidesWrapper.style.overflow = 'hidden';

    slider.style.position = 'relative';

    const indicator = document.createElement('ol');
    const dots = [];
    indicator.classList.add('carousel-indicators');
    slider.append(indicator);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        indicator.append(dot);
        if (i == 0) {
            dot.style.opacity = '1';
        }
        dots.push(dot);
    }

    slides.forEach(slide => {
        slide.style.width = width;
    });

    function styleDots(n) {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[n].style.opacity = '1';
    }

    function addCurrentIndex(index) {
        if (slides.length < 10) {
            current.textContent = `0${index}`;
        } else {
            current.textContent = index;
        }
    }

    function getWidth(param = 1) {
        return +width.replace(/\D/g, '') * param;
    }

    next.addEventListener('click', () => {
        if (offset == getWidth(slides.length - 1)) {
            offset = 0;
        } else {
            offset += getWidth();
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        addCurrentIndex(slideIndex);
        styleDots(slideIndex - 1);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = getWidth(slides.length - 1);
        } else {
            offset -= getWidth();
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        addCurrentIndex(slideIndex);
        styleDots(slideIndex - 1);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = getWidth(slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            addCurrentIndex(slideIndex);
            styleDots(slideIndex - 1);
        });
    });
}

export default slider;