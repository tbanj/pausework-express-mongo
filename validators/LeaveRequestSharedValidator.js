const joi = require('joi');

/**
 * Joi Validation schema for validating requests  for leave Request Shared.
 */
exports.CreateLeaveRequestSharedValidator = {
    leave_id: joi.string().required(),
    employee: joi.string().required(),

};
