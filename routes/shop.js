var express = require('express');
var router = express.Router();
const shopController = require('../controllers/shopController');

// Shop routes
router.post('/shop', shopController.addShop);
router.put('/shop/:id', shopController.updateShop);
router.delete('/shop/:id', shopController.deleteShop);

// Category routes
router.post('/shop/:shopId/category', shopController.addCategory);
router.put('/shop/:shopId/category/:id', shopController.updateCategory);
router.delete('/shop/:shopId/category/:id', shopController.deleteCategory);

// Product routes
router.post('/shop/:shopId/category/:categoryId/product', shopController.addProduct);
router.put('/shop/:shopId/category/:categoryId/product/:id', shopController.updateProduct);
router.delete('/shop/:shopId/category/:categoryId/product/:id', shopController.deleteProduct);

// Product quantity routes
router.post('/shop/:shopId/category/:categoryId/product/:productId/quantity', shopController.addProductQuantityHistory);
router.get('/shop/:shopId/category/:categoryId/product/:productId/quantity', shopController.getProductQuantityHistory);

// Order routes
router.post('/shop/:shopId/order', shopController.addOrder);
router.put('/shop/:shopId/order/:id', shopController.updateOrder);
router.delete('/shop/:shopId/order/:id', shopController.deleteOrder);

// Promotion routes
router.post('/shop/:shopId/promotion', shopController.addPromotion);
router.put('/shop/:shopId/promotion/:id', shopController.updatePromotion);
router.delete('/shop/:shopId/promotion/:id', shopController.deletePromotion);

// Review routes
router.post('/shop/:shopId/product/:productId/review', shopController.addReview);
router.put('/shop/:shopId/product/:productId/review/:id', shopController.updateReview);
router.delete('/shop/:shopId/product/:productId/review/:id', shopController.deleteReview);

module.exports = router;
