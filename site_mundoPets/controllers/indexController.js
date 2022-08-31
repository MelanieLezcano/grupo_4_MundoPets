

let productos = require('../data/productos.json');

module.exports = {
    home: (req, res) => {
        return res.render('home')
    },
    vistaProductos: (req, res) => {
        let perros = productos.filter(producto => producto.categoria === "perro");
        let  gatos = productos.filter(producto => producto.categoria === "gato");

            return res.render('vistaProductos',{
            productos,
            gatos,
            perros
        });
    },
    contacto: (req, res) => {
        return res.render('contacto')
    },
    nosotros: (req, res) => {
        return res.render('nosotros')
    }
}