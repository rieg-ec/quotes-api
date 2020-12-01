const fs = require('fs').promises;

const SEED_PATH = process.env.NODE_ENV === 'test' ?
  '../../quotes/test/authors.csv' : '../../quotes/authors.csv';

exports.seed = async function(knex) {
  await knex('authors').del();
  const data = await fs
    .readFile(SEED_PATH, 'utf-8');
  const rows = data.trim().split('\n');
  await Promise.all(rows.map(row => {
    const [id, author] = row.split('|');
    return knex('authors').insert({ 'author_id': id, 'author_name': author });
  }));
};
