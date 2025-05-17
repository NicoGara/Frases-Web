import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import router from './src/routes/rFrases.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inicializar express
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(join(__dirname, 'public')));

// Rutas
app.use('/api', router);

// Manejo de errores básico
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


