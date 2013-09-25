var express = require('express')
	, passport = require('passport')
	, db = require('./lib/db')
	, mongojs = require('mongojs')
	, LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
	console.log('calling serializeUser %j', user);
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	console.log('calling deserializeUser with id' + id);
	db.findOne('user', {'_id': mongojs.ObjectId(id)}, {}, function(err, user){
		done(err, user);
	});
});

passport.use(new LocalStrategy(
	function(email, password, done) {
		console.log("calling login: %j, %j", email, password);
		db.findOne('user', {'email': email}, {}, function(err, user){
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			
			if(user.password != password) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		});
	}
));

var app = express();
module.exports = app;

app.configure(function(){
  
  app.use(express.favicon());
  //app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 'Content-Type, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    next();
});

//API
require('./api/user')(app);

app.get('/api/loggedin', function(req, res) { 
	console.log('calling loggedin');
	res.send(req.isAuthenticated() ? req.user : '0'); 
});

app.post('/api/login',passport.authenticate('local'), function(req, res) {
	res.send(req.user);
});

app.get('/api/logout', function(req, res){
	console.log('calling logout');
	req.logout(); 
	res.send(200); 
});

app.listen(3000, '0.0.0.0');
console.log("Express server listening...");