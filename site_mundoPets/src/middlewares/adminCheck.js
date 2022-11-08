module.exports = (req,res,next) => {
    if (req.session.userLogin) {
        if(req.session.userLogin.rol === 2){
          return next()
        }
    }
    res.redirect('/')
}