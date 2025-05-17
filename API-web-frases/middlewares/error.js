const error={
    e500:(req,resm,err)=>{
        resm.status(500)
        console.log({title:"Error 500 internal server", message: err.message});
    }
}


export default error;