const joi = require('joi');

/**
 * Joi Validation schema for validating requests  for leaves.
 */
exports.CreateLeaveValidator = {
  leavetype: joi.string().required(),
  approvedby: joi.string().required(),
  startdate: joi.date().required(),
  enddate: joi.date().required(),
  offdays: joi.number().required(),
  approvestatus: joi.number().required(),
  approvemessage: joi.string().required(),
  
  leavemessage: joi.string().required(),
  
};
