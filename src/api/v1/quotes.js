const { Router } = require('express');
const { QuoteService } = require('../../services');

const router = Router();

router.get('/quotes/:id', async (req, res) => {
  const { author, body } = await QuoteService.getQuoteById(req.params.id);
  return res.json({ success: true, payload: { author, body } });
});

router.get('/random-quote', async (req, res) => {
  const { author, body } = await QuoteService.getRandomQuote();
  res.json({ success: true, payload: { author, body } });
});

router.get('/authors', async (req, res) => {
  const authors = await QuoteService.getAuthors();
  return res.json({ success: true, payload: { authors } });
});

router.get('/authors/:id', async (req, res) => {
  const { author, quotes } = await QuoteService.getQuotesByAuthorId(req.params.id);
  return res.json({ success: true, payload: { author, quotes } });
});

module.exports = router;
