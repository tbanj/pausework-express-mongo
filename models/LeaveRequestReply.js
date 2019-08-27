const mongoose = require('mongoose');

const LeaveRequestReplySchema = new mongoose.Schema({
    leave_id: {
        type: String,
        required: true,
    },

    reply: {
        type: String,
        required: true,
    },

    created_by: {
        type: String,
        required: true,
    },

    created_date: {
        type: Date
    },

    is_admin: {
        type: Boolean,
    },

});

const LeaveRequestReplyModel = mongoose.model('Leave_Request_Reply', LeaveRequestReplySchema);

module.exports = LeaveRequestReplyModel;
