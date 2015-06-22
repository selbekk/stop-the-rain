var Handlebars = require("handlebars");
 exports["app"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "        <button type=\"button\" class=\"stop-the-rain-button js-stop-the-rain\">Stop the rain</button>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"weather\">\n    <h1 class=\"weather-headline\">"
    + alias3(((helper = (helper = helpers.headline || (depth0 != null ? depth0.headline : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"headline","hash":{},"data":data}) : helper)))
    + "</h1>\n    <h2 class=\"weather-status\">"
    + alias3(((helper = (helper = helpers.weather || (depth0 != null ? depth0.weather : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"weather","hash":{},"data":data}) : helper)))
    + "</h2>\n\n    <div class=\"weather-icon-container\">\n        "
    + ((stack1 = ((helper = (helper = helpers.iconHtml || (depth0 != null ? depth0.iconHtml : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"iconHtml","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n    </div>\n\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isRaining : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    <p class=\"weather-eta js-weather-eta\">We should have this fixed <span class=\"weather-eta-time js-time\"></span>.</p>\n</div>\n";
},"useData":true});
exports["generalError"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"weather error\">\n    <img src=\"/assets/img/error.png\" alt=\"Picture of shit.\" />\n    <h1>Shit.</h1>\n    <p><strong>We fucked up. Our bad.</strong></p>\n    <p>Check back later.</p>\n</div>";
},"useData":true});
exports["noLocation"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"weather error\">\n    <img src=\"/assets/img/no-location.png\" alt=\"No location.\" />\n    <h1>Sorry!</h1>\n    <p><strong>We don't know where you are.</strong></p>\n    <p>We hope it rains a lot though.</p>\n</div>";
},"useData":true});
exports["noNetwork"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"weather error\">\n    <img src=\"/assets/img/no-network.png\" alt=\"No interwebs!\" />\n    <h1>No internet!</h1>\n    <p><strong>We can't help you without the internet.</strong></p>\n    <p>We will still stop the rain, but it will take longer.</p>\n    <p>And that's your fault.</p>\n</div>";
},"useData":true});
exports["notSupported"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"weather error\">\n    <img src=\"/assets/img/not-supported.png\" alt=\"Picture of an old geezer, like you.\" />\n    <h1>Sorry!</h1>\n    <p><strong>We don't support old people.</strong></p>\n    <p>Come back when you have a proper browser.</p>\n</div>";
},"useData":true});
exports["cloudy"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"icon cloudy\">\n  <div class=\"icon-cloud\"></div>\n  <div class=\"icon-cloud\"></div>\n</div>\n";
},"useData":true});
exports["rainy"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"icon rainy\">\n  <div class=\"icon-cloud\"></div>\n  <div class=\"icon-rain\"></div>\n</div>\n";
},"useData":true});
exports["snowy"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"icon snowy\">\n  <div class=\"icon-cloud\"></div>\n  <div class=\"icon-snow\">\n    <div class=\"icon-snow-flake\"></div>\n    <div class=\"icon-snow-flake\"></div>\n  </div>\n</div>\n";
},"useData":true});
exports["sun-shower"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"icon sun-shower\">\n  <div class=\"icon-cloud\"></div>\n  <div class=\"icon-sun\">\n    <div class=\"icon-sun-rays\"></div>\n  </div>\n  <div class=\"icon-rain\"></div>\n</div>\n";
},"useData":true});
exports["sunny"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"icon sunny\">\n  <div class=\"icon-sun\">\n    <div class=\"icon-sun-rays\"></div>\n  </div>\n</div>\n";
},"useData":true});
exports["thunder-storms"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"icon thunder-storm\">\n  <div class=\"icon-cloud\"></div>\n  <div class=\"icon-lightning\">\n    <div class=\"icon-lightning-bolt\"></div>\n    <div class=\"icon-lightning-bolt\"></div>\n  </div>\n</div>\n";
},"useData":true});