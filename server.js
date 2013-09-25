var express = require('express');

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

app.post('/api/login', function(req, res){
//	var email = req.user.email;
//	var password = req.user.password;
//	console.log("email = " + email + ', password =' + password);
	console.log("req.params = %j",req.params);
	console.log("req.body.user.email = %j", req.body.user.email);
	console.log("req.route.path =" + req.route.path);
	res.send(200, req.body);
});

app.listen(3000, '0.0.0.0');
console.log("Express server listening...");