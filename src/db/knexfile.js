require('dotenv').config({ path: '../../.env' });

const HOST = process.env.POSTGRES_HOST || 'localhost';

module.exports = {
  client: 'pg',
  connection: {
    host: HOST,
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
};
