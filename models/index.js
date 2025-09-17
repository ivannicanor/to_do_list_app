// models/index.js
// Punto de entrada para definir modelos y relaciones
const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');
// Relaciones
User.hasMany(Project, { foreignKey: 'id_usuario' });
Project.belongsTo(User, { foreignKey: 'id_usuario' });


Project.hasMany(Task, { foreignKey: 'id_proyecto' });
Task.belongsTo(Project, { foreignKey: 'id_proyecto' });


User.hasMany(Task, { foreignKey: 'id_usuario' });
Task.belongsTo(User, { foreignKey: 'id_usuario' });


module.exports = { User, Project, Task };
