

let productos = require('../data/productos.json');

module.exports = {
    home: (req, res) => {
        return res.render('home')
    },
    vistaProductos: (req, res) => {
        return res.render('vistaProductos',{
            productos
        })
    },
    contacto: (req, res) => {
        return res.render('contacto')
    },
    nosotros: (req, res) => {
        return res.render('nosotros')
    }
}