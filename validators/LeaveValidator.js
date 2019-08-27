const joi = require('joi');

/**
 * Joi Validation schema for validating requests  for leaves.
 */
exports.CreateLeaveValidator = {
  leave_type: joi.string().required(),
  approved_by: joi.string().required(),
  start_date: joi.date().required(),
  end_date: joi.date().required(),
  off_days: joi.number().required(),
  approve_status: joi.number().required(),
  approve_message: joi.string().required(),
  admin_key: joi.string().default(),
  leave_message: joi.string().required(),

};
