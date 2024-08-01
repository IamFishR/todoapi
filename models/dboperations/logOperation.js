const path = require('path');
const fs = require('fs');
const dbconnection = require('../../config/db');
const Common = require('../../helper/common');
class LogOperation {
    constructor() {
        this.pool = dbconnection;
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

    async writeNews(data) {
        try {
            return new Promise((resolve, reject) => {
                const tbl_news = 'news';

                this.pool.query(this.pool.format('INSERT INTO ?? SET ?', [tbl_news, data]), (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    resolve(result);
                });
                // this.pool.query(sql, [data], (err, result) => {
                //     if (err) {
                //         if (Common.ErrorMessages[err.code]) {
                //             reject(Common.ErrorMessages[err.code]);
                //         } else {
                //             reject(err.message);
                //         }
                //     }
                //     resolve(result);
                // });
            });
        } catch (error) {
            return error;
        }
    }
}

module.exports = new LogOperation();
