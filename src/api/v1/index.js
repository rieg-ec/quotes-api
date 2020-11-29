const { Router } = require('express');
const quotesRoute = require('./quotes.js');

const router = Router();

router.use('/', quotesRoute);

module.exports = router;
