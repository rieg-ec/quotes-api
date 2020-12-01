const { Router } = require('express');
const quotesRoute = require('./quotes.route');
const authorsRoute = require('./authors.route');

const router = Router();

router.use('/quotes', quotesRoute);
router.use('/authors', authorsRoute);

module.exports = router;
