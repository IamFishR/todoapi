var express = require('express');
var router = express.Router();
const { authMiddleware } = require('../config/authMiddleware');
const productController = require('../controllers/productController');

router.get('/', authMiddleware, productController.getProducts);
router.post('/add', authMiddleware, productController.addProduct);
router.get('/:id', authMiddleware, productController.getProduct);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

// order
router.post('/order', authMiddleware, productController.orderProduct);
router.get('/order', authMiddleware, productController.getOrders);
router.get('/order/:id', authMiddleware, productController.getOrder);
router.put('/order/:id', authMiddleware, productController.updateOrder);
router.delete('/order/:id', authMiddleware, productController.deleteOrder);


// user product stock
router.post('/product-stock', authMiddleware, productController.addStock);
router.get('/product-stock', authMiddleware, productController.getUserStocks);
router.get('/product-stock/:id', authMiddleware, productController.getUserStock);
router.put('/product-stock/:id', authMiddleware, productController.updateUserStock);
router.delete('/product-stock/:id', authMiddleware, productController.deleteUserStock);


module.exports = router;