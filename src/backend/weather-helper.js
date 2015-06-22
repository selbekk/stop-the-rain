var _ = require('lodash');
var codeMappings = require('./weather-codes');


exports.etaRainStop = function(data){

    var firstNonRainyPeriod = _.find(data.list, function(item) {
        return item.weather[0].main.toLowerCase().indexOf('rain') === -1;
    });

    return firstNonRainyPeriod.dt_txt;
};

exports.etaRainStart = function(data){
    var firstRainPeriod = _.find(data.list, function(item){
        return item.weather[0].main.toLowerCase().indexOf('rain') === 1;
    });

    return firstRainPeriod.dt_txt;
};

exports.resolveCode = function(code) {
    var result;

    codeMappings.forEach(function(mapping) {
        if(code >= mapping.from && code < mapping.to) {
            result = mapping.name;
        }
    });

    return result ? result : 'unknown';
};

exports.isRaining = function() {

};
