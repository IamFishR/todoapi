const path = require('path');
const fs = require('fs');

class LogOperation {
    constructor() {
        // log file name should be dd_mm_yyyy.log
        const date = new Date();
        this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.logFileName = date.getDate() + '_' + this.months[date.getMonth()] + '_' + date.getFullYear() + '.log';

    }

    createLogFileName(date) {
        try {
            const _date = new Date(date);
            const fileName = _date.getDate() + '_' + this.months[_date.getMonth()] + '_' + _date.getFullYear() + '.log';

            return fileName.toString();
        } catch (error) {
            return error;
        }
    }

    async getLogs(date) {
        try {
            return new Promise((resolve, reject) => {
                const fileName = this.createLogFileName(date);
                if (fileName.error) {
                    reject(fileName.error);
                }
                const logFile = path.join(__dirname, '../../logs', fileName);
                // read file
                fs.readFile(logFile, 'utf8', (error, data) => {
                    if (error) {
                        reject(error);
                    }

                    resolve(data);
                });
            });
        } catch (error) {
            reject(error);
        }
    }

    async writeSMS(date) {
        try {
            return new Promise((resolve, reject) => {
                const fileName = 'sms_tracking.json';
                const logFile = path.join(__dirname, '../../logs', fileName);
                // write all json data to file
                fs.writeFile(logFile, JSON.stringify(date), 'utf8', (error) => {
                    if (error) {
                        reject(error);
                    }

                    resolve({ message: 'Data written successfully' });
                });
            });
        } catch (error) {
            reject(error);
        }
    }
}

module.exports = new LogOperation();
