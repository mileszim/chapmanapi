/**
 * ENV
 *
 * @constructor
 */
var ENV = function() {
  if (process.env.NODE_ENV === 'production') {
    this.env = require('./process.js');
  } else {
    this.env = require('dotfun')('.env');
  }
};

ENV.prototype = {
  
  get: function(key) {
    return this.env.get(key.toUpperCase());
  },
  
  set: function(key, value) {
    this.env.set(key.toUpperCase(), value);
  }
  
};


/** export */
module.exports = ENV = new ENV();