/* global describe, it, expect */

var plugin = require('..')
  , Test = require('../lib/test');

describe('plugin', function() {
  
  var chai = {};
  plugin(chai);
  
  it('should add locomotive helper to chai', function() {
    expect(chai.locomotive).to.be.an('object');
    expect(chai.locomotive.helper).to.be.a('function');
    expect(chai.locomotive.dynamicHelper).to.be.a('function');
  });
  
  describe('when helper is invoked', function() {
    var test = chai.locomotive.helper();
    
    it('should return test wrapper', function() {
      expect(test).to.be.an.instanceOf(Test);
    });
  });
  
  describe('when dynamicHelper is invoked', function() {
    var test = chai.locomotive.dynamicHelper();
    
    it('should return test wrapper', function() {
      expect(test).to.be.an.instanceOf(Test);
    });
  });
  
});
