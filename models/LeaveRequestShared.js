const mongoose = require('mongoose');

const LeaveRequestSharedSchema = new mongoose.Schema({
  leave_id: {
    type: String,
    required: true,
  },

  employee: {
    type: String,
    required: true,
  },

  has_seen: {
    type: Number,
    enum: [0, 1],
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },

  created_date: {
    type: Date
  },

  updated_date: {
    type: Date,
    Default: null
  }




});

const LeaveRequestSharedModel = mongoose.model('Leave_Request_Shared', LeaveRequestSharedSchema);

module.exports = LeaveRequestSharedModel;
