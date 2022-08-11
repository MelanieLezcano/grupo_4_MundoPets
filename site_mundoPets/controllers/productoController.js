let productosGatos = require('../data/productosGatos.json');
let productosPerros = require('../data/productosPerros.json')

module.exports = {


    detalle: (req, res) => {
        let id = +req.params.id
        let productoEnDetalleGatos = productosGatos.find((producto) => producto.id === id)
        return res.render('detalle', {
            producto: productoEnDetalleGatos,
            productosGatos
        });
        let productoEnDetallePerros = productosPerros.find((producto2) => producto2.id === id)
        return res.render('detalle', {
            producto2: productoEnDetallePerros,
            productosPerros
        })
    },
    carrito: (req, res) => {
        return res.render('carrito')
    },


}
