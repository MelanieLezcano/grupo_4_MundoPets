module.exports = (req,res,next) => {
    if (req.session.usuarioLogin) {
        if(req.session.usuarioLogin.rol === "Administrador"){
          return next()
        }
    }
    res.redirect('/')
}