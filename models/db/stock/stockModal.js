// revenue, profitMargins, debtLevels, dividendPolicies

const dbconnection = require('../../../config/db');
const Common = require('../../../helper/common');
const runQuery = require('../../../helper/dbQuery'); // added helper for query execution
const company = require('./companyModal');
const industry = require('./industrysectorModal');
const sentiment = require('./sentimentModal');

class StockModal {
    constructor() {
        this.pool = dbconnection;
        this.tbl_stock = 'stocks';

        this.company = new company();
        this.industry = new industry();
        this.sentiment = new sentiment();
    }

    async getCompanyStocksWithIndustry() {
        try {
            const query = `CALL getStockWithDetails()`;
            const result = await runQuery(this.pool, query);
            return result[0];
        } catch (error) {
            console.log('Error in getCompanyStocksWithIndustry', error);
            return false;
        }
    }
}

module.exports = StockModal;