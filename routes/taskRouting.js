const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const middle = require('../middleware');

router
    .route('/createTask')
    .post(middle.authenticateToken, taskController.createTask);

module.exports = router;