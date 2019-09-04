const joi = require('joi');
/**
 * Joi Validation schema for validating requests  for leaves.
 */
exports.CreateEmployeeAdminValidator = {
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    is_admin: joi.boolean().default(),
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    admin_key: joi.string().required(),
    position: joi.string().default(),
    department: joi.string().default(),
    timezone: joi.string().default(),
    country: joi.string().default(),
    age: joi.string().default(),
};
