import express from "express";
import routes from "./router/rFrases.js";
import cors from 'cors';
import router from "./router/rUser.js";
import session from "express-session";


const app = express();

app.use(express.json());

app.use(session({
  secret: 'super_llave', // Cambiar por una llave secreta real
  resave: true,
  saveUninitialized: true,
}));

app.use(cors({
  origin: 'http://localhost:3001',  
  credentials: true
}));
app.use(routes);
app.use(router);

// Iniciar servidor
app.listen(3000, () => {
  console.log("Aplicación Node.js corriendo en http://localhost:3000");
});


// Hay que iniciar el contenedor de la base de datos y la aplicación de Node.js.
// El codigo que se encarga de crear la base de datos y cargar algunas bases por defecto esta en la carpeta sql 