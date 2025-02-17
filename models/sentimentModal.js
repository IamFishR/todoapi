const dbconnection = require('../config/db');
const { deleteProduct } = require('../controllers/productController');
const Common = require('../helper/common');

class SentimentModal {
    constructor() {
        this.pool = dbconnection;
        // this.tbl_product = 'products';
        // this.tbl_order = 'orders';
        // this.tbl_product_stock = 'product_stock';
    }
}