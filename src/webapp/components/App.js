/** @jsx React.DOM */

var React = require('react');
var RainIndicator = require('./RainIndicator.js')

module.exports = React.createFactory(React.createClass({
    render: function () {
        return <RainIndicator />;
    }
}));
