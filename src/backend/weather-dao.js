var request = require('request');

var Cache = require('./util/cache');
var log = require('./util/logger');

var BASE_URL = 'http://api.openweathermap.org/data/2.5/';
var API_KEY = 'ec7597638cf8f4cfb067e2ed0dc7f2d9';

var weatherCache = new Cache({timeout: 10});
var forecastCache = new Cache({timeout: 180});

var createUrl = function(endpoint, position) {
    return BASE_URL + endpoint + '?lat=' + position.lat + '&lon=' + position.lng + '&APPID=' + API_KEY;
};

var fetch = function(cache, endpoint, position, callback) {
    var cached = cache.get(position);
    if(cached) {
        log.debug('returning a cached version of the ' + endpoint + ' for ' + position);
        return callback(null, cached);
    }

    log.debug('not cached, hitting up the API');

    request(createUrl(endpoint, position), function(err, res, body) {
        if(err || res.statusCode !== 200) {
            log.warn('problem fetching data from API: ' + err);
            return callback(err);
        }

        var result = JSON.parse(body);
        cache.put(position, result);

        log.info( endpoint + ' fetched successfully for ' + position);
        callback(null, result);
    });
}

exports.getWeather = function(position, callback) {
    fetch(weatherCache, 'weather', position, callback);
};

exports.getForecast = function(position, callback) {
    fetch(forecastCache, 'forecast', position, callback);
};
