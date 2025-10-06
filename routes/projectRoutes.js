// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware'); 

//Crud Projects
router.post('/', authMiddleware.verifyToken ,projectController.createProject);
router.get('/', authMiddleware.verifyToken ,projectController.getProjects);
router.get('/:id', authMiddleware.verifyToken ,projectController.getProjectById);
router.put('/:id', authMiddleware.verifyToken ,projectController.updateProject);
router.delete('/:id', authMiddleware.verifyToken ,projectController.deleteProject);

//rutas para manejar tareas dentro de un proyecto
router.post('/:projectId/tasks', authMiddleware.verifyToken ,projectController.createTaskToProject);
router.get('/:projectId/tasks', authMiddleware.verifyToken ,projectController.getTasksInProject);
router.put('/:projectId/tasks/:taskId', authMiddleware.verifyToken ,projectController.updateTaskInProject);
router.delete('/:projectId/tasks/:taskId', authMiddleware.verifyToken ,projectController.deleteTaskFromProject);


module.exports = router;