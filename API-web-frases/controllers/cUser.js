import bcrypt from "bcrypt";
import error from "../middlewares/error.js";
import mUser from "../models/mUser.js";

const cUser = {
  getUser: async (req, res) => {
    try {
      const { usuario, password } = req.body;
      const result = await mUser.getUser(usuario);
      // if (user.length > 0) {
      //     res.status(200).json(user[0]);
      // } else {
      //     res.status(404).json({ message: "User not found" });
      // }

      console.log(result);
      

      if (result.length === 0) {
          console.log(`El usuario ${usuario} no fue encontrado en la base de datos`);
        let err = {
          status: 401,
          message: `El usuario ${usuario} no fue encontrado en la base de datos`,
        };
        error.e401(req, res, err);
        
      }

      let user = result.results[0];

      

      if (result.password[0].col_nueva === password) {
        console.log(`Usuario ${usuario} autenticado correctamente`);
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
