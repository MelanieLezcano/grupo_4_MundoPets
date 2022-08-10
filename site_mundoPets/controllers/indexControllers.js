

let imagenesGatitos = require('../data/productosGatitos.json');
let imagenesGatos = require('../data/productosGatos.json')

module.exports = {
    home: (req, res) => {
        return res.render('home')
    },
    perros: (req, res) => {
        return res.render('perros')
    },
    gatos: (req, res) => {
        return res.render('gatos',{
            imagenesGatitos,
            imagenesGatos
        })
    },
    contacto: (req, res) => {
        return res.render('contacto')
    },
    nosotros: (req, res) => {
        return res.render('nosotros')
    }
}