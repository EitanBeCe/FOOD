function calc() {
    
    // КАЛЬКУЛЯТОР

    const result = document.querySelector('.calculating__result span');
    let sex, weight, height, age, ratio;

    // если есть инфа в локал сторедж то юзать ее
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }
    // функция чтобы в зависимости от инфы в локал сторедж меняло подсвеченные кнопки соответствующие
    function initLocalStorage(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            } 
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalStorage('#gender div', 'calculating__choose-item_active');
    initLocalStorage('.calculating__choose_big div', 'calculating__choose-item_active');

    // функция по выбору пола и уровня активности (чел выбирает одну из кнопок)
    function calcTotal () {
        // показывать расчет только если все поля заполнены
        if (!sex || !weight || !height || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        // юз разных формул в зависимости от пола
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    // функ нажатия кнопок. Считывать выбор пользователя. Поменять класс активности кнопки
    // не юзали делегирование, тк есть баг когда кликаешь между кнопок на родителя
    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
            
                // для выбора М/Ж просто юзается id, а для уровня активности человека - date атрибут (он же будет ratio)
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    // записать инфу в локал сторедж
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                // изменить класс активности при клике
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    // функ для ввода пользователем веса роста возраста
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        // отслеживать инпут в окошко
        input.addEventListener('input', () => {

            // подсвечивать "вводи цифры"
            if (input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            } else {
                input.style.border = '';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;                    
                    break;
                case 'weight':
                    weight = +input.value;                    
                    break;
                case 'age':
                    age = +input.value;                    
                    break;
            }
            calcTotal();
        });
        
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

export default calc;