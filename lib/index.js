module.exports = function(chai, _) {
  var Test = require('./test');
  
  chai.locomotive = chai.locomotive || {};
  chai.locomotive.dynamicHelper = function(setup, controller, action) {
    return new Test(setup, controller, action);
  };
};
