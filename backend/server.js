const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
const dotenv = require('dotenv');

const envFile = `${process.env.NODE_ENV}.env`;
dotenv.config({ path: envFile });

const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a SQL Server
const dbConfig = {
  user: 'User', // Usuario de la base de datos
  password: '1234', // Contraseña de la base de datos
  server: 'DESKTOP-KTSB69A', // Dirección del servidor SQL Server
  database: 'db_elcodigofloral', // Nombre de la base de datos
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Ruta para obtener todas las flores
app.get('/api/flores', async (req, res) => {
  const { categoriaId, colorId, nombre } = req.query;

  try {
    const pool = await sql.connect(dbConfig);
    const request = pool.request();

    if (categoriaId) request.input('CategoriaId', sql.Int, categoriaId);
    if (colorId) request.input('ColorId', sql.Int, colorId);
    if (nombre) request.input('Nombre', sql.VarChar, `%${nombre}%`);

    const result = await request.execute('sp_ObtenerFloresPorFiltros');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Ruta para obtener todas las categorías
app.get('/api/categorias', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query('SELECT * FROM Categorias');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Ruta para obtener todos los colores
app.get('/api/colores', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query('SELECT * FROM Colores');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// obtener la configuración del backend
app.get('/api/config', async (req, res) => {
  const baseUrl = `http://${process.env.HOST}:${process.env.PORT}`;
  res.json({ baseUrl });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://${process.env.HOST}:${PORT}`);
});
