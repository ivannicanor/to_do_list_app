// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware'); 

router.post('/', authMiddleware.verifyToken ,projectController.createProject);
router.get('/', authMiddleware.verifyToken ,projectController.getProjects);
router.get('/:id', authMiddleware.verifyToken ,projectController.getProjectById);
router.put('/:id', authMiddleware.verifyToken ,projectController.updateProject);
router.delete('/:id', authMiddleware.verifyToken ,projectController.deleteProject);

module.exports = router;