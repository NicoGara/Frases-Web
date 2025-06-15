const error={
    e401: (req, res, err) => {
    res.status(401).render("error", {
      title: "Error 401 Authorization Required",
      message: err.message,
    });
  },
  e403: (req, res, err) => {
    res.status(403).render("error", {
      title: "Error 403 Forbidden",
      message: err.message,
    });
  },
    e500:(req,resm,err)=>{
        resm.status(500)
        console.log({title:"Error 500 internal server", message: err.message});
    }
}


export default error;