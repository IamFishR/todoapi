const dbconnection = require('../config/db');

class ShopOperation {
    constructor() {
        this.pool = dbconnection;
        this.tbl_shop = 'shop';
        this.tbl_category = 'category';
        this.tbl_product = 'product';
    }

    async addShop(data) {
        const sql = `INSERT INTO ${this.tbl_shop} SET ?`;
        return this.query(sql, data);
    }

    async getShops() {
        const sql = `SELECT * FROM ${this.tbl_shop}`;
        return this.query(sql);
    }

    async getShopById(id) {
        const sql = `SELECT * FROM ${this.tbl_shop} WHERE id = ?`;
        return this.query(sql, [id]);
    }

    async updateShop(id, data) {
        const sql = `UPDATE ${this.tbl_shop} SET ? WHERE id = ?`;
        return this.query(sql, [data, id]);
    }

    async deleteShop(id) {
        // const sql = `DELETE FROM ${this.tbl_shop} WHERE id = ?`;
        // just make the shop inactive
        const sql = `UPDATE ${this.tbl_shop} SET status = 'inactive' WHERE id = ?`;
        return this.query(sql, [id]);
    }

    async addCategory(data) {
        const sql = `INSERT INTO ${this.tbl_category} SET ?`;
        return this.query(sql, data);
    }

    async getCategories(shopId, userId) {
        const sql = `SELECT * FROM ${this.tbl_category} WHERE shop_id = ? AND user_id = ?`;
        return this.query(sql, [shopId, userId]);
    }

    async updateCategory(id, data) {
        const sql = `UPDATE ${this.tbl_category} SET ? WHERE id = ?`;
        return this.query(sql, [data, id]);
    }

    async deleteCategory(id) {
        const sql = `DELETE FROM ${this.tbl_category} WHERE id = ?`;
        return this.query(sql, [id]);
    }

    async addProduct(data) {
        const sql = `INSERT INTO ${this.tbl_product} SET ?`;
        return this.query(sql, data);
    }

    async getProducts(shopId, userId) {
        const sql = `SELECT * FROM ${this.tbl_product} WHERE shop_id = ? AND user_id = ?`;
        return this.query(sql, [shopId, userId]);
    }

    async updateProduct(id, data) {
        const sql = `UPDATE ${this.tbl_product} SET ? WHERE id = ?`;
        return this.query(sql, [data, id]);
    }

    async deleteProduct(id) {
        const sql = `DELETE FROM ${this.tbl_product} WHERE id = ?`;
        return this.query(sql, [id]);
    }

    async addProductQuantityHistory(data) {
        const sql = `INSERT INTO product_quantity_history SET ?`;
        return this.query(sql, data);
    }

    async getProductQuantityHistory(productId) {
        const sql = `SELECT * FROM product_quantity_history WHERE product_id = ?`;
        return this.query(sql, [productId]);
    }

    async addOrder(data) {
        const sql = `INSERT INTO orders SET ?`;
        return this.query(sql, data);
    }

    async getOrders(shopId, userId) {
        const sql = `SELECT * FROM orders WHERE shop_id = ? AND user_id = ?`;
        return this.query(sql, [shopId, userId]);
    }

    async updateOrder(id, data) {
        const sql = `UPDATE orders SET ? WHERE id = ?`;
        return this.query(sql, [data, id]);
    }

    async deleteOrder(id) {
        const sql = `DELETE FROM orders WHERE id = ?`;
        return this.query(sql, [id]);
    }

    async addPromotion(data) {
        const sql = `INSERT INTO promotions SET ?`;
        return this.query(sql, data);
    }

    async getPromotions(id) {
        const sql = `SELECT * FROM promotions WHERE id = ?`;
        return this.query(sql, [shopId]);
    }

    async updatePromotion(id, data) {
        const sql = `UPDATE promotions SET ? WHERE id = ?`;
        return this.query(sql, [data, id]);
    }

    async deletePromotion(id) {
        const sql = `DELETE FROM promotions WHERE id = ?`;
        return this.query(sql, [id]);
    }

    async addReview(data) {
        const sql = `INSERT INTO reviews SET ?`;
        return this.query(sql, data);
    }

    async getReviews(productId) {
        const sql = `SELECT * FROM reviews WHERE product_id = ?`;
        return this.query(sql, [productId]);
    }

    async updateReview(id, data) {
        const sql = `UPDATE reviews SET ? WHERE id = ?`;
        return this.query(sql, [data, id]);
    }

    async deleteReview(id) {
        const sql = `DELETE FROM reviews WHERE id = ?`;
        return this.query(sql, [id]);
    }

    async getShopByName(name) {
        const sql = `SELECT * FROM ${this.tbl_shop} WHERE name = ?`;
        return this.query(sql, [name]);
    }

    query(sql, params) {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, params, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async getCategoryByName(name) {
        const sql = `SELECT * FROM ${this.tbl_category} WHERE name = ?`;
        return this.query(sql, [name]);
    }
}

module.exports = new ShopOperation();
