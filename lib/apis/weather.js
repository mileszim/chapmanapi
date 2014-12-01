/** Dependencies */
var ENV     = require('../env');
var fb      = require('../firebase.js');
var unirest = require('unirest');
var util    = require('util');


/** @const */
var API_ENDPOINT    = ENV.get('weather_endpoint');
var NAME            = 'weather';
var UPDATE_INTERVAL = 60;  // in seconds


/**
 * API
 * Weather
 *
 * @constructor
 */
var WeatherAPI = function() {
	// Details
	this._name =     NAME;
	this._endpoint = NAME;
	this._node     = NAME;
	
	// API
	this._update_interval = UPDATE_INTERVAL * 1000;
	this._api_endpoint    = API_ENDPOINT + '?callback=callback'
	
	// Update on interval
	this.updater = setInterval(this._update.bind(this), this._update_interval);
};


WeatherAPI.prototype = {
	
  /**
   * Query
   */
  query: function(q, cb) {
    if (!cb) cb = q;
    fb.find(this._parseQuery(q), function(data) {
      cb(data);
    });
  },



  /**
   * Query Params
   */
  _parseQuery: function(q) {
    // no query
    if (!q) return this._node;

    var node = [this._node];
    if (q.structure) {
      node.push(q.structure);
    }
    return node.join('/');
  },



  /**
   * Update data
   */
  _update: function() {
    var _this = this;
    this._fetch(function(data) {
      fb.update(_this._node, _this._format(data));
    });
  },
	
	
	
	/**
	 * Fetch the data
	 */
	_fetch: function(cb) {
    unirest
    .get(this._api_endpoint)
    .end(function(res) {
      var data = JSON.parse(res.body.replace('callback(', '').replace('})', '}'));
      cb(data.weather);
    });
	},
	
	
	
	/**
	 * Format into DB form
	 *
	 * @returns {object}
	 */
	_format: function(data) {
    return {
      temperature: {
        fahrenheit: data.temp_f,
        celsius:    data.temp_c
      }
    };
	}
	
};


/** Export */
module.exports = WeatherAPI = new WeatherAPI();