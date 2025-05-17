import express from 'express';
import path from 'path';
import routes from './src/routes/rFrases.js';

const app = express();
const __dirname = path.resolve();    // para que `path.join` funcione con ES Modules
const PORT = process.env.PORT || 3001;

// 1. Sirve archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// 2. Tus rutas de API
app.use( routes);


app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


