const { Router } = require('express');
const { QuoteService, AuthorService } = require('../../services');
const { quoteSearchSchema } = require('../../schemas');
const router = Router();

router.get('/quotes-search', async (req, res) => {
  const { value, error} = quoteSearchSchema.validate(req.query);
  if (error) throw error;
  const quotes = await QuoteService.getQuoteByTextSearch(value.word);
  res.json({ success: true, payload: { quotes } });
});

router.get('/quotes/:id', async (req, res) => {
  const { author, body } = await QuoteService.getQuoteById(req.params.id);
  return res.json({ success: true, payload: { author, body } });
});

router.get('/random-quote', async (req, res) => {
  const { author, body } = await QuoteService.getRandomQuote();
  res.json({ success: true, payload: { author, body } });
});

router.get('/authors', async (req, res) => {
  if (req.query.name) {
    const authors = await AuthorService.getAuthorByName(req.query.name);
    res.json({ success: true, payload: { authors } });

  } else {
    const authors = await AuthorService.getAuthors();
    return res.json({ success: true, payload: { authors } });
  }
});

router.get('/authors/:id', async (req, res) => {
  const { author, quotes } = await QuoteService.getQuotesByAuthorId(req.params.id);
  return res.json({ success: true, payload: { author, quotes } });
});

module.exports = router;
