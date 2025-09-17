const express = require('express');
const { connectDB } = require('./db');
require('dotenv').config();
const app = express()

//1º - CONECTAR A LA BASE DE DATOS Y SINCRONIZAR MODELOS
//Conectar a la base de datos
connectDB();

//Importar modelos
const { sequelize } = require('./db');
const { User, Project, Task } = require('./models');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json()); // Para leer JSON en req.body

// Endpoints
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/projects', projectRoutes);
app.use('/auth', authRoutes);

//Sincronizar modelos con la base de datos
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Modelos sincronizados con la base de datos");
  })
  .catch((error) => {
    console.error("Error al sincronizar los modelos con la base de datos:", error);
  });



//Ruta de prueba
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on http://localhost:${process.env.PORT}`)
})
