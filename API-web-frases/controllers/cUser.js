import error from "../middlewares/error.js";
import mUser from "../models/mUser.js";

const cUser = {
  getUser: async (req, res) => {
    try {
      const { usuario, password } = req.body;
      const result = await mUser.getUser(usuario);

      if (result.results.length === 0) {
        console.log(
          `El usuario ${usuario} no fue encontrado en la base de datos`
        );
        let err = {
          status: 401,
          message: `El usuario ${usuario} no fue encontrado en la base de datos`,
        };
        error.e401(req, res, err);
      }

      let user = result.results[0];

      if (result.password[0].col_nueva === password) {
        console.log(`Usuario ${usuario} autenticado correctamente`);
        res.json({
          redirect: "http://localhost:3001/crear",
          username: result.results[0].nombre_usuario,
          password: result.password[0].col_nueva,
        });
      } else {
        console.log(`Contraseña incorrecta para el usuario ${usuario}`);
      }

      //   req.session.user = user;
      //   res.redirect("http://localhost:3000/frases");
    } catch (error) {
      //   console.error("Error fetching user:", error);
      //   res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default cUser;
