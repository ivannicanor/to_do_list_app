const {DataTypes} = require('sequelize');
const { sequelize } = require('../db');


//Definición del modelo de usuario
const User = sequelize.define('User', {
 id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
  }
}, {
    tableName: 'users',
    timestamps: false
});


//Exportamos el modelo
module.exports = User;
