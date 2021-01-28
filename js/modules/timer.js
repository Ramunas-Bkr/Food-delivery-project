function timer() {
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
}

module.exports = timer;