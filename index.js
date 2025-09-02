// index.js
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080; // 👈 usa el puerto de Railway

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Forzar bind en todas las interfaces (no siempre necesario, pero seguro)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
