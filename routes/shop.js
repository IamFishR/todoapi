var express = require('express');
var router = express.Router();
const shopController = require('../controllers/shopController');
const { authMiddleware } = require('../config/authMiddleware');


// Shop routes
router.get('/',authMiddleware, shopController.getShops);
router.post('/',authMiddleware, shopController.addShop);
router.put('/:id',authMiddleware, shopController.updateShop);
router.delete('/:id',authMiddleware, shopController.deleteShop);

// Shop detail routes
router.get('/:shopId',authMiddleware, shopController.getShopDetail);

// Category routes
router.post('/:shopId/category',authMiddleware, shopController.addCategory);
router.put('/:shopId/category/:id',authMiddleware, shopController.updateCategory);
router.delete('/:shopId/category/:id',authMiddleware, shopController.deleteCategory);

// Product routes
router.post('/:shopId/category/:categoryId/product',authMiddleware, shopController.addProduct);
router.put('/:shopId/category/:categoryId/product/:id',authMiddleware, shopController.updateProduct);
router.delete('/:shopId/category/:categoryId/product/:id',authMiddleware, shopController.deleteProduct);

// Product quantity routes
router.post('/:shopId/category/:categoryId/product/:productId/quantity',authMiddleware, shopController.addProductQuantityHistory);
router.get('/:shopId/category/:categoryId/product/:productId/quantity',authMiddleware, shopController.getProductQuantityHistory);

// Order routes
router.post('/:shopId/order',authMiddleware, shopController.addOrder);
router.put('/:shopId/order/:id',authMiddleware, shopController.updateOrder);
router.delete('/:shopId/order/:id',authMiddleware, shopController.deleteOrder);

// Promotion routes
router.post('/:shopId/promotion',authMiddleware, shopController.addPromotion);
router.put('/:shopId/promotion/:id',authMiddleware, shopController.updatePromotion);
router.delete('/:shopId/promotion/:id',authMiddleware, shopController.deletePromotion);

// Review routes
router.post('/:shopId/product/:productId/review',authMiddleware, shopController.addReview);
router.put('/:shopId/product/:productId/review/:id',authMiddleware, shopController.updateReview);
router.delete('/:shopId/product/:productId/review/:id',authMiddleware, shopController.deleteReview);

// File upload route
router.post('/upload',authMiddleware, shopController.uploadImage);

module.exports = router;
