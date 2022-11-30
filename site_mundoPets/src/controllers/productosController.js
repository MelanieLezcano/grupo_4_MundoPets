/* let productos = require('../data/productos.json'); */ //viejo...
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
                        categorias_id: producto.categorias_id
                    },
                    limit: 4,
                    order: [[Sequelize.literal("RAND()")]],
                    include: [{
                        all: true
                    }]
                })
                    .then(productos => {
                        /*  return res.send(productos)  */
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
    
    carrito: (req, res) => {

        return res.render('productos/carrito')
    },
    categoria : (req,res) => {
        /* let categorias = ['gatos','perros'] */
        /*  productoPorCategoria = productos.filter(producto => productos.categorias === categoriaSeleccionada) */
       /*  let categoriaSeleccionada = req.params.categoria
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
       /*  return res.render('productos', {
            categorias,
        })
    })
    .catch(error => res.send(error))
}, */ 
        /* res.render('productos',{
            categorias,
            categoriaSeleccionada,
            productos,
            productoPorCategoria
        })
,*/
    }

}