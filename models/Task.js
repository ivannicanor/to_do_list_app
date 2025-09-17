const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');


//Definición del modelo de tarea
const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
    },
  description: {
    type: DataTypes.TEXT
  },
  state: {
    type: DataTypes.ENUM('pending', 'in-progress', 'done'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'tasks',
  timestamps: false
});


//Exportamos el modelo
module.exports = Task;
