var request = require('supertest')
	, should = require('should')
	, app = require('../server');

describe('Test server module', function() {
	describe('GET /users', function() {
		it('get respond with json', function(done) {
			request(app).get('/user')
						.set('Accept', 'application/json')
						.expect('Content-Type', /json/)
						.expect(201, done);
		});
		
		
	});
	
	describe('POST for /api/login should return 200', function() {
		it('get respond for login post sucess', function(done) {
			var user = {'user': {'email':'mary@demo.org', 'passowrd':'passwd'}};
			request(app).post('/api/login')
						.send(user)
						//.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {
							console.log("[test]: server.res.body = %j", res.body);
							res.body.user.email.should.equal('mary@demo.org');
							done();
						});
		});
		
		it('get respond for login post, with bad username', function(done) {
			var user = {'user': {'email':'mary@demo.orgx', 'passowrd':'passwd'}};
			request(app).post('/api/login')
						.send(user)
						//.expect('Content-Type', /json/)
						.expect(401)
						.end(function(err, res) {
							console.log("[test]: bad username = %j", res.body);
							//res.body.user.email.should.equal('mary@demo.org');
							done();
						});
		});
	});
});