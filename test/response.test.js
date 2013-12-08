/* global describe, it, expect */

var Response = require('../lib/response');

describe('Response', function() {
  
  describe('constructor', function() {
    var res = new Response();
  
    it('should be constructed with default properties', function() {
      expect(Object.keys(res)).to.have.length(2);
      expect(res.statusCode).to.equal(200);
    });
  });
  
  describe('#setHeader', function() {
    var res = new Response();
    res.setHeader('Content-Type', 'application/json');
  
    it('should get set header', function() {
      expect(res.getHeader('Content-Type')).to.equal('application/json');
    });
  });
  
});
