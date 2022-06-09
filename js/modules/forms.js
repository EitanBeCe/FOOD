import { closeModal, openModal } from "./modal";
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    // FORMS

    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });


    // во все формы добавить сообщение о статусе ее загрузки на сервер
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // спиннер во время загрузки
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading; 
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            // формат отправки формы на сервер
            const formData = new FormData(form);
            // перевод в JSON
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // отправка формы на сервер
            // после отправки (при загрузке) выдать новое окно "успех" или "что-то не так"
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
                form.reset(); //очистить форму после отправки
            })
            .catch(() =>{
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset(); //очистить форму после отправки
            });
        });
    }

    // сделать оповещение пользователя красиво в отдельном модальном окне
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        // скрыть форму и открыть новое модальное
        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId); // это для показа модального после заполнения формы, 
        // которая прямо на сайте, а не в модальном при нажатии на кнопку
        // создать внутри это новое модальное
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        //вернуть все обратно, человек может захотеть опять открыть форму
        setTimeout(()=> {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;