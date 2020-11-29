const fs = require('fs').promises;
const path = require('path');

exports.seed = async function(knex) {
  await knex('quotes').del();
  const data = await fs
    .readFile(path.join('..', '..', 'quotes', 'quotes.csv'), 'utf-8');
  const rows = data.trim().split('\n');
  await Promise.all(rows.map(row => {
    const [id, body, reference] = row.split('|');
    return knex('quotes')
      .insert({ 'quote_id': id, 'body': body, 'fk__authors__author_id': reference });
  }));
};
