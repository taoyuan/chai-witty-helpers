var Entry = require('./entry');

/**
 * Creates an instance of `Application`.
 *
 * This class is used as a mock when testing Locomotive helpers, substituted in
 * place of of a `locomotive.Application`.
 *
 * @constructor
 * @api protected
 */
function Application() {
  this._entries = {};
  this._helpers = {};
}

Application.prototype.helper = function(name, fn) {
  this._helpers[name] = fn;
}

Application.prototype.route = function(path, controller, action) {
  var entry = new Entry(controller, action, path)
    , key = controller + '#' + action;
  this._entries[key] = entry;
}

Application.prototype._routeTo = function(controller, action) {
  var key = controller + '#' + action;
  return this._entries[key];
}

Application.prototype._recordOf = function(obj) {
  if (typeof obj === 'object') { return obj.constructor.name; }
  return undefined;
};


/**
 * Expose `Application`.
 */
module.exports = Application;
