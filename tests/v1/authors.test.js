const { request, expect, app } = require("../setup");

/*
  routes:
    GET /authors
    GET /authors/:id
*/

const PATH = '/api/v1/authors';

describe('GET /authors', function() {
  let authorId;
  let authorName;

  describe('GET /', function() {
    it('responds with json', function(done) {
      request(app)
        .get(PATH)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          const { name, id } = JSON.parse(res.text).payload.authors[0];
          authorId = id;
          authorName = name;
          done();
        });
    });

  });

  describe('GET /:id', function() {
    it('responds with json', function(done) {
      request(app)
        .get(`${PATH}/${authorId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          const { name, quotes } = JSON.parse(res.text).payload;
          expect(name).to.be.a('string');
          expect(quotes).to.be.an('array');
          quotes.forEach(quote => {
            expect(quote).to.have.property('body');
            expect(quote.body).to.be.a('string');
          });
          done();
        });
    });
  });

})
