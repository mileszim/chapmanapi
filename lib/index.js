/** Dependencies */
var ENV      = require('./env');
var Firebase = require('./firebase.js');
var express  = require('express');
var Parking  = require('./apis/parking.js');


// Server
var app = express();


// Routes
app.get('/', function(req, res) {
	res.json({ 
		endpoints: [
			'/parking'
		]
	})
});

app.get('/parking', function(req, res) {
	Parking.query(function(data) {
		res.json(data);
	});
});


// Start
app.listen(3000);