const crypto = require('crypto');

class Common {
    constructor() {

    }

    generateUniqueId() {
        return crypto.randomBytes(12).toString('hex');
    }

    getTodaysDateWithTime() {
        // mm-dd-yyyy hh:mm:ss
        const date = new Date();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
    }
}

module.exports = new Common();