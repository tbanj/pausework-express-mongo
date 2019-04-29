const mongoose = require('mongoose');

/**
 * Mongoose Employee schema which is a description/blueprint of how we want our data to look like
 */
const EmployeeSchema = new mongoose.Schema({
  employee_id: {
    type: String,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },

  country: {
    type: String,
    enum: ['Nigeria', 'Ghana'],
    required: true,
  },

  timezone: {
    type: String,
    enum: ['West Africa/Lagos', 'Europe/London','America/California'],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// Model which provides us with an interface for interacting with our data
const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

module.exports = EmployeeModel;
