const User = require('./db/userModel');
const connectDB = require('../config/db');


// create a class to handle all the database operations
class DbOperation {
    constructor() {
        // connect to the database
        connectDB();
    }
    generateResponse(data, message) {
        const response = {
            name: data.name,
            email: data.email,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            additionalInfo: data.additionalInfo,
            roleids: data.roleids,
        };

        return {
            message: message,
            user: response
        };
    }
    // Create a new user
    async createUser(data) {
        try {
            const user = await User.create(data);
            return this.generateResponse(user, "User created successfully");
        } catch (error) {
            return { error: error.message };
        }
    }

    // Get all users
    async getUsers() {
        try {
            const users = await User.find();
            return this.generateResponse(users, "Users retrieved successfully");
        } catch (error) {
            return { error: error.message };
        }
    }

    // Get a user by ID
    async getUserById(id) {
        try {
            const user = await User.findById(id);
            if(!user) {
                throw new Error("User not found");
            }
            return this.generateResponse(user, "User retrieved successfully");
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
            return this.generateResponse(user, "User updated successfully");
        } catch (error) {
            return { error: error.message }
        }
    }

    // Delete a user by ID
    async deleteUser(id) {
        try {
            const user = await User.findByIdAndDelete(id);
            return this.generateResponse(user, "User deleted successfully");
        } catch (error) {
            return { error: error.message };
        }
    }
}

module.exports = new DbOperation();