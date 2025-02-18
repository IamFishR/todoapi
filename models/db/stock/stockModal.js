// revenue, profitMargins, debtLevels, dividendPolicies

const dbconnection = require('../../../config/db');
const Common = require('../../../helper/common');
const runQuery = require('../../../helper/dbQuery'); // added helper for query execution

class StockModal {
    constructor() {
        this.pool = dbconnection;
        this.tbl_stock = 'stocks';
    }

    // Future methods can use runQuery(this.pool, query, params)
}

module.exports = StockModal;