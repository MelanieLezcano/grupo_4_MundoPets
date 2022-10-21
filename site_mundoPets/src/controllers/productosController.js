/* let productos = require('../data/productos.json'); */ //viejo
let db = require('../database/models')
let Sequelize = require('sequelize')

module.exports = {
    
    detalle: (req, res) => {
        let id = +req.params.id
        /* let productoEnDetalle = productos.find((producto) => producto.id === id) */ //viejo
        db.Productos.findByPk(id, {
            include: [{
                all: true
            }]
        })
            .then(producto => {
                db.Productos.findAll({
                    where: {
                        categoriasId: producto.categoriasId
                    },
                    limit: 4,
                    order: [[Sequelize.literal("RAND()")]],
                    include: [{
                        all: true
                    }]
                })
                    .then(productos => {
                        /* return res.send(productos) */
                        return res.render('detalle', {
                            producto,
                            productos
                        })
                    })
            })
            .catch(error => res.send(error))
    },
        /* return res.render('detalle', { //viejo
            producto: productoEnDetalle,
            productos
        }) */

    carrito: (req, res) => { //viejo

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
        /* let categorias = ['gatos','perros'] */
       /*  productoPorCategoria = productos.filter(producto => productos.categorias === categoriaSeleccionada) */
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
},
        /* res.render('productos',{
            categorias,
            categoriaSeleccionada,
            productos,
            productoPorCategoria
        })
    }, */
}
