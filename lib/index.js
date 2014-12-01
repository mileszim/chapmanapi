/** Dependencies */
var ENV        = require('./env');
var Firebase   = require('./firebase.js');
var express    = require('express');
var bodyparser = require('body-parser');

/** APIs */
var Parking = require('./apis/parking.js');
//var Jobs    = require('./apis/jobs.js');
// Jobs._fetch(function(data) {
// 	console.log(data);
// });


// Server
var app = express();
app.use(bodyParser.json());


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

app.post('/webhooks/jobs', function(req, res) {
	console.log(req.body);
	res.status(200);
});


// Start
app.listen(ENV.get('port') || 3000);