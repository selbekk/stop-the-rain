var moment = require('moment');
var templates = require('./templates'),
    ajax = require('./util/ajax');

var el = document.getElementById('app');
var lastPosition;

el.innerHTML = templates.app({
    headline: 'checking the weather...',
    weatherClass: 'mod-unknown'
});

navigator.geolocation.getCurrentPosition(positionAcquired, positionFailure);

function positionAcquired(position) {
    lastPosition = position;
    var url = '/api/check-weather?lat=' + position.coords.latitude + '&lng=' + position.coords.longitude;
    ajax.getJSON(url, weatherFetched, generalError);
}

function positionFailure() {
    console.error('no weather for you!');
}

function weatherFetched(data) {
    el.innerHTML = templates.app({
        headline: data.isRaining ? 'Ah shucks...' : 'Enjoy!',
        isRaining: data.isRaining,
        weather: data.weather,
        weatherClass: data.isRaining ? 'mod-rain' : 'mod-sun'
    });

    if(data.isRaining) {
        el.querySelector('.js-stop-the-rain').addEventListener('click', stopTheRain);
    }
}

function generalError(error) {
    console.error(error);
}

function stopTheRain() {
    var icon = el.querySelector('.weather-icon');
    icon.classList.remove('mod-rain');
    icon.classList.add('mod-sun');
    icon.classList.add('is-waiting');

    var url = '/api/order-sun?lat=' + lastPosition.coords.latitude + '&lng=' + lastPosition.coords.longitude;
    ajax.getJSON(url, handleOrdered, generalError);

    var button = el.querySelector('.js-stop-the-rain');
    button.removeEventListener('click', stopTheRain);
    button.classList.add('is-hidden');
}

function handleOrdered(data) {

    var eta = el.querySelector('.js-weather-eta');
    eta.classList.add('is-showing');

    var time = eta.querySelector('.js-time');
    updateTime();
    setInterval(updateTime, 1000);

    function updateTime() {
        time.innerHTML = moment(data.eta).toNow();
    }
}