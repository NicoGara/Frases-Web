import pool from "../config/db.js";

const mUser = {
  getUser: async (usuario) => {
    try {
      const [results] = await pool.query(
        "SELECT * FROM usuarios WHERE nombre_usuario = ?",
        [usuario]
      );
    //   FALTA LA LLAVE: Cambiar por la llave de cifrado real
      const [password] = await pool.query(
        "SELECT CAST(AES_DECRYPT(password,'FALTA LA LLAVE') AS CHAR) AS col_nueva FROM usuarios WHERE nombre_usuario = ?",
        [usuario]
      );
      return { results, password };
    } catch (err) {
      throw { status: 500, message: `Error al obtener el usuario ${usuario}` };
    }
  },
};

export default mUser;
