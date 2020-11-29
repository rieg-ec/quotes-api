const { Router } = require('express');
const quotesRoute = require('./quotes.route.js');

const router = Router();

router.use('/quotes', quotesRoute);

module.exports = router;
