const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    // #1
    test('Convert a valid input (10L): GET request to /api/convert', function(done) {
        chai.request(server).
            get('/api/convert').
            query({input: '10L'}).
            end(function(err,res) {
                assert.equal(res.status, 200);
                assert.approximately(res.body.returnNum, 2.64172, 0.1);
                assert.equal(res.body.returnUnit, 'gal');
                done();
            });
    });
    // #2
    test('Convert an invalid input (32g): GET request to /api/convert', function(done) {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '32g' })
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body, 'invalid unit');
                done();
            });
    });
    // #3
    test('Convert an invalid number (3/7.2/4kg): GET request to /api/convert', function(done){
        chai.request(server).
            get('/api/convert')
            .query({input : '3/7.2/4kg'})
            .end(function(err,res) {
                assert.equal(res.status, 200);
                assert.equal(res.body, 'invalid number');
                done();
            })
    });
    // #4
    test('Convert an invalid number AND unit (3/7.2/4kilomegagram): GET request to /api/convert.', function(done) {
        chai.request(server).
            get('/api/convert')
            .query({input: '3/7.2/4kilomegagram'})
            .end(function(err,res){
                assert.equal(res.status, 200);
                assert.equal(res.body, 'invalid number and unit');
                done();
            })
    });
    // #5
    test('Convert with no number (kg): GET request to /api/convert', function(done) {
        chai.request(server)
            .get('/api/convert')
            .query({input : 'kg'})
            .end(function(err,res) {
                assert.equal(res.status, 200);
                assert.approximately(res.body.returnNum, 2.20462, 0.1)
                done();
            });
    });
});
