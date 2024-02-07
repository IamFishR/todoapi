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
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    additionalInfo: {
        type: Object,
        required: false,
        default: {
            status: 'active',
            bio: '',
            website: '',
            github: '',
            outlook: '',
            google: '',
            calendly: '',
            microsoft_teams: '',
        }
    },
    roleids: {
        type: Array,
        required: true,
    },
});

module.exports = mongoose.model('User', UserSchema);