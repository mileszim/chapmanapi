/** Dependencies */
var ENV     = require('../env');
var fb      = require('../firebase.js');
var unirest = require('unirest');
var util    = require('util');


/** @const */
var API_ENDPOINT    = ENV.get('kimonolabs_endpoint');
var API_KEY         = ENV.get('kimonolabs_api_key');
var API_STUDENTS    = ENV.get('jobs_students_api');
var NAME            = 'jobs';
var UPDATE_INTERVAL = 2;  // in seconds


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
		students: API_ENDPOINT + API_STUDENTS + '?apikey=' + API_KEY
	};
	
	// Update on interval
	//this.updateInterval = setInterval(this._update.bind(this), this._api_poll);
};


JobsAPI.prototype = {
	
	// /**
	//  * Query
	//  */
	// query: function(q, cb) {
	// 	if (!cb) cb = q;
	// 	fb.find(this._parseQuery(q), function(data) {
	// 		cb(data);
	// 	});
	// },
	//
	//
	//
	// /**
	//  * Query Params
	//  */
	// _parseQuery: function(q) {
	// 	// no query
	// 	if (!q) return this._node;
	//
	// 	var node = [this._node];
	// 	if (q.structure) {
	// 		node.push(q.structure);
	// 	}
	// 	return node.join('/');
	// },
	//
	//
	//
	// /**
	//  * Update data
	//  */
	// _update: function() {
	// 	var _this = this;
	// 	this._fetch(function(data) {
	// 		fb.update(_this._node, _this._format(data));
	// 	});
	// },
	
	
	
	/**
	 * Fetch the data
	 */
	_fetch: function(cb) {
		var _this = this;
		unirest
		.get(this._api_endpoints.students)
		.end(function(res) {
			var data = res.body;
			cb(data.results.position);
		});
	},
	
	
	
	/**
	 * Format into DB form
	 *
	 * @returns {object}
	 */
	_format: function(data) {
		var jobs = {};
		data.forEach(function(job) {
			jobs[job.id] = job;
		});
		return jobs;
	}
	
};


/** Export */
module.exports = JobsAPI = new JobsAPI();