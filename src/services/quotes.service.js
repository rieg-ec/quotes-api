const db = require('../db');

const getQuoteById = async (id) => {
  const quote = await db
    .select('author_name as name', 'author_id', 'body', 'quote_id')
    .from('quotes')
    .join('authors', 'author_id', 'fk__authors__author_id')
    .where({ 'quote_id': id })
    .first();

  return quote;
};

const getQuotesByAuthorId = async (id) => {
  const authorPromise = db
    .select('author_name as name')
    .from('authors')
    .where({ 'author_id': id })
    .first();

  const quotesPromise = db.select('body')
    .from('quotes')
    .join('authors', 'author_id', 'fk__authors__author_id')
    .where({ 'author_id': id });

  const [{ name }, quotes] = await Promise.all([authorPromise, quotesPromise]);
  return { name, quotes };
};

const getRandomQuote = async () => {
  const { rows } = await db.raw(`
    SELECT author_name as name, author_id, body, quote_id
    FROM quotes, authors
    WHERE author_id = fk__authors__author_id
    AND random() < 0.01
    LIMIT 1;
  `);

  const [quote] = rows;

  return quote;
};

const getQuoteByTextSearch = async ({ name, word }) => {
  const query = db
    .select('author_name as name', 'author_id', 'body', 'quote_id')
    .from('quotes')
    .join('authors', 'author_id', 'fk__authors__author_id');

  if (name) query.where('author_name', 'ilike', `%${name}%`);
  if (word) query.where(db
    .raw('quotes.body_ts_vector @@ to_tsquery(? || \':*\')', word));

  const quotes = await query;

  return quotes;
};

module.exports = {
  getQuoteById, getQuotesByAuthorId, getRandomQuote, getQuoteByTextSearch,
};
