var moment = require('moment');
var templates = require('./templates'),
    ajax = require('./util/ajax');
    require('./util/svgrain');

var el, lastPosition;

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
        weather: data.description,
        iconHtml: templates[data.weather]()
    });

    if(data.isRaining) {
        el.querySelector('.js-stop-the-rain').addEventListener('click', stopTheRain);
        document.getElementById('svg').classList.add('is-raining');
    }
}

function generalError(e) {
    el.innerHTML = e.error === 'connection error' ? templates.noNetwork() : templates.generalError();
}

function stopTheRain() {

    var iconContainer = el.querySelector('.weather-icon-container');
    iconContainer.innerHTML = templates.sunny();

    document.getElementById('svg').classList.remove('is-raining');

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
        time.innerHTML = moment(data.eta).fromNow();
    }
}

document.addEventListener('DOMContentLoaded', init);
