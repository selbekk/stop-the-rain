
exports.etaRainStop = function(data){

    var firstNonRainyPeriod = _.find(data.list, function(item) {
        return item.weather[0].main.toLowerCase().indexOf('rain') === -1;
    });

    return Date.parse(firstNonRainyPeriod.dt_txt) - Date.now();
};

exports.etaRainStart = function(data){
    var firstRainPeriod = _.find(data.list, function(item){
        return item.weather[0].main.toLowerCase().indexOf('rain') === 1;
    });

    return Date.parse(firstRainPeriod.dt_txt) - Date.now();
};