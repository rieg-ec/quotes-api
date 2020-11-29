// Update with your config settings.
require('dotenv').config({ path: '../../.env' });

const HOST = process.env.POSTGRES_HOST || 'localhost';
const PORT = process.env.POSTGRES_PORT || 5432;

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: HOST,
      port: PORT,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
