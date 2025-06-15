import { Router } from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// Ruta de login
router.get('/login', (req, res) => {
  res.sendFile(join(__dirname, '../../public/inicio.html'));
});




export default router;