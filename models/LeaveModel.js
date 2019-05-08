const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
  leavetype: {
    type: String,
    required: true,
  },
  
  startdate: {
    type: Date,
    required: true,
  },
  
  enddate: {
    type: Date,
    required: true,
  },
  createddate: {
    type: Date,
    
  },

  offdays: {
    type: Number,
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
    required: true,
    
  },
  approvedby: {
    type: String,
    
  },
  employee: {
    // The leave employee's ID
    type: String,
    required: true,
  },
  
});

const LeaveModel = mongoose.model('Leave', LeaveSchema);

module.exports = LeaveModel;
