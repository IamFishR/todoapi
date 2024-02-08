const User = require('./db/rolesModel');
const connectDB = require('../config/db');

class DbOperation {
    constructor() {
        connectDB();
    }

    async createRole(data) {
        try {
            const role = await User.create(data);
            return role;
        } catch (error) {
            return { error: error.message };
        }
    }

    async getRoles() {
        try {
            const roles = await User.find();
            return roles;
        } catch (error) {
            return { error: error.message };
        }
    }
}

module.exports = new DbOperation();