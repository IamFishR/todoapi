var express = require('express');
var router = express.Router();
const shopController = require('../controllers/shopController');

// Shop routes
router.post('/', shopController.addShop);
router.put('/:id', shopController.updateShop);
router.delete('/:id', shopController.deleteShop);

// Category routes
router.post('/:shopId/category', shopController.addCategory);
router.put('/:shopId/category/:id', shopController.updateCategory);
router.delete('/:shopId/category/:id', shopController.deleteCategory);

// Product routes
router.post('/:shopId/category/:categoryId/product', shopController.addProduct);
router.put('/:shopId/category/:categoryId/product/:id', shopController.updateProduct);
router.delete('/:shopId/category/:categoryId/product/:id', shopController.deleteProduct);

// Product quantity routes
router.post('/:shopId/category/:categoryId/product/:productId/quantity', shopController.addProductQuantityHistory);
router.get('/:shopId/category/:categoryId/product/:productId/quantity', shopController.getProductQuantityHistory);

// Order routes
router.post('/:shopId/order', shopController.addOrder);
router.put('/:shopId/order/:id', shopController.updateOrder);
router.delete('/:shopId/order/:id', shopController.deleteOrder);

// Promotion routes
router.post('/:shopId/promotion', shopController.addPromotion);
router.put('/:shopId/promotion/:id', shopController.updatePromotion);
router.delete('/:shopId/promotion/:id', shopController.deletePromotion);

// Review routes
router.post('/:shopId/product/:productId/review', shopController.addReview);
router.put('/:shopId/product/:productId/review/:id', shopController.updateReview);
router.delete('/:shopId/product/:productId/review/:id', shopController.deleteReview);

module.exports = router;
