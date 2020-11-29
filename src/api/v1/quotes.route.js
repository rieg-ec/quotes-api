const { Router } = require('express');
const { QuoteService } = require('../../services');

const router = Router();

router.get('/', async (req, res) => {
  if (!req.query) {
    const quotes = await QuoteService.getAllQuotes();
    return res.json({ success: true, payload: quotes });
  }

  if (req.query.author) {
    // TODO: best way to handle spaces? current: +
    const quotes = await QuoteService.getQuotesByAuthor(req.query.author);
    return res.json({ success: true, payload: quotes })
  }

  // TODO: error and not found middlewares
  return res.json({ success: false, error: 'wrong url query arguments' });
});

router.get('/random', async (req, res) => {
  const randomQuote = await QuoteService.getRandomQuote();
  res.json({ success: true, payload: randomQuote });
});

router.get('/:id', async (req, res) => {
  const quote = await QuoteService.getQuoteById(req.params.id);
  res.json({ success: true, payload: quote });
});

module.exports = router;
