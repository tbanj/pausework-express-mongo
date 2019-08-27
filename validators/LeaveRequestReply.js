const joi = require('joi');

/**
 * Joi Validation schema for validating requests  for leave Request Shared.
 */
exports.CreateLeaveRequestReplyValidator = {
    leave_id: joi.string().required(),
    reply: joi.string().required(),
    created_by: joi.string().default(),

};
