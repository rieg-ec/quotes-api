const db = require('../db');

const getAuthors = async () => {
  const authors = await db
    .select('author_name as name', 'author_id as id')
    .from('authors');
  return authors;
};

const getAuthorByName = async (name) => {
  const authors = await db
    .select('author_name as name', 'author_id')
    .from('authors')
    .where('author_name', 'ilike', `%${name}%`);

  return authors;
};

module.exports = {
  getAuthors, getAuthorByName,
};
