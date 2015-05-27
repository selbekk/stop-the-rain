var Snap = require('snapsvg');

// 640 480
var WIDTH = 640;
var HEIGHT = 480;
var OUTLINE = 30;
var s = Snap("#svg");

function rInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function rNoise(lmin, lmax, rmax) {
    for (var i=0; i < 150; i++) {
        var c = s.circle(rInt(0, WIDTH), rInt(OUTLINE, HEIGHT-OUTLINE), 0);
        c.attr({ fill: "#bdc3c7" });
        c.animate({r: rInt(2, rmax), fill: "#ecf0f1"}, rInt(lmin, lmax), mina.easeInExpo, function() {
            this.remove();
        });
    }
}

rNoise(3500, 10000, 14);
setInterval(function() {
    rNoise(3500, 7000, 14);
}, 5000);
