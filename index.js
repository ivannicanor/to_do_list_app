const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false,
});

app.get('/', async (_req, res) => {
  const { rows } = await pool.query('SELECT NOW() AS now');
  res.json({ ok: true, now: rows[0].now });
});

app.get('/health', (_req, res) => res.send('ok'));

app.listen(PORT, '0.0.0.0', () => console.log(`Server listening on ${PORT}`));
