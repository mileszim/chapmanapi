/** Dependencies */
var util = require('util');
var ENV  = require('./env');
var FB   = require('firebase');



/**
 * Firebase Hook
 *
 * @constructor
 */
var Firebase = function() {
	// Errors
	if (!ENV.get('FIREBASE_SECRET'))   throw new Error('FIREBASE_SECRET required.');
	if (!ENV.get('FIREBASE_ENDPOINT')) throw new Error('FIREBASE_ENDPOINT required.');
	
	// Init
	this.fb = new FB(ENV.get('FIREBASE_ENDPOINT'));
	
	// Auth
	this.fb.authWithCustomToken(ENV.get('FIREBASE_SECRET'), function(error, auth) {
		if (error) throw new Error(error);
		
		util.log('Firebase: Authenticated!');
	});
};


Firebase.prototype = {
	
	find: function(node, cb) {
		this.fb.child(node).once('value', function(data) {
			cb(data.val());
		}, function(err) {
			util.log(err);
		});
	},
	
	update: function(node, content) {
		this.fb.child(node).update(content);
	}
	
};


/** Export */
module.exports = Firebase = new Firebase();