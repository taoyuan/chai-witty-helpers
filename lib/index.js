module.exports = function(chai, _) {
  var Test = require('./test');

  chai.witty = chai.witty || {};
  chai.witty.helper = function(setup, controller, action) {
    return new Test(setup, controller, action);
  };
  chai.witty.dynamicHelper = function(setup, controller, action) {
    return new Test(setup, controller, action, true);
  };
};
