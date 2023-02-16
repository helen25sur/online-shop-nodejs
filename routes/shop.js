const express = require('express');
const router = express.Router();

const procuctsControllers = require('../controllers/products');

router.get('/', procuctsControllers.getAllProducts);

module.exports = router;