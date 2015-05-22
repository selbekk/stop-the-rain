var moment = require('moment');

var write = function(msg, isErr) {
    var printer = isErr ? console.error : console.log;

    printer(moment().format() + ': ' + msg);
}

exports.trace = function(msg) {
    write('[TRACE] ' + msg);
};
exports.debug = function(msg) {
    write('[DEBUG] ' + msg);
};
exports.info = function(msg) {
    write('[INFO] ' + msg);
};
exports.warn = function(msg) {
    write('[WARN] ' + msg, true);
};
exports.error = function(msg) {
    write('[ERROR] ' + msg, true);
};
exports.fatal = function(msg) {
    write('[FATAL] ' + msg, true);
};
