const dbconnection = require('../../../config/db');
const Common = require('../../../helper/common');
const runQuery = require('../../../helper/dbQuery'); // added helper

// CREATE TABLE market_activity (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     date DATE NOT NULL UNIQUE,
    
//     -- DII Data
//     dii_buy_value DECIMAL(12,2) NOT NULL,
//     dii_sell_value DECIMAL(12,2) NOT NULL,
//     dii_net_value DECIMAL(12,2) NOT NULL,
//     dii_strength ENUM('positive', 'negative', 'neutral') NOT NULL,
    
//     -- FII/FPI Data
//     fii_buy_value DECIMAL(12,2) NOT NULL,
//     fii_sell_value DECIMAL(12,2) NOT NULL,
//     fii_net_value DECIMAL(12,2) NOT NULL,
//     fii_strength ENUM('positive', 'negative', 'neutral') NOT NULL,

//     -- Comparative Analysis
//     stronger_entity ENUM('DII', 'FII/FPI') DEFAULT NULL,
//     stronger_message VARCHAR(255) DEFAULT NULL
// );

class SentimentDBOperations {
    constructor() {
        this.pool = dbconnection;
        this.tbl_mactivity = 'market_activity ';
    }

    async insertMarketActivity(activityData) {
        try {
            const insertQuery = `INSERT INTO ${this.tbl_mactivity} SET ?`;
            const result = await runQuery(this.pool, insertQuery, activityData);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = SentimentDBOperations;