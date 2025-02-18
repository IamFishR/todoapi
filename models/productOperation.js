const dbconnection = require('../config/db');
const { deleteProduct } = require('../controllers/productController');
const Common = require('../helper/common');
const runQuery = require('../helper/dbQuery');

class ProductOperation {
    constructor() {
        this.pool = dbconnection;
        this.tbl_product = 'products';
        this.tbl_order = 'orders';
        this.tbl_product_stock = 'product_stock';
    }

    async getProducts(user_id) {
        try {
            let query = `SELECT * FROM ${this.tbl_product}`;
            if (user_id) {
                query = `SELECT * FROM ${this.tbl_product} WHERE user_id = ?`;
            }
            return await runQuery(this.pool, query, [user_id]);
        } catch (error) {
            return error;
        }
    }

    async addProduct(product) {
        try {
            const query = `INSERT INTO ${this.tbl_product} SET ?`;
            return await runQuery(this.pool, query, [product]);
        } catch (error) {
            return error;
        }
    }

    async updateProduct(product, id) {
        try {
            const query = `UPDATE ${this.tbl_product} SET ? WHERE product_id = ?`;
            return await runQuery(this.pool, query, [product, id]);
        } catch (error) {
            return error;
        }
    }

    async deleteProduct(product_id) {
        try {
            const query = `UPDATE ${this.tbl_product} SET status=0 WHERE product_id = ?`;
            return await runQuery(this.pool, query, [product_id]);
        } catch (error) {
            return error;
        }
    }

    async orderProduct(order) {
        try {
            const query = `INSERT INTO ${this.tbl_order} SET ?`;
            return await runQuery(this.pool, query, [order]);
        } catch (error) {
            return error;
        }
    }

    async getOrders(user_id) {
        try {
            let query = `SELECT * FROM ${this.tbl_order}`;
            if (user_id) {
                query = `SELECT * FROM ${this.tbl_order} WHERE user_id = ?`;
            }
            return await runQuery(this.pool, query, [user_id]);
        } catch (error) {
            return error;
        }
    }

    async getOrder(order_id, user_id) {
        try {
            const query = `SELECT * FROM ${this.tbl_order} WHERE order_id = ? AND user_id = ?`;
            return await runQuery(this.pool, query, [order_id, user_id]);
        } catch (error) {
            return error;
        }
    }

    async updateOrder(order_id, order) {
        try {
            const query = `UPDATE ${this.tbl_order} SET ? WHERE order_id = ?`;
            return await runQuery(this.pool, query, [order, order_id]);
        } catch (error) {
            return error;
        }
    }

    async deleteOrder(order_id) {
        try {
            const query = `UPDATE ${this.tbl_order} SET status=0 WHERE order_id = ?`;
            return await runQuery(this.pool, query, [order_id]);
        } catch (error) {
            return error;
        }
    }

    async addStock(stock) {
        try {
            const query = `INSERT INTO ${this.tbl_product_stock} SET ?`;
            return await runQuery(this.pool, query, [stock]);
        } catch (error) {
            return error;
        }
    }

    async getUserStocks(user_id, stock_id) {
        try {
            let query = `SELECT * FROM ${this.tbl_product_stock} WHERE user_id = ?`;
            if (stock_id) {
                query = `SELECT * FROM ${this.tbl_product_stock} WHERE user_id = ? AND stock_id = ?`;
            }
            return await runQuery(this.pool, query, [user_id, stock_id]);
        } catch (error) {
            return error;
        }
    }

    async getUserStock(stock_id, user_id) {
        try {
            const query = `SELECT * FROM ${this.tbl_product_stock} WHERE stock_id = ? AND user_id = ?`;
            return await runQuery(this.pool, query, [stock_id, user_id]);
        } catch (error) {
            return error;
        }
    }

    async updateUserStock(stock_id, stock) {
        try {
            const query = `UPDATE ${this.tbl_product_stock} SET ? WHERE stock_id = ?`;
            return await runQuery(this.pool, query, [stock, stock_id]);
        } catch (error) {
            return error;
        }
    }

    async deleteUserStock(stock_id) {
        try {
            const query = `UPDATE ${this.tbl_product_stock} SET status=0 WHERE stock_id = ?`;
            return await runQuery(this.pool, query, [stock_id]);
        } catch (error) {
            return error;
        }
    }
}

module.exports = new ProductOperation();