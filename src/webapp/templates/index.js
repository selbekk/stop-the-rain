var Handlebars = require("handlebars");
 exports["app"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "        <button type=\"button\" class=\"stop-the-rain-button js-stop-the-rain\">Stop the rain</button>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"weather\">\n    <h1 class=\"weather-headline\">"
    + alias3(((helper = (helper = helpers.headline || (depth0 != null ? depth0.headline : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"headline","hash":{},"data":data}) : helper)))
    + "</h1>\n    <h2 class=\"weather-status\">"
    + alias3(((helper = (helper = helpers.weather || (depth0 != null ? depth0.weather : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"weather","hash":{},"data":data}) : helper)))
    + "</h2>\n    <div class=\"weather-icon "
    + alias3(((helper = (helper = helpers.weatherClass || (depth0 != null ? depth0.weatherClass : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"weatherClass","hash":{},"data":data}) : helper)))
    + "\"></div>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isRaining : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    <p class=\"weather-eta js-weather-eta\">We should have this fixed <span class=\"weather-eta-time js-time\"></span>.</p>\n</div>";
},"useData":true});