/**
 * ENV
 * Process
 */
var ENVProcess = function() {
	this.env = process.env;
};

ENVProcess.prototype = {
	
	get: function(key) {
		return this.env[key.toUpperCase()];
	},
	
	set: function(key, value) {
		this.env[key.toUpperCase()] = value;
	}
	
};


/** export */
module.exports = ENVProcess = new ENVProcess();