const dbconnection = require('../../config/db');
const Common = require('../../helper/common');

class AttachmentsModel {
    constructor() {
        this.pool = dbconnection;
        this.tableName = 'attachments';
    }
}

module.exports = new AttachmentsModel();