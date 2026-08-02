const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/auth');

router.get('/login', authControllers.getLogin);
router.post('/login', authControllers.postLogin);
router.post('/logout', authControllers.postLogout);
router.get('/register', authControllers.getRegister);
router.post('/register', authControllers.postRegister);

module.exports = router;