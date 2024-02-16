const User = require('./db/rolesModel');
const connectDB = require('../config/db');
const catagoryModel = require('./db/catagoriesModel');
const dbValidation = require('./dbValidation');

class DbOperation {
    constructor() {
        connectDB();
    }

    async createRole(data) {
        try {
            const role = await User.create(data);
            return role;
        } catch (error) {
            return dbValidation.generateErrorResp(error, 'Error while creating role');
        }
    }

    async getRoles() {
        try {
            const roles = await User.find();
            return roles;
        } catch (error) {
            return dbValidation.generateErrorResp(error, 'Error while fetching roles');
        }
    }

    async createCategory(data) {
        try {
            const category = await catagoryModel.create(data);
            return category;
        } catch (error) {
            return dbValidation.generateErrorResp(error, 'Error while creating category');
        }
    }

    async getCategories() {
        try {
            const categories = await catagoryModel.find();
            if (!categories) {
                return dbValidation.noDataFound({
                    message: 'No category found'
                });
            }
            return categories;
        } catch (error) {
            return dbValidation.generateErrorResp(error, 'Error while fetching categories');
        }
    }
}

module.exports = new DbOperation();