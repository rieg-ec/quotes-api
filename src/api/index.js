const { Router } = require('express');
const v1 = require('./v1');

const router = Router();

router.use('/v1', v1);
router.use('/', v1);

module.exports = router;
