const Joi = require('joi');

const quoteSearchSchema = Joi.object({
    word: Joi.string().max(512).required()
});

module.exports = { quoteSearchSchema };
