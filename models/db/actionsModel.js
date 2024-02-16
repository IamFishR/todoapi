const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
    actionname: {
        type: String,
        required: true,
        unique: true
    },
    controllerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Controller',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Action', ActionSchema);