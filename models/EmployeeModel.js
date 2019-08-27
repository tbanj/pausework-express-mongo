const mongoose = require('mongoose');
const env = require('../env');

/**
 * Mongoose Employee schema which is a description/blueprint of how we want our data to look like
 */
const EmployeeSchema = new mongoose.Schema({
  employee_id: {
    type: String,
  },
  pix: {
    type: String,
    get: v => `${env.mongodb_url}${v}`,
    default: "https://res.cloudinary.com/dr9bbyvab/v1566495925/Krystal/user-unisex-512.png"
  },
  first_name: {
    type: String,
    required: true,

  },
  last_name: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Boolean,
  },
  admin_key: {
    type: String,
  },
  created_date: {
    type: Date,
  },
  age: {
    type: Number,
    required: true,
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
    enum: ['West Africa/Lagos', 'Europe/London', 'America/California'],
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
  position: {
    type: String,
    required: true,
    default: null
  },

  department: {
    type: String,
    required: true,
    default: null
  }
});

// Model which provides us with an interface for interacting with our data
const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

module.exports = EmployeeModel;
