/** Dependencies */
var ENV     = require('../env');
var fb      = require('../firebase.js');
var unirest = require('unirest');
var util    = require('util');


/** @const */
var API_ENDPOINT    = ENV.get('parking_endpoint');
var NAME            = 'parking';
var UPDATE_INTERVAL = 10;


/**
 * API
 * Parking
 *
 * @constructor
 */
var ParkingAPI = function() {
  // Details
  this._name =     NAME;
  this._endpoint = NAME;
  this._node     = NAME;
  
  // API
  this._api_endpoint    = API_ENDPOINT;
  this._update_interval = UPDATE_INTERVAL * 1000;
  
  // Update on interval
  this.updater = setInterval(this._update.bind(this), this._update_interval);
};


ParkingAPI.prototype = {
  
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
    var _this = this;
    unirest
    .get(this._api_endpoint)
    .end(function(res) {
      var data = res.body;
      cb(data);
    });
  },
  
  
  
  /**
   * Format into DB form
   *
   * @returns {object}
   */
  _format: function(data) {
    var mapped = data.Structures.map(function(s) {
      return {
        name:         s.Name,
        capacity:     s.Capacity,
        available:    s.CurrentCount,
        last_updated: eval('new ' + s.Timestamp.replace(/\//g,'')),
        levels: s.Levels.map(function(l) {
          return {
            name:      l.SystemName,
            capacity:  l.Capacity,
            available: l.CurrentCount
          };
        })
      }
    });
    
    var formatted = {};
    mapped.forEach(function(structure) {
      var levels = {};
      structure.levels.forEach(function(level) {
        var id = level.name.toLowerCase();
        if (id !== 'all') levels[id] = level;
      });
      structure.levels = levels;
      var id = structure.name.toLowerCase().split(' ')[0];
      formatted[id] = structure;
    });
    return formatted;
  }
  
};


/** Export */
module.exports = ParkingAPI = new ParkingAPI();