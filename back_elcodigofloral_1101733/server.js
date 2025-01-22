const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mssql');
const dotenv = require('dotenv');
const path = require('path');
const jwt = require('jsonwebtoken'); // Importa jsonwebtoken

const app = express();

// Configuración de .env
dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Configuración de la conexión a SQL Server
const dbConfig = {
  user: 'User',
  password: '1234',
  server: 'DESKTOP-KTSB69A',
  database: 'db_elcodigofloral',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Middleware para parsear los cuerpos de las solicitudes
app.use(bodyParser.json());

// Middleware para autenticar el token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Obtiene el token del encabezado "Authorization"

  if (!token) return res.status(401).send('Token requerido');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Token inválido');
    req.user = user; // Agrega el usuario decodificado al objeto req
    next(); // Continúa con la siguiente función en la ruta
  });
}

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
    const result = await pool.request().execute('sp_ObtenerCategorias');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Ruta para obtener todos los colores
app.get('/api/colores', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().execute('sp_ObtenerColores');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Ruta para obtener la configuración del backend
app.get('/api/config', async (req, res) => {
  const baseUrl = `http://${process.env.HOST}:${process.env.PORT}`;
  res.json({ baseUrl });
});

// Ruta para crear un nuevo usuario
app.post('/api/usuarios', async (req, res) => {
  const { nombre_usuario, contraseña } = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    const request = pool.request();
    const result = await request.input('Nombre_usuario', sql.VarChar, nombre_usuario)
                              .input('Contraseña', sql.VarChar, contraseña)
                              .execute('sp_CrearUsuario');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Ruta para hacer login
app.post('/api/login', async (req, res) => {
  const { nombre_usuario, contraseña } = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    const request = pool.request();
    const result = await request.input('Nombre_usuario', sql.VarChar, nombre_usuario)
                              .input('Contraseña', sql.VarChar, contraseña)
                              .execute('sp_LoginUsuario');

    if (result.recordset.length > 0) {
      // Generar el token JWT
      const user = { id: result.recordset[0].id, nombre_usuario };
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Ruta protegida para obtener la lista de flores favoritas
app.get('/api/favoritos', authenticateToken, async (req, res) => {
  const { id } = req.user; // Obtén el ID del usuario desde el token

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
                              .input('Usuario_Id', sql.Int, id)
                              .execute('sp_ObtenerFavoritos');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Ruta protegida para agregar flores a la lista de favoritos
app.post('/api/favoritos', authenticateToken, async (req, res) => {
  const { flor } = req.body;
  const { id } = req.user; // Obtén el ID del usuario desde el token

  try {
    const pool = await sql.connect(dbConfig);
    const request = pool.request();
    const result = await request.input('Usuario_Id', sql.Int, id)
                              .input('Flor', sql.VarChar, flor)
                              .execute('sp_AgregarFavorito');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server running on http://${process.env.HOST}:${PORT}`);
});
