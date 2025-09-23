
// db.js
//Configuración de la base de datos usando Sequelize
const { Sequelize } = require('sequelize');
//Variable de conexión a la base de datos
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: "postgres"
});
//Función para conectar a la base de datos
async function connectDB(){
    try {
        await sequelize.authenticate();
        console.log("Conexión a la base de datos establecida con exito");
    }
    catch (error) {
        console.error("No se pudo conectar a la base de datos:", error);
    }
}   
//Exportamos la variable de conexión y la función de conexión
module.exports = { sequelize, connectDB };
