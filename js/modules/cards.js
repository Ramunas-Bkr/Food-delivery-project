function cards() {
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

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCards(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
            });
        });
}

module.exports = cards;