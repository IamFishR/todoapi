const crypto = require('crypto');

class Common {
    constructor() {

    }

    generateUniqueId() {
        return crypto.randomBytes(12).toString('hex');
    }
}

module.exports = new Common();