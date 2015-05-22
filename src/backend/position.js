var Position = function(opts) {
    this.lat = parseFloat(opts.lat).toFixed(4);
    this.lng = parseFloat(opts.lng).toFixed(4);
}

Position.prototype.isValid = function() {
    return this.lat && this.lng;
};

Position.prototype.toString = function() {
    return 'lat: ' + this.lat + ', lng: ' + this.lng;
};

module.exports = Position;
