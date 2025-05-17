import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FRASES_FILE = join(__dirname, '../../data/frases.json');

// Asegurarse de que el archivo existe
async function initFrasesFile() {
    try {
        await readFile(FRASES_FILE);
    } catch (error) {
        await writeFile(FRASES_FILE, '[]', 'utf8');
    }
}

export const getAllFrases = async (req, res) => {
    try {
        await initFrasesFile();
        const data = await readFile(FRASES_FILE, 'utf8');
        const frases = JSON.parse(data);
        res.json(frases);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las frases' });
    }
};

export const createFrase = async (req, res) => {
    try {
        await initFrasesFile();
        const { texto, autor } = req.body;
        
        if (!texto || !autor) {
            return res.status(400).json({ error: 'Se requieren tanto el texto como el autor de la frase' });
        }

        const data = await readFile(FRASES_FILE, 'utf8');
        const frases = JSON.parse(data);
        
        const nuevaFrase = {
            id: Date.now().toString(),
            texto,
            autor,
            fecha: new Date().toISOString()
        };

        frases.push(nuevaFrase);
        await writeFile(FRASES_FILE, JSON.stringify(frases, null, 2), 'utf8');
        
        res.status(201).json(nuevaFrase);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la frase' });
    }
}; 