
module.exports = (req,res,next) => {
    if (req.cookies.holaCookie) {
        req.session.usuarioLogin = req.cookies.holaCookie
    }
    next()
}