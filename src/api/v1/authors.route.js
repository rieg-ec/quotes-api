const { Router } = require('express');
const { QuoteService, AuthorService } = require('../../services');

const router = Router();

router.get('/', async (req, res) => {
  /* returns all authors in db */
  try {
    const authors = await AuthorService.getAuthors();
    return res.json({ success: true, payload: { authors } });
  } catch (err) {
    return res.status(500).json({ success: false, payload: err.msg });
  }
});

router.get('/:id', async (req, res) => {
  /* returns author matching id */
  try {
    const { name, quotes } = await QuoteService.getQuotesByAuthorId(req.params.id);
    return res.json({ success: true, payload: { name, quotes } });
  } catch (err) {
    return res.status(500).json({ success: false, payload: err.msg });
  }
});

module.exports = router;
