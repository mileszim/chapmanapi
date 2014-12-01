/** Dependencies */
var ENV     = require('../env');
var fb      = require('../firebase.js');
var unirest = require('unirest');
var RSVP    = require('rsvp');
var util    = require('util');


/** @const */
var API_ENDPOINT    = ENV.get('kimonolabs_endpoint');
var API_KEY         = ENV.get('kimonolabs_api_key');
var API_STUDENTS    = ENV.get('jobs_students_api');
var API_FACULTY     = ENV.get('jobs_faculty_api');
var API_STAFF       = ENV.get('jobs_staff_api');
var NAME            = 'jobs';
var UPDATE_INTERVAL = 3600;  // in seconds


/**
 * API
 * Jobs
 *
 * @constructor
 */
var JobsAPI = function() {
  // Details
  this._name =     NAME;
  this._endpoint = NAME;
  this._node     = NAME;
  
  // API
  this._update_interval = UPDATE_INTERVAL * 1000;
  this._api_endpoints = {
    students: API_ENDPOINT + API_STUDENTS + '?apikey=' + API_KEY,
    faculty:  API_ENDPOINT + API_FACULTY  + '?apikey=' + API_KEY,
    staff:    API_ENDPOINT + API_STAFF    + '?apikey=' + API_KEY
  };
  
  // Update on interval
  this.updater = setInterval(this._update.bind(this), this._update_interval);
};


JobsAPI.prototype = {
  
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
      for (var k in data) { data[k] = _this._format(data[k]); }
      fb.update(_this._node, data);
    });
  },
  
  
  
  /**
   * Fetch the data
   */
  _fetch: function(cb) {
    // RSVP request promise
    var request = function(url) {
      return new RSVP.Promise(function(resolve, reject) {
        unirest.get(url).end(function(res) {
          if (res.ok) {
            resolve(res.body);
          } else {
            reject({ url: url, error: res.error});
          }
        });
      });
    };
    
    // Get the data
    var _this = this;
    RSVP.hash({
      students: request(_this._api_endpoints.students),
      faculty:  request(_this._api_endpoints.faculty),
      staff:    request(_this._api_endpoints.staff)
    })
    .then(function(response) {
      cb(response);
    })
    .catch(function(error) {
      util.log(error);
    });
  },
  
  
  
  /**
   * Format into DB form
   *
   * @returns {object}
   */
  _format: function(data) {
    var jobs = {};
    data.results.position.forEach(function(job) {
      job.last_updated = new Date(data.thisversionrun);
      jobs[job.id] = job;
    });
    return jobs;
  }
  
};


/** Export */
module.exports = JobsAPI = new JobsAPI();