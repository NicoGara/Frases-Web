import { Router } from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getAllFrases, createFrase } from '../controllers/frasesController.js';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// Ruta principal
router.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../../public/index.html'));
});

// Ruta para la página de crear frases
router.get('/crear', (req, res) => {
  res.sendFile(join(__dirname, '../../public/crear.html'));
});

// Ruta para la página de ver todas las frases
router.get('/todas', (req, res) => {
  res.sendFile(join(__dirname, '../../public/todas.html'));
});

// API endpoints
router.get('/api/frases', getAllFrases);
router.post('/api/frases', createFrase);

export default router;