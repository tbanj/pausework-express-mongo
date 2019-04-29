const joi = require('joi');

/**
 * Joi Validation schema for validating requests  for leaves.
 */
exports.CreateArticleValidator = {
  leavetype: joi.string().required(),
  startdatefrom: joi.date().required(),
  enddateto: joi.date().required(),
  offdays: joi.number().required(),
  approvestatus: joi.number().required(),
  approvemessage: joi.string().required(),
  
  leavemessage: joi.string().required(),
  
};
