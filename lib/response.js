/**
 * Creates an instance of `Response`.
 *
 * This class is used as a mock when testing Locomotive helpers, substituted in
 * place of of a Node's `http.ServerResponse`.
 *
 * @constructor
 * @api protected
 */
function Response() {
  this.statusCode = 200;
  this._headers = {};
}

Response.prototype.getHeader = function(name) {
  return this._headers[name];
};

Response.prototype.setHeader = function(name, value) {
  this._headers[name] = value;
};


/**
 * Expose `Response`.
 */
module.exports = Response;
