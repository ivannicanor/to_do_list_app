const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');


//Definición del modelo de proyecto
const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
  type: DataTypes.TEXT,
  }
}, {
  tableName: 'projects',
  timestamps: false
});


//Exportamos el modelo
module.exports = Project;


