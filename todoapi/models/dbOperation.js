const User = require('./db/userModel');
const connectDB = require('../config/db');
const dbvalidation = require('./dbValidation');


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
            return dbvalidation.generateErrorResp(error, '');
        }
    }

    // Get all users
    async getUsers() {
        try {
            const users = await User.find();
            return this.generateResponse(users, "Users retrieved successfully");
        } catch (error) {
            return dbvalidation.generateErrorResp(error, '');
        }
    }

    // Get a user by ID
    async getUserById(id) {
        try {
            const isValidId = dbvalidation.validateId(id);
            if (!isValidId) {
                throw new Error("Invalid ID");
            }
            const user = await User.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            return this.generateResponse(user, "User retrieved successfully");
        } catch (error) {
            return dbvalidation.generateErrorResp(error, '');
        }
    }

    // Update a user by ID
    async updateUser(id, data) {
        try {
            const isValidId = mongoose.Types.ObjectId.isValid(id);
            if (!isValidId) {
                throw new Error("Invalid ID");
            }
            const user = await User.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true
            });
            return this.generateResponse(user, "User updated successfully");
        } catch (error) {
            return dbvalidation.generateErrorResp(error, '');
        }
    }

    // Delete a user by ID
    async deleteUser(id) {
        try {
            const isValidId = mongoose.Types.ObjectId.isValid(id);
            if (!isValidId) {
                throw new Error("Invalid ID");
            }
            const user = await User.findByIdAndDelete(id);
            return this.generateResponse(user, "User deleted successfully");
        } catch (error) {
            return dbvalidation.generateErrorResp(error, '');
        }
    }

    // signin
    async signIn(data) {
        try {
            const user = await User.findOne({
                email: data.email
            }).where('email').equals(data.email);
            if (!user) {
                throw new Error("User not found");
            } else {
                const compare = await user.isValidPassword(data.password);
                if (!compare) {
                    throw new Error("Invalid password");
                }
                return this.generateResponse(user, "User retrieved successfully");
            }
        } catch (error) {
            return dbvalidation.generateErrorResp(error, '');
        }
    }
}

module.exports = new DbOperation();