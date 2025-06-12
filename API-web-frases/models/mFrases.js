import  pool  from "../config/db.js";


let fraseDelDia;

// Esta funcion devuelve la cantidad de frases (devuelve un numero)
const cantFrases=async()=>{
    try {
        const [results]=await pool.query("SELECT COUNT(*) FROM frases");
        return results[0]["COUNT(*)"]
    } catch (err) {
        throw {status:500,message:"Error al cargar la frase"};
    }
}

// borrar esta funcion una vez que este ok la base de datos 
const crearValoresParaPruebas = async () => {
    try {
        // Inserta los usuarios
        await pool.query(`
            INSERT INTO usuarios(
                usuario_id, nombre_usuario, correo, password
            )
            VALUES
            (0,'nico','nicolasgaravaglia@hotmail.com', AES_ENCRYPT('1234567', 'super_llave')),
            (0,'pepe','pepe@hotmail.com', AES_ENCRYPT('0000000', 'super_llave')),
            (0,'jose','jose@hotmail.com', AES_ENCRYPT('papapepeprop', 'super_llave'));
        `);

        // Inserta las frases
        await pool.query(`
            INSERT INTO frases(
                frase_id, contenido, autor, fuente, fecha_publicacion, usuario
            )
            VALUES 
            (0,'Nosotros tenemos que ser el cambio que queremos ver en el mundo','Mahatma Gandhi','Web' ,now(),1),
            (0,'La vida es muy peligrosa. No por las personas que hacen el mal, sino por las que se sientan a ver lo que pasa.','Albert Einstein','Web' ,now(),1),
            (0,'Ojo por ojo y todo el mundo acabará ciego','Mahatma Gandhi','Web' ,now(),1);
        `);

        console.log("Valores de prueba creados exitosamente.");
    } catch (err) {
        console.error("Error al crear valores de prueba:", err);
        throw { status: 500, message: "Error al crear valores de prueba" };
    }

    
};

// Esta funcion es la encargada de traer una frase al alzar cada vez que se ejecuta y guararla en la variable fraseDelDia
const obtFraseDelDia=async()=>{
    try {
        const nuevaCantidad = await cantFrases();
        const [results]=await pool.query("SELECT * FROM frases WHERE frase_id=?",[Math.ceil(Math.random() * nuevaCantidad)]);
        fraseDelDia=results
    } catch (err) {
        throw {status:500,message:"Error al cargar la frase"};
    }
};

obtFraseDelDia()

// Esta funcion actualiza la frase guardada en la variable fraseDelDia cada 24 hs
function ejecutarCada24Horas() {
    obtFraseDelDia()    
    setTimeout(ejecutarCada24Horas, 24 * 60 * 60 * 1000);
}

ejecutarCada24Horas()




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
            // Verifica si la tabla está vacía. Si lo esta corre el codigo para cargar los valores por defecto (esto hay que borrarlo cuando este bien la base de datos)
            const cantidad = await cantFrases();
            if (cantidad === 0) {
                console.log("La tabla 'frases' está vacía. Creando valores de prueba...");
                await crearValoresParaPruebas();
            }

            return fraseDelDia;
        } catch (err) {
            throw { status: 500, message: "Error al cargar la frase" };
        }
    },
    create: async ()=>{},
    update: async ()=>{},
    delete: async ()=>{}
}









export default mFrases; 