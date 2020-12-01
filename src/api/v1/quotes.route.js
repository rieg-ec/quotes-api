const { Router } = require('express');
const { QuoteService } = require('../../services');
const { quoteSearchSchema } = require('../../helpers');

const router = Router();

router.get('/search', async (req, res) => {
  /* performs text search with ?word and ?name query arguments */
  try {
    const { value, error } = quoteSearchSchema.validate(req.query);
    if (error) throw error;
    const quotes = await QuoteService.getQuoteByTextSearch(value);
    return res.json({ success: true, payload: { quotes } });
  } catch (err) {
    return res.status(500).json({ success: false, payload: err.msg });
  }
});

router.get('/random', async (req, res) => {
  /* returns random quote */
  try {
    const quote = await QuoteService.getRandomQuote();
    return res.json({ success: true, payload: { quote } });
  } catch (err) {
    return res.status(500).json({ success: false, payload: err.msg });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const quote = await QuoteService.getQuoteById(req.params.id);
    return res.json({ success: true, payload: { quote } });
  } catch (err) {
    return res.status(500).json({ success: false, payload: err.msg });
  }
});

module.exports = router;
