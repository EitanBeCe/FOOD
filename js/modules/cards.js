import {getResource} from '../services/services';

function cards() {
    
    // Используем классы для карточек
    // тк их грузим с фейк серва НАДО включить и json server и Mamp, иначе их не будет

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27; // курс доллара
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        // Создать этот элемент в верстке
        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // перенесено в отдельный файл services
    // // собрать с серва инфу про карточки
    // const getResource = async (url) => {
    //     const res = await fetch(url);
    //     //обработка того момента, что для fetch 404 итп не ошибка
    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status ${res.status}`);//выкинуть новую ошибку
    //     }

    //     return await res.json(); // возвращаем промис.
    //     // это все делается асинхронно и надо сделать синхронно. для этого и нужны выше Async/Await
    //     // значит "дождись пока это доделается"
    // };

    // axios.get('http://localhost:3000/menu')
    // .then(data => {
    //         data.data.forEach(({img , altimg , title , descr , price}) => { //деструктуризация
    //             //data.data для доступа в axios'e
    //             new MenuCard(img , altimg , title , descr , price, '.menu .container').render();
    //         });
    //     });
        

    // получать инфу для карточек с сервера
    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img , altimg , title , descr , price}) => { //деструктуризация
                new MenuCard(img , altimg , title , descr , price, '.menu .container').render();
            });
        });

    
    //второй вариант
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add("menu__item");

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector(".menu .container").append(element);
    //     });
    // }
}

export default cards;