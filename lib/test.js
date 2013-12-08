/**
 * Module dependencies.
 */
var Application = require('./application')
  , Request = require('./request')
  , Response = require('./response');


/**
 * Creates an instance of `Test`.
 *
 * @constructor
 * @api protected
 */
function Test(setup, controller, action, isDynamic) {
  this._setup = setup;
  this._controller = controller;
  this._action = action;
  this._isDynamic = isDynamic;
}

/**
 * Register a callback to be invoked when application is prepared.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.app = function(cb) {
  this._app = cb;
  return this;
};

/**
 * Register a callback to be invoked when request is prepared.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.req = function(cb) {
  this._req = cb;
  return this;
};

/**
 * Register a callback to be invoked when response is prepared.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.res = function(cb) {
  this._res = cb;
  return this;
};

/**
 * Create initalized helper.
 *
 * @api public
 */
Test.prototype.create = function(cb) {
  var self = this
    , app = new Application()
    , req = new Request()
    , before = this._req;
  
  function ready() {
    var res = new Response()
      , helper, name;
    
    if (self._res) { self._res(res); }
    
    function next(err) {
      if (!self._next) { throw new Error('next should not be called'); }
      self._next.call(this, err);
    }
    
    req._locomotive = {};
    req._locomotive.app = app;
    req._locomotive.controller = self._controller;
    req._locomotive.action = self._action;
    
    var ctx = new Object()
      , helpers = app._helpers
      , dynamicHelpers = app._dynamicHelpers
      , key;
    for (key in helpers) {
      ctx[key] = helpers[key];
    }
    for (key in dynamicHelpers) {
      ctx[key] = dynamicHelpers[key].call(undefined, req, res);
    }
    
    if (self._isDynamic) {
      name = self._setup.name;
      helper = self._setup(req, res).bind(ctx);
      ctx[name] = helper;
    } else {
      name = self._setup.name;
      helper = self._setup.bind(ctx);
      ctx[name] = helper;
    }
    
    return cb(null, helper);
  }
  
  if (self._app) { self._app(app); }
  
  if (before && before.length == 2) {
    before(req, ready);
  } else if (before) {
    before(req);
    ready();
  } else {
    ready();
  }
};


/**
 * Expose `Test`.
 */
module.exports = Test;
