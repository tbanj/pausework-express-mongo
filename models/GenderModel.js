const mongoose = require('mongoose');

const GenderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    created_date: {
        type: Date,
    }
});
const GenderModel = mongoose.model('gender', GenderSchema)
module.exports = GenderModel;