/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        this.store = new RainIndicatorStore(this.update);
        return store.getState;
    },
    update: function () {
        this.setState(this.store.getState());
    },
    render: function () {
        return (
            <div>
                <h1>Is It Raining?</h1>

                <h2>{this.state.isRaining ? 'YES :(' : 'NO! :D'}</h2>
            </div>
        )
    }
});

function RainIndicatorStore(updateCallback) {
    var that = this;
    this.updateCallback = updateCallback;
    this.state = {
        isRaining: null
    };

    getData();
    setInterval(getData(), 60000);

    function getData() {
        var r = new XMLHttpRequest();
        r.open('GET', '/api/check-weather');
        r.onreadystatechange = function () {
            if (r.readyState != 4 || r.status != 200) return;
            alert('Fetched data: ' + r.responseText);
            that.state = JSON.parse(r.responseText);
            updateCallback();
        };
        r.send('lat=59.9127300&lng=10.7460900');
    }

}

RainIndicatorStore.prototype.getState = function () {
    return this.state;
};
