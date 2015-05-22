var moment = require('moment');

var store = {};

function Cache(opts) {
    this.timeout = opts.timeout || 10; // minutes
    this.timeoutUnit = opts.timeoutUnit || 'minutes';
}

var makeKey = function(position) {
    return parseFloat(position.lat).toFixed(2) + ',' + parseFloat(position.lng).toFixed(2);
};

Cache.prototype.get = function(key) {
    var hit = this.store[makeKey(key)];

    if(!hit) return;

    var isValid = moment().subtract(this.timeout, this.timeoutUnit).isAfter(hit.timestamp);
    return isValid ? hit.data : undefined;
};

Cache.prototype.put = function(key, data) {

    this.store[makeKey(key)] = {
        data: data,
        timestamp: moment()
    };
};

module.exports = Cache;
