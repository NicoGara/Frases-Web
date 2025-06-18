import express from 'express';
import path from 'path';
import routes from './src/routes/rFrases.js';
import rInicio from './src/routes/rInicio.js';
import cors from 'cors';



const app = express();
const __dirname = path.resolve();    // para que `path.join` funcione con ES Modules
const PORT = process.env.PORT || 3001;

// 1. Sirve archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

// 2. Tus rutas de API
app.use( routes); 
app.use( rInicio);

 

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


