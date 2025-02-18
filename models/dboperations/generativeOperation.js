const { query } = require('express');
const dbconnection = require('../../config/db');
const logme = require('../../helper/logme');
const mysql = require('mysql');
const runQuery = require('../../helper/dbQuery');

class GenerativeOperation {
    constructor() {
        this.pool = dbconnection;
    }

    async saveResponse(data) {
        try {
            const json_data = JSON.stringify(data);
            const sql = 'CALL tsdev_save_response(?)';
            return await runQuery(this.pool, sql, [json_data]);
        } catch (error) {
            logme.error({
                message: 'saveResponse failed',
                data: { error }
            });
            return error;
        }
    }
}

module.exports = new GenerativeOperation();