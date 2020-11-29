const fs = require('fs').promises;

exports.seed = async function(knex) {
  await knex('authors').del();
  const data = await fs
    .readFile('../../quotes/authors.csv', 'utf-8');
  const rows = data.trim().split('\n');
  await Promise.all(rows.map(row => {
    const [id, author] = row.split('|');
    return knex('authors').insert({ 'author_id': id, 'author_name': author });
  }));
};
