const express = require('express')
const { connectDB } = require('./db');


const app = express()
const port = 3000


//Conectar a la base de datos
connectDB();


//Ruta de prueba
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
