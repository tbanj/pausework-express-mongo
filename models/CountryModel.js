const mongoose = require('mongoose');
const CountrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    timezone: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
    }
});
const CountryModel = mongoose.model('Country', CountrySchema);
module.exports = CountryModel;