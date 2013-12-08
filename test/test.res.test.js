/* global describe, it, before, expect */

var Test = require('../lib/test');

describe('test dynamic helper that prepares response', function() {
  
  function dynamicHelper(req, res) {
    return function() {
      return 'Help me, ' + res.locals.name;
    };
  }
  
  describe('sync', function() {
    
    describe('and creates', function() {
      var help;
    
      before(function(done) {
        var test = new Test(dynamicHelper, 'test', 'show', true);
        test.res(function(res) {
          res.locals = {};
          res.locals.name = 'I think I\"m falling';
        }).create(function(err, h) {
          if (err) { return done(err); }
          help = h;
          done();
        });
      });
    
      it('should create helper', function() {
        expect(help).to.be.a('function');
        expect(help()).to.equal('Help me, I think I\"m falling');
      });
    });
    
  });
  
});
