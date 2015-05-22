var request = require('request');

var cache = require('./util/cache');
var log = require('./util/logger');

var BASE_URL = 'http://api.openweathermap.org/data/2.5/';
var API_KEY = 'ec7597638cf8f4cfb067e2ed0dc7f2d9';

var createUrl = function(endpoint, position) {
    return BASE_URL + endpoint + '?lat=' + position.lat + '&lon=' + position.lng + '&APPID=' + API_KEY;
};

exports.getWeather = function(position, callback) {
    var reqUrl = createUrl('weather', position);

    var cached = cache.get(position);
    if(cached) {
        log.debug('returning a cached version of the weather');
        return callback(null, cached);
    }

    log.debug('not cached, hitting up the API');

    request(reqUrl, function(err, res, body) {
        if(err || res.statusCode !== 200) {
            log.warn('problem fetching data from API: ' + err);
            return callback(err);
        }
        var result = JSON.parse(body);
        cache.put(position, result);

        callback(null, result);
    });
};

exports.getForecast = function(position, callback) {
    // TODO: cache!
    var reqUrl = createUrl('forecast', position);

    request(reqUrl, function(err, res, body) {
        if(err || res.statusCode !== 200) {
            log.warn('problem fetching data from API: ' + err);
            return callback(err);
        }
        var result = JSON.parse(body);

        callback(null, result);
    });
};
