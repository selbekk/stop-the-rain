var request = require('request');

var url = 'http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID=ec7597638cf8f4cfb067e2ed0dc7f2d9';

exports.getWeather = function(position, callback) {
    var reqUrl = url.replace('{lat}', position.lat).replace('{lon}', position.lng);
    request(reqUrl, function(err, res, body) {
        if(err || res.statusCode !== 200) {
            console.error('problem fetching data from API', err);
            return callback(err);
        }

        callback(null, JSON.parse(body));
    });
};
