

let productosGatos = require('../data/productosGatos.json');
let productosPerros = require('../data/productosPerros.json')

module.exports = {
    home: (req, res) => {
        return res.render('home')
    },
    perros: (req, res) => {
        return res.render('perros',{
            productosPerros
        })
    },
    gatos: (req, res) => {
        return res.render('gatos',{
           
            productosGatos
        })
    },
    contacto: (req, res) => {
        return res.render('contacto')
    },
    nosotros: (req, res) => {
        return res.render('nosotros')
    }
}