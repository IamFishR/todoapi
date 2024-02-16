const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
        required: true,
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
            status: {
                type: String,
                required: true,
                default: 'active',
                enum: ['active', 'inactive', 'suspended', 'deleted']
            },
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
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        default: [
            '65c3f2e16f6e3b62eb51832d',
        ],
    },
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

UserSchema.path('email').validate(async (email) => {
    const emailCount = await mongoose.models.User.countDocuments({ email });
    return !emailCount;
}, 'Email already exists');

// remove password from the user object before sending the response
UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

module.exports = mongoose.model('User', UserSchema);