const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
  leave_type: {
    type: String,
    required: true,
  },

  start_date: {
    type: Date,
    required: true,
  },

  end_date: {
    type: Date,
    required: true,
  },
  created_date: {
    type: Date,
  },

  off_days: {
    type: Number,
  },

  leave_message: {
    type: String,
    required: true,
  },


  approve_status: {
    type: Number,
    required: true,
  },

  approve_message: {
    type: String,
    required: true,

  },
  approved_by: {
    type: String,

  },
  employee: {
    // The leave employee's ID
    type: String,
    required: true,
  },

  admin_key: {
    // The leave employee's ID
    type: String,
  },

});

const LeaveModel = mongoose.model('Leave', LeaveSchema);

module.exports = LeaveModel;
