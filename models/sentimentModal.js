const dbconnection = require('../config/db');
const runQuery = require('../helper/dbQuery'); // added helper for query execution
const { deleteProduct } = require('../controllers/productController');
const Common = require('../helper/common');

class SentimentModal {
    constructor() {
        this.pool = dbconnection;
        // helper runQuery is available
    }

    // Future methods can use runQuery(this.pool, query, params)
}

module.exports = SentimentModal;