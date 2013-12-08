/* global describe, it, before, expect */

var Test = require('../lib/test');

describe('test that prepares app', function() {
  
  describe('with helper', function() {
    function helper() {
      return 'Help me, ' + this.someone();
    }
    
    var help;
  
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
    
    var help;
  
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
  
  describe('with route', function() {
    function dynamicHelper(req, res) {
      return function() {
        var app = req._locomotive.app;
        return 'Redirecting to ' + app._routeTo('foo', 'index').path();
      }
    }
    
    var help;
  
    before(function(done) {
      var test = new Test(dynamicHelper, 'test', 'case', true);
      test.app(function(app) {
        app.route('/foo', 'foo', 'index');
      }).create(function(err, h) {
        if (err) { return done(err); }
        help = h;
        done();
      });
    });
  
    it('should create helper', function() {
      expect(help).to.be.a('function');
      expect(help()).to.equal('Redirecting to /foo');
    });
  });
  
  describe('with route with placeholder', function() {
    function dynamicHelper(req, res) {
      return function() {
        var app = req._locomotive.app;
        return 'Redirecting to ' + app._routeTo('foo', 'show').path({ id: 123 });
      }
    }
    
    var help;
  
    before(function(done) {
      var test = new Test(dynamicHelper, 'test', 'case', true);
      test.app(function(app) {
        app.route('/foo/:id', 'foo', 'show');
      }).create(function(err, h) {
        if (err) { return done(err); }
        help = h;
        done();
      });
    });
  
    it('should create helper', function() {
      expect(help).to.be.a('function');
      expect(help()).to.equal('Redirecting to /foo/123');
    });
  });
  
  describe('with route with placeholder and optional format', function() {
    function dynamicHelper(req, res) {
      return function() {
        var app = req._locomotive.app;
        return 'Redirecting to ' + app._routeTo('foo', 'show').path({ id: 123, format: 'json' });
      }
    }
    
    var help;
  
    before(function(done) {
      var test = new Test(dynamicHelper, 'test', 'case', true);
      test.app(function(app) {
        app.route('/foo/:id.:format?', 'foo', 'show');
      }).create(function(err, h) {
        if (err) { return done(err); }
        help = h;
        done();
      });
    });
  
    it('should create helper', function() {
      expect(help).to.be.a('function');
      expect(help()).to.equal('Redirecting to /foo/123.json');
    });
  });
  
  describe('with route with placeholder and optional format that is not specified', function() {
    function dynamicHelper(req, res) {
      return function() {
        var app = req._locomotive.app;
        return 'Redirecting to ' + app._routeTo('foo', 'show').path({ id: 123 });
      }
    }
    
    var help;
  
    before(function(done) {
      var test = new Test(dynamicHelper, 'test', 'case', true);
      test.app(function(app) {
        app.route('/foo/:id.:format?', 'foo', 'show');
      }).create(function(err, h) {
        if (err) { return done(err); }
        help = h;
        done();
      });
    });
  
    it('should create helper', function() {
      expect(help).to.be.a('function');
      expect(help()).to.equal('Redirecting to /foo/123');
    });
  });
  
  describe('with dynamic helper that uses model awareness', function() {
    function dynamicHelper(req, res) {
      return function(obj) {
        var app = req._locomotive.app;
        return 'Looking at ' + app._recordOf(obj);
      }
    }
    
    var help;
  
    before(function(done) {
      var test = new Test(dynamicHelper, 'test', 'case', true);
      test.create(function(err, h) {
        if (err) { return done(err); }
        help = h;
        done();
      });
    });
  
    it('should create helper', function() {
      function Animal() {};
      
      expect(help).to.be.a('function');
      expect(help(new Animal())).to.equal('Looking at Animal');
    });
  });
  
  describe('with dynamic helper that uses current controller and action', function() {
    function dynamicHelper(req, res) {
      return function() {
        return 'Redirecting from ' + req._locomotive.controller + '#' + req._locomotive.action;
      }
    }
    
    var help;
  
    before(function(done) {
      var test = new Test(dynamicHelper, 'test', 'case', true);
      test.create(function(err, h) {
        if (err) { return done(err); }
        help = h;
        done();
      });
    });
  
    it('should create helper', function() {
      expect(help).to.be.a('function');
      expect(help()).to.equal('Redirecting from test#case');
    });
  });
  
});
