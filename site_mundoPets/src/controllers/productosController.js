let productos = require('../data/productos.json');
let db = require('../database/models')
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
        /* let categorias = ['gatos','perros'] */
        /*  productoPorCategoria = productos.filter(producto => productos.categorias === categoriaSeleccionada) */
        let categoriaSeleccionada = req.params.categoria
        db.Categorias.findOne({
        where: {
            nombre: categoriaSeleccionada
        },
        include : [
            {
                association : 'productos',
                include : [{
                    all:true
                }]
            }
        ]
    })
    .then(categorias => {
        /* return res.send(categorias) */
        return res.render('productos', {
            categorias,
        })
    })
    .catch(error => res.send(error))
}
        /* res.render('productos',{
            categorias,
            categoriaSeleccionada,
            productos,
            productoPorCategoria
        })/*  */

}