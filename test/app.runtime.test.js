var request = require('supertest')
	, should = require('should');



describe('Test server module', function() {
	describe('POST for /api/login should return 200', function() {
		it('get respond for login post', function(done) {
			request = request('http://localhost:3000');
		
			request.post('/api/login')
						.send({'user': {'email':'mary@demo.org', 'passowrd':'passwd'}})
						//.expect('Content-Type', /json/)
						.expect(200)
						.end(function(err, res) {
							console.log("[test]: app.res.body = %j", res.body );
//							res.body.user.email.should.equal('mary@demo.org');
							done();
						});
		});
	});
});