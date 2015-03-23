/* global describe, it, expect */

var plugin = require('..')
  , Test = require('../lib/test');

describe('plugin', function() {
  
  var chai = {};
  plugin(chai);
  
  it('should add maglev helper to chai', function() {
    expect(chai.maglev).to.be.an('object');
    expect(chai.maglev.helper).to.be.a('function');
    expect(chai.maglev.dynamicHelper).to.be.a('function');
  });
  
  describe('when helper is invoked', function() {
    var test = chai.maglev.helper();
    
    it('should return test wrapper', function() {
      expect(test).to.be.an.instanceOf(Test);
    });
  });
  
  describe('when dynamicHelper is invoked', function() {
    var test = chai.maglev.dynamicHelper();
    
    it('should return test wrapper', function() {
      expect(test).to.be.an.instanceOf(Test);
    });
  });
  
});
