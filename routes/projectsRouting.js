const express = require('express');
const router = express.Router();
const middle = require('../middleware');
const projectsController = require('../controllers/projectsController');

router
    .route('/createProject')
    .post(middle.authenticateToken, projectsController.createProject);

router
    .route('/modifyProject')
    .post(middle.authenticateToken, projectsController.modifyProject);

module.exports = router;