const { request, expect, app } = require('../setup');

/*
  routes:
    GET /quotes/search
    GET /quotes/:id
    GET /random-quote
*/

const PATH = '/api/v1/quotes';

describe('GET /quotes', () => {
  let quoteId;
  let authorName;
  let quoteBody;

  describe('GET /random', () => {
    it('responds with json', (done) => {
      request(app)
        .get(`${PATH}/random`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const { quote } = JSON.parse(res.text).payload;
          quoteId = quote.quote_id;
          authorName = quote.name;
          quoteBody = quote.body;
          done();
        });
    });
  });

  describe('GET /search', () => {
    it('responds with json', (done) => {
      request(app)
        .get(`${PATH}/search?name=${authorName}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const { quotes } = JSON.parse(res.text).payload;
          expect(quotes).to.be.an('array');
          const bodies = quotes.map((quote) => quote.body);
          expect(bodies).to.include(quoteBody);
          done();
        });
    });
  });

  describe('GET /:id', () => {
    it('responds with json', (done) => {
      request(app)
        .get(`${PATH}/${quoteId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const { quote } = JSON.parse(res.text).payload;
          expect(quote.name).to.equal(authorName);
          expect(quote.body).to.equal(quoteBody);
          expect(quote.quote_id).to.equal(quoteId);
          done();
        });
    });
  });
});
