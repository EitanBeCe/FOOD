function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    
    // TABS

    let tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    // скрыть все табы
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        // и убрать у них класс активности
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }
    // отображение таба
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }
    
    hideTabContent();
    showTabContent();

    // делегируем родителю выбор табов
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        // проверка что таргет вообще есть, и что кликнули именно на таб.
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;