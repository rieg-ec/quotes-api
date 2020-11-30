require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const api =  require('./api');

const app = express();

app.use(express.json());
app.use(morgan('common'));
app.use(helmet());

app.get('/', (req, res) => res.send('Quotes Api'));
app.use('/api', api);

module.exports = app;
