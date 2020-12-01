require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const api = require('./api');

const app = express();
const logger = morgan('dev', {
  skip: () => ['test', 'production'].includes(process.env.NODE_ENV),
});

app.use(express.json());
app.use(logger);
app.use(helmet());

app.get('/', (req, res) => res.send('Quotes Api'));
app.use('/api', api);

module.exports = app;
