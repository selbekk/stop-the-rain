var moment = require('moment');
var templates = require('./templates'),
    ajax = require('./util/ajax');

var el, lastPosition;


init();
function init() {
    el = document.getElementById('app');
    if(!navigator.geolocation) {
        el.innerHTML = templates.notSupported();
        return;
    }

    el.innerHTML = templates.app({
        headline: 'Checking the weather...',
        weatherClass: 'mod-unknown'
    });
    navigator.geolocation.getCurrentPosition(positionAcquired, positionFailure);
}

function positionAcquired(position) {
    lastPosition = position;
    var url = '/api/check-weather?lat=' + position.coords.latitude + '&lng=' + position.coords.longitude;
    ajax.getJSON(url, weatherFetched, generalError);
}

function positionFailure() {
    el.innerHTML = templates.noLocation();
}

function weatherFetched(data) {
    el.innerHTML = templates.app({
        headline: data.place.name + ', ' + data.place.country,
        isRaining: data.isRaining,
        weather: data.weather,
        weatherClass: data.isRaining ? 'mod-rain' : 'mod-sun'
    });

    if(data.isRaining) {
        el.querySelector('.js-stop-the-rain').addEventListener('click', stopTheRain);
    }
}

function generalError() {
    el.innerHTML = templates.generalError();
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