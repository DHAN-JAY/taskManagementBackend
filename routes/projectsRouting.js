const express = require('express');
const router = express.Router();
const middle = require('../middleware');
const projectsController = require('../controllers/projectsController');

router
    .route('/createProject')
    .post(middle.authenticateToken, middle.adminRestrict ,projectsController.createProject);

router
    .route('/modifyProject')
    .post(middle.authenticateToken, middle.adminRestrict ,projectsController.modifyProject);

router
    .route('/getAllProjects')
    .get(middle.authenticateToken,middle.adminManagerRestriction, projectsController.getAllProjects);

router
    .route('/deleteProject')
    .post(middle.authenticateToken, middle.adminRestrict, projectsController.deleteProject);

module.exports = router;