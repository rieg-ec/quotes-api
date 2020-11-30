const Joi = require('joi');

const quoteSearchSchema = Joi.object({
    word: Joi.string().max(512).required()
}).options({ allowUnknown: true });

module.exports = { quoteSearchSchema };
