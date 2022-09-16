let productos = require('../data/productos.json');

module.exports = {


    detalle: (req, res) => {
        let id = +req.params.id
        let productoEnDetalle = productos.find((producto) => producto.id === id)
        return res.render('detalle', {
            producto: productoEnDetalle,
            productos
        })
    },
    carrito: (req, res) => {

        let products = []

        for (let i = 0; i < 3; i++) {
            products.push(productos[i]) 
        }

        return res.render('carrito', {
            products
        })
    },
    categoria : (req,res) => {
        let categoriaSeleccionada = req.params.categoria
        let categorias = ['gatos','perros']
        
        productoPorCategoria = productos.filter(producto => producto.categorias === categoriaSeleccionada)

        res.render('productos',{
            categorias,
            categoriaSeleccionada,
            productos,
            productoPorCategoria
        })
    },


}
