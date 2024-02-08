const mongoose = require('mongoose');

const catagoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    color: {
        type: String,
        required: [true, 'Color is required']
    }
}, {
    timestamps: true
});

const Catagories = mongoose.model('Catagories', catagoriesSchema);
module.exports = Catagories;