const mongoose = require('mongoose');

const attachmentsSchema = new mongoose.Schema({
    refId: {
        type: String,
        required: [true, 'Reference Id is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    contentType: {
        type: String,
        required: [true, 'Content Type is required']
    },
    url: {
        type: String,
        required: [true, 'URL is required']
    }
}, {
    timestamps: true
});

const Attachments = mongoose.model('Attachments', attachmentsSchema);
module.exports = Attachments;