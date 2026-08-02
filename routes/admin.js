const express = require('express');
const router = express.Router();

const { csrfSynchronisedProtection } = require('../utils/csrf');

const adminControllers = require('../controllers/admin');

router.get('/add-product', adminControllers.isAuth, adminControllers.getAddProduct);

router.post('/add-product', csrfSynchronisedProtection, adminControllers.isAuth, adminControllers.postNewProduct);

router.get('/products', adminControllers.isAuth, adminControllers.getProducts);

router.get('/edit-product/:productId', adminControllers.isAuth, adminControllers.getEditProduct);

router.post('/edit-product', csrfSynchronisedProtection, adminControllers.isAuth, adminControllers.postEditProduct);

router.post('/delete-product', csrfSynchronisedProtection, adminControllers.isAuth, adminControllers.postDeleteProduct);


module.exports = router;