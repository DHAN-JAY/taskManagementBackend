const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const middle = require('../middleware');

router
    .route('/createTask')
    .post(middle.authenticateToken, taskController.createTask);

router
    .route('/updateTaskStatus')
    .post(middle.authenticateToken, taskController.updateTaskStatus);

router
    .route('/getAllTasks')
    .post(middle.authenticateToken, taskController.getAllTasks);

module.exports = router;