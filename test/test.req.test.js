/* global describe, it, before, expect */

var Test = require('../lib/test');

describe('test dynamic helper that prepares request', function() {
  
  function dynamicHelper(req, res) {
    return function() {
      return 'Help me, ' + req.query.name;
    }
  }
  
  describe('sync', function() {
    
    describe('and creates', function() {
      var help;
    
      before(function(done) {
        var test = new Test(dynamicHelper, 'test', 'show', true);
        test.req(function(req) {
          req.query = {};
          req.query.name = 'Rhonda';
        }).create(function(err, h) {
          if (err) { return done(err); }
          help = h;
          done();
        });
      });
    
      it('should create helper', function() {
        expect(help).to.be.a('function');
        expect(help()).to.equal('Help me, Rhonda');
      });
    });
    
  });
  
  describe('async', function() {
    
    describe('and creates', function() {
      var help;
    
      before(function(done) {
        var test = new Test(dynamicHelper, 'test', 'show', true);
        test.req(function(req, done) {
          req.query = {};
          req.query.name = 'asynchronously, Rhonda';
          process.nextTick(done);
        }).create(function(err, h) {
          if (err) { return done(err); }
          help = h;
          done();
        });
      });
    
      it('should create helper', function() {
        expect(help).to.be.a('function');
        expect(help()).to.equal('Help me, asynchronously, Rhonda');
      });
    });
    
  });
  
});
