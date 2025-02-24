const crypto = require('crypto');

class Common {
    constructor() {

    }

    /**
     * Generates a unique 24-character hexadecimal identifier.
     * @returns {string} A unique 24-character hexadecimal identifier.
     */
    async generateUniqueId() {
        return crypto.randomBytes(12).toString('hex');
    }

    generateuuid() {
        return crypto.randomBytes(16).toString('hex');
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

    getUnixTimeStamp() {
        return Math.floor(new Date().getTime() / 1000);
    }

    getRandomColor() {
        const colors = [
            '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        ]

        return colors[Math.floor(Math.random() * colors.length)];
    }

    ErrorMessages = {
        'ER_BAD_FIELD_ERROR': 'Bad field error',
        'ER_NO_SUCH_TABLE': 'No such table',
        'ER_PARSE_ERROR': 'Parse error',
        'ER_ACCESS_DENIED_ERROR': 'Access denied error',
        'ER_BAD_DB_ERROR': 'Bad database error',
        'ER_BAD_TABLE_ERROR': 'Bad table error',
        'ER_NO_SUCH_TABLE': 'No such table',
        'ER_TABLE_EXISTS_ERROR': 'Table exists error',
        'ER_DUP_ENTRY': 'Duplicate entry',
        'ER_NO_REFERENCED_ROW_2': 'Foreign key constraint fails',
        'ER_NO_DEFAULT_FOR_FIELD': 'Field doesn\'t have a default value',
        'ER_DATA_TOO_LONG': 'Data too long for column',
        'ER_TRUNCATED_WRONG_VALUE': 'Truncated wrong value',
        'ER_NO_DEFAULT_FOR_FIELD': 'Field doesn\'t have a default value',
        'ER_CANT_AGGREGATE_2COLLATIONS': 'collation mismatch',
        'ER_DUP_FIELDNAME': 'Duplicate column name',
        'ER_SP_WRONG_NO_OF_ARGS': 'arguments mismatch!'
    }

    convertTimeToGMT(time) {
        time = time ? parseInt(time) : new Date().getTime();
        // const gmttime = new Date(time).toGMTString();

        // gmttime format to 2024-06-21 13:54:43
        let date = new Date(time);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    checkRequiredFields(data, requiredFields) {
        const missingFields = [];
        requiredFields.forEach(field => {
            if (!data[field]) {
                missingFields.push(field);
            }
        });

        return missingFields;
    }

    error(message) {
        return {
            error: message
        }
    }

    success(message) {
        return {
            success: message
        }
    }
}

module.exports = new Common();