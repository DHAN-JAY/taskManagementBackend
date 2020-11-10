const express = require('express');
const accountsController = require('../controllers/accountsController');
const middle = require('../middleware');
const router = express.Router();

router
    .route('/getAllAccounts')
    .get(middle.authenticateToken,accountsController.getAllUsers);

router
    .route('/signup')
    .post(accountsController.signup)

router
    .route('/login')
    .post(accountsController.login)

module.exports = router;
