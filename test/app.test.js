var request = require('supertest')
	, should = require('should')
	, app = require('../app');

describe('Test server module', function() {
/*
	describe('GET /users', function() {
		it('get respond with json', function(done) {
			request(app).get('/api/user')
						.set('Accept', 'application/json')
						.expect('Content-Type', 'text/plain')
						.expect(401, done);
		});		
	});
*/	
	describe('POST for /api/login should return 200', function() {
		it('get respond for login post', function(done) {
			request(app).post('/api/login')
						.send({'user': {'email':'mary@demo.orgx', 'passowrd':'passwd'}})
						//.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {
							console.log("[test]: app.res.body = %j", res.body);
//							res.body.user.email.should.equal('mary@demo.org');
							done();
						});
		});
	});
});