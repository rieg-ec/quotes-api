const db = require('../db');

const getAuthors = async () => {
  const authors = await db.select('author_name as author').from('authors');
  return authors.map(item => item.author);
}

const getAuthorByName = async (name) => {
  const authors = await db
    .select('author_name as author', 'author_id')
    .from('authors')
    .where('author_name', 'ilike', `%${name}%`);

  return authors;
}

module.exports = {
  getAuthors, getAuthorByName,
}
