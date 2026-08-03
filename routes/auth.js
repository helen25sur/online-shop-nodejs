const express = require('express');
const router = express.Router();

const { csrfSynchronisedProtection } = require('../utils/csrf');

const authControllers = require('../controllers/auth');

router.get('/login', authControllers.getLogin);
router.post('/login', csrfSynchronisedProtection, authControllers.postLogin);
router.post('/logout', csrfSynchronisedProtection, authControllers.postLogout);
router.get('/register', authControllers.getRegister);
router.post('/register', csrfSynchronisedProtection, authControllers.postRegister);

router.get('/reset-password', authControllers.getResetPassword);
router.post('/reset-password', csrfSynchronisedProtection, authControllers.postResetPassword);

router.get('/reset-password/:token', authControllers.getNewPassword);
router.post('/new-password', csrfSynchronisedProtection, authControllers.postNewPassword);

module.exports = router;