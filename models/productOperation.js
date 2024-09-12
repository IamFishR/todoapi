const dbconnection = require('../config/db');
const { deleteProduct } = require('../controllers/productController');
const Common = require('../helper/common');

class ProductOperation {
    constructor() {
        this.pool = dbconnection;
        this.tbl_product = 'products';
        this.tbl_order = 'orders';
        this.tbl_product_stock = 'product_stock';
    }

    async getProducts(user_id) {
        try {
            return new Promise((resolve, reject) => {
                let query = `SELECT * FROM ${this.tbl_product}`;
                if (user_id) {
                    query = `SELECT * FROM ${this.tbl_product} WHERE user_id = ${user_id}`;
                }

                this.pool.query(query, (err, results) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    resolve(results);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async addProduct(product) {
        try {
            return new Promise((resolve, reject) => {
                this.pool.query(`INSERT INTO ${this.tbl_product} SET ?`, product, (err, results) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    resolve(results);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async updateProduct(product, id) {
        try {
            return new Promise((resolve, reject) => {
                this.pool.query(`UPDATE ${this.tbl_product} SET ? WHERE product_id = ?`, [product, id], (err, results) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    resolve(results);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async deleteProduct(product_id) {
        try {
            return new Promise((resolve, reject) => {
                let query = `UPDATE ${this.tbl_product} SET status=0 WHERE product_id = ?`;
                this.pool.query(query, product_id, (err, results) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    resolve(results);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async orderProduct(order) {
        try {
            return new Promise((resolve, reject) => {
                this.pool.query(`INSERT INTO ${this.tbl_order} SET ?`, order, (err, results) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    resolve(results);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async getOrders(user_id) {
        try {
            return new Promise((resolve, reject) => {
                let query = `SELECT * FROM ${this.tbl_order}`;
                if (user_id) {
                    query = `SELECT * FROM ${this.tbl_order} WHERE user_id = ${user_id}`;
                }

                this.pool.query(query, (err, results) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    resolve(results);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async getOrder(order_id, user_id) {
        try {
            return new Promise((resolve, reject) => {
                this.pool.query(`SELECT * FROM ${this.tbl_order} WHERE order_id = ? AND user_id = ?`, [order_id, user_id], (err, results) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    resolve(results);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async updateOrder(order_id, order) {
        try {
            return new Promise((resolve, reject) => {
                this.pool.query(`UPDATE ${this.tbl_order} SET ? WHERE order_id = ?`, [order, order_id], (err, results) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    resolve(results);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async deleteOrder(order_id) {
        try {
            return new Promise((resolve, reject) => {
                this.pool.query(`UPDATE ${this.tbl_order} SET status=0 WHERE order_id = ?`, order_id, (err, results) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    resolve(results);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async addStock(stock) {
        try {
            return new Promise((resolve, reject) => {
                this.pool.query(`INSERT INTO ${this.tbl_product_stock} SET ?`, stock, (err, results) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    resolve(results);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async getUserStocks(user_id, stock_id) {
        try {
            return new Promise((resolve, reject) => {
                let query = `SELECT * FROM ${this.tbl_product_stock} WHERE user_id = ${user_id}`;
                if (user_id) {
                    query = `SELECT * FROM ${this.tbl_product_stock} WHERE user_id = ${user_id} AND stock_id = ${stock_id}`;
                }

                this.pool.query(query, (err, results) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    resolve(results);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async getUserStock(stock_id, user_id) {
        try {
            return new Promise((resolve, reject) => {
                this.pool.query(`SELECT * FROM ${this.tbl_product_stock} WHERE stock_id = ? AND user_id = ?`, [stock_id, user_id], (err, results) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    resolve(results);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async updateUserStock(stock_id, stock) {
        try {
            return new Promise((resolve, reject) => {
                this.pool.query(`UPDATE ${this.tbl_product_stock} SET ? WHERE stock_id = ?`, [stock, stock_id], (err, results) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    resolve(results);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async deleteUserStock(stock_id) {
        try {
            return new Promise((resolve, reject) => {
                this.pool.query(`UPDATE ${this.tbl_product_stock} SET status=0 WHERE stock_id = ?`, stock_id, (err, results) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    resolve(results);
                });
            });
        } catch (error) {
            return error;
        }
    }
}

module.exports = new ProductOperation();