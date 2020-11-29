const monk = require('monk');

const { username, password, uri, database } =
  require('../config/database.js')[process.env.NODE_ENV || 'development'];

const monkgConfig = `${username}:${password}@${uri}/${database}}`;
const db = monk(monkgConfig);

const quotes = db.get('quotes');

module.exports = { quotes };
