// controllers/projectController.js
const { Project } = require('../models');
const { Task } = require('../models');


exports.createProject = async (req, res) => {
  try {
    const projectData = {
      name: req.body.name,
      description: req.body.description,
      id_usuario: req.user.sub
    }

    const project = await Project.create(projectData);

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear proyecto', error: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: {
        id_usuario: req.user.sub,
      },
    });;
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener proyectos', error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      where: {
        id: req.params.id, // La clave principal (id)
        id_usuario: req.user.sub
      }
    });

    if (!project) return res.status(404).json({ message: 'Proyecto no encontrado o sin persmiso para acceder' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener proyecto', error: error.message });
  }
};


exports.updateProject = async (req, res) => {
  try {
    const [updated] = await Project.update(req.body, {
      where: { 
        id: req.params.id,
        id_usuario: req.user.sub 
      }
    });

    if (!updated) return res.status(404).json({ message: 'Proyecto no encontrado o sin acceso' });

    const updatedProject = await Project.findByPk(req.params.id);
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar proyecto', error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.destroy({ where: { 
        id: req.params.id,
        id_usuario: req.user.sub 
      } });
    if (!deleted) return res.status(404).json({ message: 'Proyecto no encontrado o sin acceso' });
    res.json({ message: 'Proyecto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar proyecto', error: error.message });
  }
};


exports.createTaskToProject = async (req, res) => {
  try {
    const taskData = {
      title: req.body.title,
      description: req.body.description,
      projectId: req.params.projectId,
      id_usuario: req.user.sub
    };

    const task = await Task.create(taskData);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar tarea al proyecto', error: error.message });
  }
};

exports.getTasksInProject = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: {
        projectId: req.params.projectId,
        id_usuario: req.user.sub
      }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas del proyecto', error: error.message });
  }
};

exports.updateTaskInProject = async (req, res) => {
  try {
    const [updated] = await Task.update(req.body, {
      where: {
        id: req.params.taskId,
        projectId: req.params.projectId,
        id_usuario: req.user.sub
      }
    });
    if (!updated) return res.status(404).json({ message: 'Tarea no encontrada o sin acceso' });

    const updatedTask = await Task.findByPk(req.params.taskId);
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar tarea del proyecto', error: error.message });
  }
};

exports.deleteTaskFromProject = async (req, res) => {
  try {
    const deleted = await Task.destroy({
      where: {
        id: req.params.taskId,
        projectId: req.params.projectId,
        id_usuario: req.user.sub
      }
    });
    if (!deleted) return res.status(404).json({ message: 'Tarea no encontrada o sin acceso' });
    res.json({ message: 'Tarea eliminada del proyecto' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar tarea del proyecto', error: error.message });
  }
};

