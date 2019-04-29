const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
  leavetype: {
    type: String,
    required: true,
  },
  startdatefrom: {
    type: Date,
    required: true,
  },
  
  enddateto: {
    type: Date,
    required: true,
  },
  createddate: {
    type: Date,
    default: Date.now,
  },

  offdays: {
    type: Number,
    required: true,
  },
  

  leavemessage: {
    type: String,
    required: true,
  },

  
  approvestatus: {
    type: Number,
    required: true,
    
  },

  approvemessage: {
    type: String,
    
    
  },
  employee: {
    // The leave employee's ID
    type: String,
    required: true,
  },
  is_public: {
    type: Boolean,
    default: false,
  },
});

const LeaveModel = mongoose.model('Leave', LeaveSchema);

module.exports = LeaveModel;
