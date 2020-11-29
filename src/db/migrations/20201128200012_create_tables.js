
exports.up = function(knex) {
  return knex.schema
    .createTable('authors', function (table) {
      table.increments('author_id').primary();
      table.string('author_name', 50).notNullable();
    })
    .createTable('quotes', function (table) {
      table.increments('quote_id').primary();
      table.string('body', 512).notNullable();
      table.integer('fk__authors__author_id')
        .references('author_id')
        .inTable('authors')
        .onDelete('CASCADE');
    });

};

exports.down = function(knex) {
  return knex.schema
      .dropTable('quotes')
      .dropTable('authors');

};
