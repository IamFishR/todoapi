const { query } = require('express');
const dbconnection = require('../../config/db');
const logme = require('../../helper/logme');
const mysql = require('mysql');

class GenerativeOperation {
    constructor() {
        this.pool = dbconnection;
    }

    // async getPromt(data) {
    //     const name = data.name;
    //     const options = {
    //         sql: 'SELECT * FROM prompts WHERE name = ' + this.pool.escape(name),
    //         nestTables: true
    //     }

    //     return new Promise((resolve, reject) => {
    //         this.pool.query(options, (err, result, fields) => {
    //             if (err) {
    //                 return reject(err);
    //             }
    //             resolve(result);
    //         });
    //     });
    // }

    async saveResponse(data) {
        try {
            // const response = data.response;
            /**
             * columns
             *  - id (int)
             *  - response (json)
             *  - user_id (varchar 255)
             *  - created_at (timestamp)
             *  - updated_at (timestamp)
             *  - deleted_at (timestamp)
             *  - type (varchar 255)
             *  - status (varchar 255)
             *  
             */
            const json_data = JSON.stringify(data);

            // send all the data to procedure
            return new Promise((resolve, reject) => {
                const query = mysql.format("CALL tsdev_save_response(?)", [json_data]);
                this.pool.query(query, (err, result, fields) => {
                    logme.error({
                        message: err ? err.message : 'Response saved successfully',
                        query: query,
                    });
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
    }
}

module.exports = new GenerativeOperation();