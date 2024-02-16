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

/**
 * catagories
 *  1. personal tasks - #FF5733
 *  2. office tasks - #33FF57
 *  3. study - #FFD133
 *  4. home - #33FFD1
 */