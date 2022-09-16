module.exports = (req,res,next) => {
    if (req.session.usuarioLogin) {
        res.locals.usuarioLogin = req.session.usuarioLogin
    }
    next()
}