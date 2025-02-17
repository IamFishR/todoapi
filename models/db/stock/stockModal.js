// revenue, profitMargins, debtLevels, dividendPolicies

const dbconnection = require('../../../config/db');
const Common = require('../../../helper/common');

class StockModal {
    constructor() {
        this.pool = dbconnection;
        this.tbl_stock = 'stocks';
    }
}