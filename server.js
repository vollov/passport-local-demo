var express = require('express')
	, db = require('./lib/db')
	, mongojs = require('mongojs');

var app = express();
module.exports = app;

app.configure(function() {
	app.use(express.favicon());
	// app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
});

app.get('/user', function(req, res){
	res.send(201, { name: 'tobi' });
});

var authenticate = function(req,res,next) {
	console.log("[server]: authenticate->email = %j", req.body.user.email);
	var email = req.body.user.email;
	var password = req.body.user.password;
	
	db.findOne('user', {'email': email}, {}, function(err, user){
		if (err) { return res.send(401, 'Unauthorized'); }
		if (!user) {
			return res.send(401, { message: 'Incorrect username.' });
		}
		console.log('user = '+user.email);
		if(user.passwd != password) {
			return res.send(401, { message: 'Incorrect password.' });
		}
		next();
	});
};

app.post('/api/login', authenticate, function(req, res){
//	var email = req.user.email;
//	var password = req.user.password;
//	console.log("email = " + email + ', password =' + password);
	console.log("[server]: req.params = %j",req.params);
	console.log("[server]: req.body.user.email = %j", req.body.user.email);
	console.log("[server]: req.route.path =" + req.route.path);
	res.send(200, req.body);
});

app.listen(3000, '0.0.0.0');
console.log("Express server listening...");