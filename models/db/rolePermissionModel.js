const mongoose = require('mongoose');

const RolePermissionSchema = new mongoose.Schema({
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    controllerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Controller',
        required: true
    },
    actionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Action',
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

module.exports = mongoose.model('RolePermission', RolePermissionSchema);