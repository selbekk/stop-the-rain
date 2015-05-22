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
            var stopRainButton = this.state.isRaining && !this.state.waiting ?
                <input type="button" value="Stop the rain!" onClick={this.stopTheRain}/> : null;
            var waitingImage = this.state.waiting ? (
                <div>
                    <p>Contacting weather gods...</p>
                    <img src="/assets/ajax-loader.gif" alt="waiting for the rain to stop"/>
                </div>) : null;

            return (
                <div>
                    <h1>Is It Raining?</h1>

                    <h2>{this.state.isRaining === null ? 'NO IDEA' : this.state.isRaining ? 'YES :(' : 'NO! :D'}</h2>
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
        waiting: false
    };

    setInterval(getData(), 60000);

    function getData() {
        navigator.geolocation.getCurrentPosition(function (position) {
            var r = new XMLHttpRequest();
            r.open('GET', '/api/check-weather?lat=' + position.coords.latitude + '&lng=' + position.coords.longitude);
            r.onreadystatechange = function () {
                if (r.readyState != 4 || r.status != 200) return;
                that.state = JSON.parse(r.responseText);
                updateCallback();
            };
            r.send();
        });
    }

}

RainIndicatorStore.prototype.getState = function () {
    return this.state;
};

RainIndicatorStore.prototype.update = function (newState) {
    _.assign(this.state, newState);
};
