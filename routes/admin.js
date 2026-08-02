const express = require('express');
const router = express.Router();

const { csrfSynchronisedProtection } = require('../utils/csrf');

const adminControllers = require('../controllers/admin');

router.get('/add-product', adminControllers.isAuth, adminControllers.getAddProduct);

router.post('/add-product', adminControllers.isAuth, csrfSynchronisedProtection, adminControllers.postNewProduct);

router.get('/products', adminControllers.isAuth, adminControllers.getProducts);

router.get('/edit-product/:productId', adminControllers.isAuth, adminControllers.getEditProduct);

router.post('/edit-product', adminControllers.isAuth, csrfSynchronisedProtection, adminControllers.postEditProduct);

router.post('/delete-product', adminControllers.isAuth, csrfSynchronisedProtection, adminControllers.postDeleteProduct);


module.exports = router;