/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');


module.exports = React.createFactory(
    React.createClass({
        getInitialState: function () {
            this.store = new RainIndicatorStore(this.update);
            return this.store.getState();
        },
        update: function () {
            this.setState(this.store.getState());
        },
        stopTheRain: function () {
            this.store.update({waiting: true});
            this.setState(this.store.getState());
        },
        render: function () {
            var headline = this.state.place.name ? 'Is It Raining in ' + this.state.place.name + '?' : 'Is it raining?';
            var stopRainButton = this.state.isRaining && !this.state.waiting ?
                <input type="button" className="stop-the-rain-button" value="Stop the rain!" onClick={this.stopTheRain}/> : null;
            var waitingImage = this.state.waiting && this.state.isRaining ? (
                <div className="waiting">
                    <p className="waiting-text">Contacting the weather gods...</p>
                    <img className="waiting-animation" src="/assets/ajax-loader.gif" alt="Waiting for the rain to stop"/>
                </div>) : null;

            return (
                <div className="weather">
                    <h1 className="weather-headline">{headline}</h1>

                    <h2 className="weather-status">{this.state.isRaining === null ? 'NO IDEA' : this.state.isRaining ? 'YES :(' : 'NO! :D'}</h2>
                    {stopRainButton}
                    {waitingImage}
                </div>
            )
        }
    }));

function RainIndicatorStore(updateCallback) {
    var that = this;
    this.updateCallback = updateCallback;
    this.state = {
        isRaining: null,
        place: {name: null},
        waiting: false
    };

    setInterval(getData(), 60000);

    function getData() {
        navigator.geolocation.getCurrentPosition(function (position) {
            callServer(position);
        });
    }

    function callServer(position) {
        var r = new XMLHttpRequest();
        r.open('GET', '/api/check-weather?lat=' + position.coords.latitude + '&lng=' + position.coords.longitude);
        r.onreadystatechange = function () {
            if (r.readyState != 4 || r.status != 200) return;
            that.state = JSON.parse(r.responseText);
            updateCallback();
        };
        r.send();
    }

}

RainIndicatorStore.prototype.getState = function () {
    return this.state;
};

RainIndicatorStore.prototype.update = function (newState) {
    _.assign(this.state, newState);
};
