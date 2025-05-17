import mFrases from "../models/mFrases.js";


const cFrases={
    prueba:()=>{ mFrases.getAll()},
    getOne:async (req,res)=>{
        try {
            const frases=await mFrases.getOne()
            res.status(200).json(frases)
        } catch (error) {
            res.status(error.status).json({message:error.message})
        }
    },
    getAll:async (req,res)=>{
        try {
            const frases=await mFrases.getAll()
            res.status(200).json(frases)
        } catch (error) {
            res.status(error.status).json({message:error.message})
        }
    },
}


export default cFrases;

