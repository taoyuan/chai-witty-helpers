module.exports = function(chai, _) {
  var Test = require('./test');
  
  chai.maglev = chai.maglev || {};
  chai.maglev.helper = function(setup, controller, action) {
    return new Test(setup, controller, action);
  };
  chai.maglev.dynamicHelper = function(setup, controller, action) {
    return new Test(setup, controller, action, true);
  };
};
