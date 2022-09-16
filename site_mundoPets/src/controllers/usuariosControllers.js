

module.exports = {
    login: (req, res) => {
        return res.render('usuarios/login')
    },

    processLogin:(req,res) => {
        return res.send(req.body)
    },

    register: (req, res) => {
        return res.render('usuarios/register')
    },

    processRegister:(req,res) => {
        return res.send(req.body)
    },
}