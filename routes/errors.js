const express = require('express');
const router = express.Router();

const errorsControllers = require('../controllers/errors');

router.use(errorsControllers.return404Error);

module.exports = router;