/** Dependencies */
var ENV        = require('./env');
var Firebase   = require('./firebase.js');
var express    = require('express');
var bodyparser = require('body-parser');

/** APIs */
var Parking = require('./apis/parking.js');
var Jobs    = require('./apis/jobs.js');


// Server
var app = express();
app.use(bodyparser.json());


// Routes
app.get('/', function(req, res) {
	res.json({ 
		endpoints: [
			'/parking',
			'/jobs'
		]
	})
});

app.get('/parking', function(req, res) {
	Parking.query(function(data) {
		res.json(data);
	});
});

app.get('/jobs', function(req, res) {
	Jobs.query(function(data) {
		res.json(data);
	});
});

app.post('/webhooks/jobs', function(req, res) {
	// Do nothing at the moment
	res.json({ status: 'OK' });
});


// Start
app.listen(ENV.get('port') || 3000);