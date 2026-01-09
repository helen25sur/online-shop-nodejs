const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/admin');

router.get('/add-product', adminControllers.getAddProduct);

router.post('/add-product', adminControllers.postNewProduct);

router.get('/products', adminControllers.getProducts);

router.get('/edit-product/:productId', adminControllers.getEditProduct);

router.post('/edit-product', adminControllers.postEditProduct);

router.post('/delete-product', adminControllers.postDeleteProduct);


module.exports = router;