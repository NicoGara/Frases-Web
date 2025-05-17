import  pool  from "../config/db.js";

const mFrases={
    getAll: async () => {
        try {

            const cantidad = await cantFrases();
            if (cantidad === 0) {
                console.log("La tabla 'frases' está vacía. Creando valores de prueba...");
                await crearValoresParaPruebas();
            }

            const [results]=await pool.query("SELECT * FROM frases");
            
            return results

            
        } catch (err) {
            throw {status:500,message:"Error al cargar las frases"};
        }
    },
    getOne: async () => {
        try {
            // Verifica si la tabla está vacía
            const cantidad = await cantFrases();
            if (cantidad === 0) {
                console.log("La tabla 'frases' está vacía. Creando valores de prueba...");
                await crearValoresParaPruebas();
            }

            // Selecciona una frase aleatoria
            const nuevaCantidad = await cantFrases(); // Recalcula la cantidad después de insertar
            const [results] = await pool.query(
                "SELECT * FROM frases WHERE frase_id=?",
                [Math.ceil(Math.random() * nuevaCantidad)]
            );

            return results;
        } catch (err) {
            throw { status: 500, message: "Error al cargar la frase" };
        }
    },
    create: async ()=>{},
    update: async ()=>{},
    delete: async ()=>{}
}


const cantFrases=async()=>{
    try {
        const [results]=await pool.query("SELECT COUNT(*) FROM frases");
        return results[0]["COUNT(*)"]
    } catch (err) {
        throw {status:500,message:"Error al cargar la frase"};
    }
}



const crearValoresParaPruebas = async () => {
    try {
        // Inserta los usuarios
        await pool.query(`
            INSERT INTO usuarios(
                usuario_id, nombre_usuario, correo, password, cel
            )
            VALUES
            (0,'nico','nicolasgaravaglia@hotmail.com','pepefefe',1136393954),
            (0,'pepe','pepe@hotmail.com','torta1',1136350954),
            (0,'jose','jose@hotmail.com','copaportatil',1145350954);
        `);

        // Inserta las frases
        await pool.query(`
            INSERT INTO frases(
                frase_id, contenido, autor, fecha_publicacion, usuario
            )
            VALUES 
            (0,'Nosotros tenemos que ser el cambio que queremos ver en el mundo','Mahatma Gandhi',now(),1),
            (0,'La vida es muy peligrosa. No por las personas que hacen el mal, sino por las que se sientan a ver lo que pasa.','Albert Einstein',now(),1),
            (0,'Ojo por ojo y todo el mundo acabará ciego','Mahatma Gandhi',now(),1);
        `);

        console.log("Valores de prueba creados exitosamente.");
    } catch (err) {
        console.error("Error al crear valores de prueba:", err);
        throw { status: 500, message: "Error al crear valores de prueba" };
    }
};

export default mFrases;