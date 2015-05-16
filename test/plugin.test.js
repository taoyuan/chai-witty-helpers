/* global describe, it, expect */

var plugin = require('..')
  , Test = require('../lib/test');

describe('plugin', function() {
  
  var chai = {};
  plugin(chai);
  
  it('should add witty helper to chai', function() {
    expect(chai.witty).to.be.an('object');
    expect(chai.witty.helper).to.be.a('function');
    expect(chai.witty.dynamicHelper).to.be.a('function');
  });
  
  describe('when helper is invoked', function() {
    var test = chai.witty.helper();
    
    it('should return test wrapper', function() {
      expect(test).to.be.an.instanceOf(Test);
    });
  });
  
  describe('when dynamicHelper is invoked', function() {
    var test = chai.witty.dynamicHelper();
    
    it('should return test wrapper', function() {
      expect(test).to.be.an.instanceOf(Test);
    });
  });
  
});
