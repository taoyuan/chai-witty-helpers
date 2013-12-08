/* global describe, it, before, expect */

var Test = require('../lib/test');

describe('test helper that prepares app', function() {
  
  describe('with helper', function() {
    function helper() {
      return 'Help me, ' + this.someone();
    }
  
    before(function(done) {
      var test = new Test(helper, 'test', 'show');
      test.app(function(app) {
        app.helper('someone', function() { return 'Dave'; });
      }).create(function(err, h) {
        if (err) { return done(err); }
        help = h;
        done();
      });
    });
  
    it('should create helper', function() {
      expect(help).to.be.a('function');
      expect(help()).to.equal('Help me, Dave');
    });
  });
  
  describe('with dynamic helper', function() {
    function helper() {
      return 'Help me, ' + this.someone();
    }
  
    before(function(done) {
      var test = new Test(helper, 'test', 'show');
      test.app(function(app) {
        app.dynamicHelper('someone', function(req, res) {
          return function() { return req.query.name; }
        });
      }).req(function(req) {
        req.query = {};
        req.query.name = 'Bob';
      }).create(function(err, h) {
        if (err) { return done(err); }
        help = h;
        done();
      });
    });
  
    it('should create helper', function() {
      expect(help).to.be.a('function');
      expect(help()).to.equal('Help me, Bob');
    });
  });
  
});
