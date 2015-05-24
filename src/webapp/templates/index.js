var Handlebars = require("handlebars");
 exports["app"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "        <button type=\"button\" class=\"stop-the-rain-button js-stop-the-rain\">Stop the rain</button>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"weather\">\r\n    <h1 class=\"weather-headline\">"
    + alias3(((helper = (helper = helpers.headline || (depth0 != null ? depth0.headline : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"headline","hash":{},"data":data}) : helper)))
    + "</h1>\r\n    <h2 class=\"weather-status\">"
    + alias3(((helper = (helper = helpers.weather || (depth0 != null ? depth0.weather : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"weather","hash":{},"data":data}) : helper)))
    + "</h2>\r\n    <div class=\"weather-icon "
    + alias3(((helper = (helper = helpers.weatherClass || (depth0 != null ? depth0.weatherClass : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"weatherClass","hash":{},"data":data}) : helper)))
    + "\"></div>\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isRaining : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    <p class=\"weather-eta js-weather-eta\">We should have this fixed <span class=\"weather-eta-time js-time\"></span>.</p>\r\n</div>";
},"useData":true});
exports["generalError"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"weather error\">\r\n    <img src=\"/assets/img/error.png\" alt=\"Picture of shit.\" />\r\n    <h1>Shit.</h1>\r\n    <p><strong>We fucked up. Our bad.</strong></p>\r\n    <p>Check back later.</p>\r\n</div>";
},"useData":true});
exports["noLocation"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"weather error\">\r\n    <img src=\"/assets/img/no-location.png\" alt=\"No location.\" />\r\n    <h1>Sorry!</h1>\r\n    <p><strong>We don't know where you are.</strong></p>\r\n    <p>We hope it rains a lot though.</p>\r\n</div>";
},"useData":true});
exports["noNetwork"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"weather error\">\r\n    <img src=\"/assets/img/no-network.png\" alt=\"No interwebs!\" />\r\n    <h1>No internet!</h1>\r\n    <p><strong>We can't help you without the internet.</strong></p>\r\n    <p>We will still stop the rain, but it will take longer.</p>\r\n    <p>And that's your fault.</p>\r\n</div>";
},"useData":true});
exports["notSupported"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"weather error\">\r\n    <img src=\"/assets/img/not-supported.png\" alt=\"Picture of an old geezer, like you.\" />\r\n    <h1>Sorry!</h1>\r\n    <p><strong>We don't support old people.</strong></p>\r\n    <p>Come back when you have a proper browser.</p>\r\n</div>";
},"useData":true});