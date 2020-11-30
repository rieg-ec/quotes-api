const db = require('../db');

const getQuoteById = async (id) => {
  const { author, body } = await db
    .select('author_name as author', 'body')
    .from('quotes')
    .join('authors', 'author_id', 'fk__authors__author_id')
    .where({ 'quote_id': id })
    .first();

  return { author, body };
};

const getQuotesByAuthorId = async (id) => {
  const author_promise = db
    .select('author_name as author')
    .from('authors')
    .where({ 'author_id': id })
    .first();

  const quotes_promise = db.select('body')
    .from('quotes')
    .join('authors', 'author_id', 'fk__authors__author_id')
    .where({ 'author_id': id });

  const [{ author }, quotes] = await Promise.all([author_promise, quotes_promise]);

  return { author, quotes };
};

const getRandomQuote = async () => {
  const { rows } = await db.raw(`
  SELECT author_name AS author, body
  FROM quotes, authors
  WHERE author_id = fk__authors__author_id
    AND quote_id = (SELECT CASE WHEN quote_id = 0 THEN 1 ELSE quote_id END
                    FROM (SELECT ROUND(RANDOM() * (SELECT MAX(quote_id) FROM quotes))
                    AS quote_id) AS r);
  `);

  const [{ author, body }] = rows;

  return { author, body };
};

const getQuoteByTextSearch = async (word) => {
  const quotes = await db
    .select('author_name as author', 'body')
    .from('quotes')
    .join('authors', 'author_id', 'fk__authors__author_id')
    .where(db.raw('quotes.body_ts_vector @@ to_tsquery(? || \':*\')', word));

  return quotes;
};

module.exports = {
  getQuoteById, getQuotesByAuthorId, getRandomQuote, getQuoteByTextSearch,
};
