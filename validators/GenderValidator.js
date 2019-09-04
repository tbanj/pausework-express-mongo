const joi = require('joi');
exports.CreateGenderValidator = {
    name: joi.string().required()
}