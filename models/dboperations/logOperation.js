const path = require('path');
const fs = require('fs');
const dbconnection = require('../../config/db');
const Common = require('../../helper/common');
const logme = require('../../helper/logme');
const { log } = require('console');
class LogOperation {
    constructor() {
        this.pool = dbconnection;
        // log file name should be dd_mm_yyyy.log
        const date = new Date();
        this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.logFileName = date.getDate() + '_' + this.months[date.getMonth()] + '_' + date.getFullYear() + '.log';
        this.tbl_sms = 'sms_logs';

    }

    createLogFileName(date) {xxxz
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

                const sql = `INSERT INTO ${tbl_news} SET ?`;
                this.pool.query(sql, [data], (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            return reject(Common.ErrorMessages[err.code]);
                        } else {
                            return reject(err.message);
                        }
                    }
                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async writeSMS(data) {
        try {
            return new Promise((resolve, reject) => {
                const tbl_sms = 'sms_logs';

                const sql = `INSERT INTO ${tbl_sms} SET ?`;
                logme.info({
                    message: `query: ${sql}`,
                    method: 'writeSMS',
                    controller: 'LogOperation',
                    action: 'writeSMS'
                });
                this.pool.query(sql, [data], (err, result) => {
                    if (err) {
                        logme.error({
                            message: err.message,
                            method: 'writeSMS',
                            controller: 'LogOperation',
                            action: 'writeSMS'
                        });
                        if (Common.ErrorMessages[err.code]) {
                            return reject(Common.ErrorMessages[err.code]);
                        } else {
                            return reject(err.message);
                        }
                    }
                    logme.info({
                        message: `SMS written successfully with id: ${result.insertId}`,
                        method: 'writeSMS',
                        controller: 'LogOperation',
                        action: 'writeSMS'
                    });
                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
    }
}

module.exports = new LogOperation();
