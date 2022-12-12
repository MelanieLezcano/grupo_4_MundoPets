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
                            return res.render('carrito', {
                                producto,
                                productos
                            })
                        })
                })
                .catch(error => res.send(error))
        },
    categoria: (req, res) => { //viejo
        /*  let categoriaSeleccionada = db.categoria.findAll() */
        let  categoriaSeleccionada = req.params.categoria
        /* console.log(categoriaSeleccionada); */
        db.Categorias.findOne({
         where:{
             nombre : categoriaSeleccionada
         },
         
         include: [{all:true}]})
 
        .then(categorias => {
           /*  return res.send(categorias) */
            return res.render('productos',{categorias} )
 
        })
        .catch(error => res.send(error))
 
 
 
       /*   let categorias = ['Perro','Gato']
         
         let productoPorCategoria = productos.filter(producto => producto.categorias === categoriaSeleccionada)
 
     .then((productos) => {
        /*  return res.send(productos) */
        /*  return res.render('productos',{
                 categorias,
                 categoriaSeleccionada,
                 productos,
                 productoPorCategoria
             })
         })
         .catch(error => res.send(error))
  */ 
     },

}