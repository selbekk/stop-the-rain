var moment = require('moment');

var store = {};

var timeout = 10;
var timeoutUnit = 'minutes';

var makeKey = function(position) {
    return parseFloat(position.lat).toFixed(2) + ',' + parseFloat(position.lng).toFixed(2);
};

exports.get = function(key) {
    var hit = store[makeKey(key)];

    if(!hit) return;

    var isValid = moment().subtract(timeout, timeoutUnit).isBefore(hit.timestamp);

    return isValid ? hit.data : undefined;
};

exports.put = function(key, data) {
    store[makeKey(key)] = {
        data: data,
        timestamp: moment()
    };
};
