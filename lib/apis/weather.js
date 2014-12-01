/** Dependencies */
var ENV     = require('../env');
var fb      = require('../firebase.js');
var unirest = require('unirest');
var util    = require('util');
var _       = require('lodash');


/** @const */
var API_ENDPOINT    = ENV.get('kimonolabs_endpoint');
var API_KEY         = ENV.get('kimonolabs_api_key');
var API_WEATHER     = ENV.get('weather_api');
var NAME            = 'weather';
var UPDATE_INTERVAL = 1800;  // in seconds


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
  this._api_endpoint    = API_ENDPOINT + API_WEATHER + '?apikey=' + API_KEY;
  
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
      cb(res.body);
    });
  },
  
  
  
  /**
   * Format into DB form
   *
   * @returns {object}
   */
  _format: function(data) {
    // to Celcius
    var toC = function(f) { return Math.round((f-32)*(5/9)); };
    
    // parse
    var last_updated = new Date(data.thisversionrun);
    var forecast = data.results.forecast[0];
    var temp = parseInt(forecast.temp);
    var dew  = parseInt(forecast.dewpoint);
    forecast.temp     = { f: temp, c: toC(temp) };
    forecast.dewpoint = { f: dew,  c: toC(dew) };
    forecast.rel_hum  = parseInt(forecast.rel_hum);

    delete forecast['day'];
    delete forecast['time'];
    
    // return
    forecast.last_updated = last_updated;
    return forecast;
  }
  
};


/** Export */
module.exports = WeatherAPI = new WeatherAPI();