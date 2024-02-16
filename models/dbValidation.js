const mongoose = require('mongoose');

class DbValidation {
    constructor() {
        // super();
    }
    // validate the user data
    validateUser(data) {
        const errors = [];
        if (!data.name) {
            errors.push({
                field: 'name',
                message: 'Name is required'
            });
        }
        if (!data.email) {
            errors.push({
                field: 'email',
                message: 'Email is required'
            });
        }
        if (!data.password) {
            errors.push({
                field: 'password',
                message: 'Password is required'
            });
        }
        if (errors.length > 0) {
            return {
                error: true,
                validationError: errors
            };
        }
        return {
            error: false,
            validationError: errors
        };
    }

    // validate the user data
    validateUserData(data) {
        const errors = [];
        if (data.name && data.name.length < 3) {
            errors.push({
                field: 'name',
                message: 'Name must be at least 3 characters'
            });
        }
        if (data.email && data.email.length < 3) {
            errors.push({
                field: 'email',
                message: 'Email must be at least 3 characters'
            });
        }
        if (data.password && data.password.length < 6) {
            errors.push({
                field: 'password',
                message: 'Password must be at least 6 characters'
            });
        }
        if (data.id && !mongoose.Types.ObjectId.isValid(data.id)) {
            errors.push({
                field: 'id',
                message: 'Invalid user id'
            });
        }
        if (errors.length > 0) {
            return {
                error: true,
                validationError: errors
            };
        }
        return {
            error: false,
            validationError: errors
        };
    }

    validateId(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return false;
        }
        return true;
    }

    generateErrorResp(error, message) {
        const resp = {
            error: true,
        };

        if (error.errors) {
            resp['validationError'] = [];
            for (const key in error.errors) {
                if (error.errors.hasOwnProperty(key)) {
                    const element = error.errors[key];
                    if (element.name === 'ValidatorError') {
                        resp['validationError'].push({
                            field: element.path,
                            message: element.message
                        });
                    }
                }
            }
        }

        if (message) {
            resp['message'] = message;
        } else {
            resp['message'] = error.message;
        }

        return resp;
    }

    noDataFound(data) {
        return {
            error: true,
            message: data?.message || 'No data found',
            data
        };
    }
}

module.exports = new DbValidation();