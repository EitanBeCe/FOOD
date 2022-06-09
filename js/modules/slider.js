function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter,wrapper, field}) {
    
    // СЛАЙДЫ (здесь карусель. Обычные - ниже)
    
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector(field);

    let slideIndex = 1;
    let offset = 0; // видеть на сколько съехала карусель

    // отображение общего количества слайдов с нулем если их меньше 10, и текущий слайд
    if (slides.length <10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    // сунуть все слайды в одну полосу, во внутреннюю обертку
    slidesField.style.width = 100 * slides.length + '%';//общая ширина карусели
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    // скрыть всю полосу вне окошка (обертки)
    slidesWrapper.style.overflow = 'hidden';
    // зафиксировать длину всех картинок под окно, вдруг они разыне
    slides.forEach(slide => {
        slide.style.width = width;
    });

    // весь блок сделать relative чтобы потом абсолютно разместить в нем точки-навигатор
    slider.style.position = 'relative';
    // создать обертку для точек-навигарора
    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    // indicators.style.cssText = `
    //     position: absolute;
    //     right: 0;
    //     bottom: 0;
    //     left: 0;
    //     z-index: 15;
    //     display: flex;
    //     justify-content: center;
    //     margin-right: 15%;
    //     margin-left: 15%;
    //     list-style: none;
    // `;
    slider.append(indicators);

    // создать точки по количеству слайдов
    const dots = [];
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1); // задать точкам атрибут с нумерацией к каждому слайду
        dot.classList.add('dot');       
        // добавить класс активности, выделяеть текущую
        if (i === 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot); // создаем массив и наполняем его точками
    }

    // удалить все не цифры, будет юзаться что удалить px
    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if(offset === deleteNotDigits(width) * (slides.length -1)) { //если долистали до конца то (юз регуляр выражния)
            // но имхо parseInt тут проще. тут заменяем px на пустую строку
            offset = 0; // то надо вернуться в самое начало
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`; // переместить карусель на столько-то
        
        //если дошло до конца вернуть цифру на 1
        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++; // основное действие
        }

        // выводить номер текущего слайда
        if (slides.length <10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        //работа с точками навигаторами
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex-1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if(offset === 0) { //если долистали до начала то
            offset = deleteNotDigits(width) * (slides.length -1); // то надо вернуться в конец
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`; // переместить карусель на столько-то

        //если дошло до начала вернуть цифру на 1
        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        // выводить номер текущего слайда
        if (slides.length <10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        //работа с точками навигаторами
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex-1].style.opacity = 1;
    });

    // точки сделали, а теперь чтобы их можно было нажимать
    dots.forEach(dot => {
        dot.addEventListener('click', (e) =>{
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo; // менять номер слайда в зависимости от клика на соотв точку
            offset = deleteNotDigits(width) * (slideTo -1); // установить офсет на соотв место
            slidesField.style.transform = `translateX(-${offset}px)`; // переместить карусель на столько-то
            
            // выводить номер текущего слайда
            if (slides.length <10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }
            
            //работа с точками навигаторами
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex-1].style.opacity = 1;
        });
    });








    // СЛАЙДЫ 2

        // showSlides(slideIndex);

    // // отображение общего количества слайдов с нулем если их меньше 10
    // if (slides.length <10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     // чтобы с последнего слайда прыгало на первый и наоборот
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     } else if(n < 1) {
    //         slideIndex = slides.length;
    //     }
    //     // спрятать все слайды
    //     slides.forEach(item => {
    //         item.classList.add('hide');
    //         item.classList.remove('show', 'fade');
    //     });
    //     // показать нужный
    //     slides[slideIndex-1].classList.add('show', 'fade');
    //     slides[slideIndex-1].classList.remove('hide');

    //     // какой сейчас номер слайда
    //     if (slides.length <10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }

    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });
    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });
}

export default slider;