const db = require('../db');


class QuoteService {

  static async getQuoteById(id) {
    const { author, body } = await db
      .select('author_name as author', 'body')
      .from('quotes')
      .join('authors', 'author_id', 'fk__authors__author_id')
      .where({ 'quote_id': id })
      .first();

    return { author, body };
  }

  static async getQuotesByAuthorId(id) {
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
  }

  static async getRandomQuote() {
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
  }

  static async getAuthors() {
    const authors = await db.select('author_name as author').from('authors');
    return authors.map(item => item.author);
  }
}

module.exports = QuoteService;
