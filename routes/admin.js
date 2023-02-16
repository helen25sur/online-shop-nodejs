const express = require('express');
const router = express.Router();

const procuctsControllers = require('../controllers/products');

router.get('/add-product', procuctsControllers.getAddProduct);

router.post('/add-product', procuctsControllers.postNewProduct);

module.exports = router;