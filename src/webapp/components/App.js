/** @jsx React.DOM */

var React = require('react');
var RainIndicator = require('./RainIndicator.js')

module.exports = React.createClass({
    render: function () {
        return React.createElement(RainIndicator)
    }
});
