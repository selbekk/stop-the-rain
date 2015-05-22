var moment = require('moment');

var Cache = function(opts) {
    var store = {};
    var timeout = opts.timeout || 10;
    var timeoutUnit = opts.timeoutUnit || 'minutes';

    var makeKey = function(position) {
        return parseFloat(position.lat).toFixed(2) + ',' + parseFloat(position.lng).toFixed(2);
    };

    this.get = function(key) {
        var hit = store[makeKey(key)];

        if(!hit) return;

        var isValid = moment().subtract(timeout, timeoutUnit).isBefore(hit.timestamp);

        return isValid ? hit.data : undefined;
    };

    this.put = function(key, data) {
        store[makeKey(key)] = {
            data: data,
            timestamp: moment()
        };
    };
};

module.exports = Cache;
