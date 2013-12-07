/* global describe, it, expect */

var locomotive = require('..');

describe('chai-locomotive-function', function() {
  
  it('should export function', function() {
    expect(locomotive).to.be.an('function');
  });
  
});
