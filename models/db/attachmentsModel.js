const dbconnection = require('../../config/db');
const Common = require('../../helper/common');
const runQuery = require('../../../helper/dbQuery');


class AttachmentsModel {
    constructor() {
        this.pool = dbconnection;
        this.tableName = 'attachments';
    }
}

module.exports = new AttachmentsModel();