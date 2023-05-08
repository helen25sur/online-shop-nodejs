const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/admin');

router.get('/add-product', adminControllers.getAddProduct);

router.post('/add-product', adminControllers.postNewProduct);

router.get('/products', adminControllers.getProducts);


module.exports = router;