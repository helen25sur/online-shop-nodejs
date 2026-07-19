const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/admin');

router.get('/add-product', adminControllers.isAuth, adminControllers.getAddProduct);

router.post('/add-product', adminControllers.isAuth, adminControllers.postNewProduct);

router.get('/products', adminControllers.isAuth, adminControllers.getProducts);

router.get('/edit-product/:productId', adminControllers.isAuth, adminControllers.getEditProduct);

router.post('/edit-product', adminControllers.isAuth, adminControllers.postEditProduct);

router.post('/delete-product', adminControllers.isAuth, adminControllers.postDeleteProduct);


module.exports = router;