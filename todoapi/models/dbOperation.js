const User = require('./db/userModel');
const connectDB = require('../config/db');


// create a class to handle all the database operations
class DbOperation {
    constructor() {
        // connect to the database
        connectDB();
    }
    // Create a new user
    async createUser(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            return { error: error.message };
        }
    }

    // Get all users
    async getUsers() {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            return { error: error.message };
        }
    }

    // Get a user by ID
    async getUserById(id) {
        try {
            const user = await User.findById(id);
            return user;
        } catch (error) {
            return { error: error.message };
        }
    }

    // Update a user by ID
    async updateUser(id, data) {
        try {
            const user = await User.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true
            });
            return user;
        } catch (error) {
            return { error: error.message}
        }
    }

    // Delete a user by ID
    async deleteUser(id) {
        try {
            const user = await User.findByIdAndDelete(id);
            return user;
        } catch (error) {
            return { error: error.message };
        }
    }
}

module.exports = new DbOperation();