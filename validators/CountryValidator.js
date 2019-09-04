const joi = require('joi');
exports.CreateCountryValidator = {
    name: joi.string().required(),
    timezone: joi.string().required()
}