const joi = require('joi');

/**
 * Joi Validation schema for validating requests  for leaves.
 */
exports.CreateEmployeeValidator = {
  employee_id: joi.string().default(),
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  is_admin: joi.boolean().default(),
  gender: joi.string().required(),
  country: joi.string().required(),
  timezone: joi.string().required(),
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  age: joi.number().required(),
  admin_key: joi.string().default(),
  pix: joi.string().default(),
  position: joi.string().default(),
  department: joi.string().default(),

};
