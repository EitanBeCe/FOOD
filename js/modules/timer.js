function timer(id, deadline) {
    
    // TIMER

    // сколько времени осталось до истечения + перевод в дни/часы...
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); // сколько осталось, в миллисек
            // если значение отрицательно то выдать нули а не минуса.
            if (t <= 0) {
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
            } else {
                days = Math.floor(t / (1000*60*60*24));
                hours = Math.floor((t / (1000*60*60) % 24));
                minutes = Math.floor((t / 1000 / 60) % 60);
                seconds = Math.floor((t / 1000) % 60);
            }
        return{
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // пририсовывать ноль в таймере, если выдается однозначная цифра
    function getZero(num) {
        if (num >= 0 && num <10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    // взять элементы со страницы и бахнуть в них обновление времени. 
    // Аргументы - блок на странице и момент конца времени
    function setClock (selector, endtime) {
        const timer =  document.querySelector(selector),
            days=timer.querySelector('#days'),
            hours=timer.querySelector('#hours'),
            minutes=timer.querySelector('#minutes'),
            seconds=timer.querySelector('#seconds');

        const timeInterval = setInterval(updateClock, 1000); // обновление каждую секунду

        updateClock(); // чтобы при перезагрузке страницы не было задержки 1 сек

        function updateClock () {
            const t = getTimeRemaining(endtime);

            days.innerHTML=getZero(t.days);
            hours.innerHTML=getZero(t.hours);
            minutes.innerHTML=getZero(t.minutes);
            seconds.innerHTML=getZero(t.seconds);    
            
            if (t.total <= 0) {clearInterval(timeInterval);}
        }
    }
    
    setClock(id, deadline);
}

export default timer;