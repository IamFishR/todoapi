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

    async getdb() {
        try {
            // Get all tables and columns from the database taasdsvd_taaskly_new
            const query = `SELECT table_name, column_name,COLUMN_KEY, DATA_TYPE FROM information_schema.columns WHERE table_schema = 'taasdsvd_taaskly_new'`;

            // Get relationships
            const query1 = `SELECT table_name, column_name, referenced_table_name, referenced_column_name FROM information_schema.key_column_usage WHERE table_schema = 'taasdsvd_taaskly_new' AND referenced_table_name IS NOT NULL`;


            const columnsResult = await runQuery(this.pool, query);
            const relationshipsResult = await runQuery(this.pool, query1);

            const data = {};

            columnsResult.forEach((element) => {
                const { TABLE_NAME, column_name, COLUMN_KEY, DATA_TYPE } = element;
                if (!data[TABLE_NAME]) {
                    data[TABLE_NAME] = [];
                }
                data[TABLE_NAME].push({ column_name, COLUMN_KEY, DATA_TYPE });
            });


            relationshipsResult.forEach((relation) => {
                const { TABLE_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME } = relation;

                if (!data[TABLE_NAME]) {
                    data[TABLE_NAME] = [];
                }
                data[TABLE_NAME].push({ COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME });
            });

            return data;


        } catch (error) {
            console.log('Error in getdb', error);
            return { status: false, message: 'Internal server error' };
        }
    }
}

module.exports = StockModal;