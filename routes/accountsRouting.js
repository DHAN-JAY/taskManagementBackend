const express = require('express');
const accountsController = require('../controllers/accountsController');
const middle = require('../middleware');
const router = express.Router();

router
    .route('/getAllAccounts')
    .get(middle.authenticateToken, middle.adminRestrict,accountsController.getAllUsers);

router
    .route('/signup')
    .post(accountsController.signup)

router
    .route('/login')
    .post(accountsController.login)

router
    .route('/getAllManagers')
    .get(middle.authenticateToken,middle.adminRestrict,accountsController.getAllManagers);

router
    .route('/getAllDevelopers')
    .get(middle.authenticateToken,middle.adminManagerRestriction,accountsController.getAllDevelopers);

module.exports = router;
