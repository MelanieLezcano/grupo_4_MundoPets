

module.exports = {
    home: (req, res) => {
        return res.render('home')
    },
    perros: (req, res) => {
        return res.render('perros')
    },
    gatos: (req, res) => {
        return res.render('gatos')
    },
    contacto: (req, res) => {
        return res.render('contacto')
    },
    nosotros: (req, res) => {
        return res.render('nosotros')
    }
}