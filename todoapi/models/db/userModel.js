const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    additionalInfo: {
        type: Object,
        required: false
    },
    role: {
        type: [String],
        required: true,
        default: 'user',
        enum: [
            'user',
            'admin',
            'superadmin',
            'guest',
            'moderator',
            'editor',
            'author',
            'contributor',
            'subscriber'
        ]
    },
    status: {
        type: String,
        required: true,
        default: 'active',
        enum: [
            'active',
            'inactive',
            'suspended',
            'banned',
            'deleted'
        ]
    },
});

module.exports = mongoose.model('User', UserSchema);