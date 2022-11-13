module.exports = (req,res,next) => {
    if (req.session.usuarioLogin) {
        if(+req.session.usuarioLogin.rol === 1){
          return next()
        }
    }
    res.redirect('/')
}