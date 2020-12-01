const Joi = require('joi');

const quoteSearchSchema = Joi.object({
  name: Joi.string().max(50),
  word: Joi.string().max(512),
}).or('name', 'word').options({ allowUnknown: true });

module.exports = { quoteSearchSchema };
