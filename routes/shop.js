const express = require('express');
const router = express.Router();

const { csrfSynchronisedProtection } = require('../utils/csrf');

const shopControllers = require('../controllers/shop');

router.get('/', shopControllers.getIndex);
router.get('/products', shopControllers.getProducts);
router.get('/products/:productId', shopControllers.getProduct);
router.get('/cart', shopControllers.getCart);
router.post('/cart', csrfSynchronisedProtection, shopControllers.postCart);
router.post('/cart-delete-item', csrfSynchronisedProtection, shopControllers.deleteCartItem);
router.post('/create-order', csrfSynchronisedProtection, shopControllers.postOrder);
router.get('/orders', shopControllers.getOrders);
// router.get('/checkout', shopControllers.getCheckout);

module.exports = router;