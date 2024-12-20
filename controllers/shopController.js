const { body, param, validationResult } = require('express-validator');
const ShopOperation = require('../models/shopOperation');
const Common = require('../helper/common');

exports.addShop = [
    body('name').notEmpty().withMessage('Name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('status').notEmpty().withMessage('Status is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const shop = await ShopOperation.getShopByName(req.body.name);
            if (shop.length > 0) {
                return res.status(400).json({ error: 'Shop already exists' });
            }

            // Generate shop ID
            req.body.id = Common.generateuuid();
            const result = await ShopOperation.addShop(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.getShops = async (req, res) => {
    try {
        const result = await ShopOperation.getShops();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateShop = [
    param('id').notEmpty().withMessage('Invalid shop ID'),
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('address').optional().notEmpty().withMessage('Address cannot be empty'),
    body('phone').optional().notEmpty().withMessage('Phone cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('status').optional().notEmpty().withMessage('Status cannot be empty'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const result = await ShopOperation.updateShop(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.deleteShop = [
    param('id').notEmpty().withMessage('Invalid shop ID'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const result = await ShopOperation.deleteShop(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.addCategory = [
    body('name').notEmpty().withMessage('Name is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const category = await ShopOperation.getCategoryByName(req.body.name);
            if (category.length > 0) {
                return res.status(400).json({ error: 'Category already exists' });
            }

            // Generate category ID
            req.body.id = Common.generateuuid();

            req.body.shop_id = req.params.shopId;
            const result = await ShopOperation.addCategory(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.updateCategory = [
    param('id').notEmpty().withMessage('Invalid category ID'),
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const result = await ShopOperation.updateCategory(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.deleteCategory = [
    param('id').notEmpty().withMessage('Invalid category ID'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const result = await ShopOperation.deleteCategory(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.addProduct = [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // Generate product ID
            req.body.id = Common.generateuuid();
            const result = await ShopOperation.addProduct(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.updateProduct = [
    param('id').notEmpty().withMessage('Invalid product ID'),
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const result = await ShopOperation.updateProduct(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.deleteProduct = [
    param('id').notEmpty().withMessage('Invalid product ID'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const result = await ShopOperation.deleteProduct(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.addProductQuantityHistory = [
    body('quantity').isInt().withMessage('Quantity must be an integer'),
    body('change_type').notEmpty().withMessage('Change type is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // Generate product quantity ID
            req.body.id = Common.generateuuid();
            const result = await ShopOperation.addProductQuantityHistory(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.getProductQuantityHistory = [
    param('productId').notEmpty().withMessage('Invalid product ID'),
    async (req, res) => {
        try {
            const result = await ShopOperation.getProductQuantityHistory(req.params.productId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.addOrder = [
    body('total_amount').isFloat({ gt: 0 }).withMessage('Total amount must be greater than 0'),
    body('order_type').notEmpty().withMessage('Order type is required'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // Generate order ID
            req.body.id = Common.generateuuid();
            const result = await ShopOperation.addOrder(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.updateOrder = [
    param('id').notEmpty().withMessage('Invalid order ID'),
    body('total_amount').optional().isFloat({ gt: 0 }).withMessage('Total amount must be greater than 0'),
    body('order_type').optional().notEmpty().withMessage('Order type cannot be empty'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const result = await ShopOperation.updateOrder(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.deleteOrder = [
    param('id').notEmpty().withMessage('Invalid order ID'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const result = await ShopOperation.deleteOrder(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.addPromotion = [
    body('code').notEmpty().withMessage('Code is required'),
    body('discount').isFloat({ gt: 0 }).withMessage('Discount must be greater than 0'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // Generate promotion ID
            req.body.id = Common.generateuuid();
            const result = await ShopOperation.addPromotion(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.updatePromotion = [
    param('id').notEmpty().withMessage('Invalid promotion ID'),
    body('code').optional().notEmpty().withMessage('Code cannot be empty'),
    body('discount').optional().isFloat({ gt: 0 }).withMessage('Discount must be greater than 0'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const result = await ShopOperation.updatePromotion(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.deletePromotion = [
    param('id').notEmpty().withMessage('Invalid promotion ID'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const result = await ShopOperation.deletePromotion(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.addReview = [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().notEmpty().withMessage('Comment cannot be empty'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // Generate review ID
            req.body.id = Common.generateuuid();
            const result = await ShopOperation.addReview(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.updateReview = [
    param('id').isInt().withMessage('Invalid review ID'),
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().notEmpty().withMessage('Comment cannot be empty'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const result = await ShopOperation.updateReview(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.deleteReview = [
    param('id').isInt().withMessage('Invalid review ID'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const result = await ShopOperation.deleteReview(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.getShopDetail = async (req, res) => {
    try {
        const shopId = req.params.shopId;

        const shop = await ShopOperation.getShopById(shopId);
        if (shop.length === 0) {
            return res.status(404).json({ error: 'Shop not found' });
        }

        const categories = await ShopOperation.getCategories(shopId);
        const products = await ShopOperation.getProducts(shopId);
        const orders = await ShopOperation.getOrders(shopId);
        // const promotions = await ShopOperation.getPromotions(shopId);
        const reviews = await ShopOperation.getReviews(shopId);

        const result = {
            shop: shop[0],
            categories: categories,
            products: products,
            orders: orders,
            promotions: [],
            reviews: reviews
        };

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
