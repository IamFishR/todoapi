const productOperation = require("../models/productOperation");
const logme = require('../helper/logme');
const Common = require('../helper/common');


class ProductController {
    constructor() {

    }

    async getProducts(req, res) {
        try {
            productOperation.getProducts().then((products) => {
                if (products.error) {
                    return res.status(500).send(products.error);
                }

                res.status(200).json({
                    status: 'success',
                    products: products,
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error
                });
            });
        } catch (error) {
            logme.error({ message: 'getProducts failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    async getProduct(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).send('Product ID is required');
            }
            productOperation.getProducts(id).then((product) => {
                if (product.error) {
                    return res.status(500).send(product.error);
                }

                res.status(200).json({
                    status: 'success',
                    product: product,
                });
            });
        } catch (error) {
            logme.error({ message: 'getProduct failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    async addProduct(req, res) {
        try {
            const product = req.body;
            const requiredFields = ['name', 'price'];
            const missingFields = Common.checkRequiredFields(product, requiredFields);
            if (missingFields.length > 0) {
                return res.status(400).send({
                    status: 'error',
                    message: 'Missing fields',
                    fields: missingFields
                });
            }
            productOperation.addProduct({
                product_id: Common.generateUniqueId(),
                name: product.name,
                price: product.price || 0,
                description: product.description || null,
                image_url: product.image_url || null,
                status: product.status || 1,
            }).then((product) => {
                if (product.error) {
                    return res.status(500).send(product.error);
                }

                res.status(200).json({
                    status: 'success',
                    product: product,
                });
            });
        } catch (error) {
            logme.error({ message: 'addProduct failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    async updateProduct(req, res) {
        try {
            const id = req.params.product_id;
            const product = req.body;
            if (!id) {
                return res.status(400).send('Product ID is required');
            }
            productOperation.updateProduct(id, product).then((product) => {
                if (product.error) {
                    return res.status(500).send(product.error);
                }

                res.status(200).json({
                    status: 'success',
                    product: product,
                });
            });
        } catch (error) {
            logme.error({ message: 'updateProduct failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    async deleteProduct(req, res) {
        try {
            const id = req.params.product_id;
            if (!id) {
                return res.status(400).send('Product ID is required');
            }
            productOperation.deleteProduct(id).then((product) => {
                if (product.error) {
                    return res.status(500).send(product.error);
                }

                res.status(200).json({
                    status: 'success',
                    product: product,
                });
            });
        } catch (error) {
            logme.error({ message: 'deleteProduct failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    async orderProduct(req, res) {
        try {
            const order = req.body;
            const requiredFields = ['product_id', 'user_id', 'quantity', 'price', 'order_type'];
            const missingFields = Common.checkRequiredFields(order, requiredFields);
            if (missingFields.length > 0) {
                return res.status(400).send({
                    status: 'error',
                    message: 'Missing fields',
                    fields: missingFields
                });
            }
            productOperation.orderProduct({
                order_id: Common.generateUniqueId(),
                product_id: order.product_id,
                user_id: order.user_id,
                quantity: order.quantity || 1,
                price: order.price || 0,
                order_type: order.order_type || 'sell',
                status: order.status || 1,
            }).then((order) => {
                if (order.error) {
                    return res.status(500).send(order.error);
                }

                res.status(200).json({
                    status: 'success',
                    order: order,
                });
            });
        } catch (error) {
            logme.error({ message: 'orderProduct failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    async getOrders(req, res) {
        try {
            const user_id = req.query.user_id;
            if (!user_id) {
                return res.status(400).send('User ID is required');
            }
            productOperation.getOrders(user_id).then((orders) => {
                if (orders.error) {
                    return res.status(500).send(orders.error);
                }

                res.status(200).json({
                    status: 'success',
                    orders: orders,
                });

            }).catch((error) => {
                res.status(400).json({
                    error: error
                });
            });
        } catch (error) {
            logme.error({ message: 'getOrders failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    async getOrder(req, res) {
        try {
            const id = req.params.id;
            const user_id = req.query.user_id;
            if (!id) {
                return res.status(400).send('Order ID is required');
            }

            productOperation.getOrder(id, user_id).then((order) => {
                if (order.error) {
                    return res.status(500).send(order.error);
                }

                res.status(200).json({
                    status: 'success',
                    order: order,
                });

            }).catch((error) => {
                res.status(400).json({
                    error: error
                });
            });
        } catch (error) {
            logme.error({ message: 'getOrder failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    async updateOrder(req, res) {
        try {
            const order_id = req.params.id;
            const order = req.body;
            const user_id = order.user_id;
            if (!order_id || !user_id) {
                return res.status(400).send('ID is required');
            }
            productOperation.updateOrder(order_id, order).then((order) => {
                if (order.error) {
                    return res.status(500).send(order.error);
                }

                res.status(200).json({
                    status: 'success',
                    order: order,
                });
            });
        } catch (error) {
            logme.error({ message: 'updateOrder failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    async deleteOrder(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).send('ID is required');
            }
            productOperation.deleteOrder(id).then((order) => {
                if (order.error) {
                    return res.status(500).send(order.error);
                }

                res.status(200).json({
                    status: 'success',
                    order: order,
                });
            });
        } catch (error) {
            logme.error({ message: 'deleteOrder failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    async addStock(req, res) {
        try {
            const stock = req.body;
            const requiredFields = ['product_id', 'user_id', 'quantity'];
            const missingFields = Common.checkRequiredFields(stock, requiredFields);
            if (missingFields.length > 0) {
                return res.status(400).send({
                    status: 'error',
                    message: 'Missing fields',
                    fields: missingFields
                });
            }
            productOperation.addStock({
                stock_id: Common.generateUniqueId(),
                product_id: stock.product_id,
                user_id: stock.user_id,
                quantity: stock.quantity || 1,
                price: stock.price || 0,
                status: stock.status || 1,
            }).then((stock) => {
                if (stock.error) {
                    return res.status(500).send(stock.error);
                }

                res.status(200).json({
                    status: 'success',
                    stock: stock,
                });
            });
        } catch (error) {
            logme.error({ message: 'addStock failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    async getUserStocks(req, res) {
        try {
            const user_id = req.query.user_id;
            if (!user_id) {
                return res.status(400).send('User ID is required');
            }
            productOperation.getUserStocks(user_id).then((stocks) => {
                if (stocks.error) {
                    return res.status(500).send(stocks.error);
                }

                res.status(200).json({
                    status: 'success',
                    stocks: stocks,
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error
                });
            });
        } catch (error) {
            logme.error({ message: 'getUserStocks failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    async getUserStock(req, res) {
        try {
            const id = req.params.id;
            const user_id = req.query.user_id;
            if (!id || !user_id) {
                return res.status(400).send('ID is required');
            }
            productOperation.getUserStocks(user_id, id).then((stock) => {
                if (stock.error) {
                    return res.status(500).send(stock.error);
                }

                res.status(200).json({
                    status: 'success',
                    stock: stock,
                });
            });
        } catch (error) {
            logme.error({ message: 'getUserStock failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    async updateUserStock(req, res) {
        try {
            const id = req.params.id;
            const stock = req.body;
            const user_id = stock.user_id;
            if (!id || !user_id) {
                return res.status(400).send('ID is required');
            }
            productOperation.updateUserStock(id, stock).then((stock) => {
                if (stock.error) {
                    return res.status(500).send(stock.error);
                }

                res.status(200).json({
                    status: 'success',
                    stock: stock,
                });
            });
        } catch (error) {
            logme.error({ message: 'updateUserStock failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    async deleteUserStock(req, res) {
        try {
            const id = req.params.id;
            const user_id = req.query.user_id;
            if (!id || !user_id) {
                return res.status(400).send('ID is required');
            }
            productOperation.deleteUserStock(id, user_id).then((stock) => {
                if (stock.error) {
                    return res.status(500).send(stock.error);
                }

                res.status(200).json({
                    status: 'success',
                    stock: stock,
                });
            });
        } catch (error) {
            logme.error({ message: 'deleteUserStock failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }
}


module.exports = new ProductController();