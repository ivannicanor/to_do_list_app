const express = require('express')
const { connectDB } = require('./db');
require('dotenv').config();


const app = express()



//Conectar a la base de datos
connectDB();


//Ruta de prueba
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on http://localhost:${process.env.PORT}`)
})
