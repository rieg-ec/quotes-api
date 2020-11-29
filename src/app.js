const express = require('express');
const helmet = require('helmet');
// const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression'); // TODO: how to use
const api =  require('./api');

const app = express();

app.use(express.json());
app.use(morgan('common'));
app.use(compression());
app.use(helmet());

app.use('/api', api);

module.exports = app;
