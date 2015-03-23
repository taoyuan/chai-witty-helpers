/* global describe, it, expect */

var maglev = require('..');

describe('chai-maglev-function', function() {
  
  it('should export function', function() {
    expect(maglev).to.be.an('function');
  });
  
});
