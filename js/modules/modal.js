function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'block';
    document.body.style.overflow='hidden';
    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'none';
    document.body.style.overflow='';
}




function modal(triggerSelector, modalSelector, modalTimerId) {
    
    // МОДАЛЬНОЕ ОКНО

    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
        // modalCloseBtn = document.querySelector('[data-close]'); 
        //удаляем, тк это не работает на динамически добавленные окна
    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });
    
    //modalCloseBtn.addEventListener('click', closeModal); удаляем, тк это не работает на динамически добавленные окна

    // чтобы закрывалось от клика на подложку
    modal.addEventListener('click',(e)=>{
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal(modalSelector);
        }
    });
    // чтобы закрывалось на эскейп
    document.addEventListener('keydown',(e)=>{
        if(e.code === "Escape" && modal.style.display === 'block'){
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal(modalSelector, modalTimerId);   
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    
    // чтобы модальное появлялось если пользователь долистал до низа
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};