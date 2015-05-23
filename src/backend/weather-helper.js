
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