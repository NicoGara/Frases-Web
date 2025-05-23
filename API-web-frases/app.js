import express from "express";
import routes from "./router/rFrases.js";
import cors from 'cors';


const app = express();

app.use(cors());
app.use(routes);



// Iniciar servidor
app.listen(3000, () => {
  console.log("Aplicación Node.js corriendo en http://localhost:3000");
});


// Hay que iniciar el contenedor de la base de datos y la aplicación de Node.js.
// El codigo que se encarga de crear la base de datos y cargar algunas bases por defecto esta en la carpeta sql 