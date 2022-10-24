/* let productos = require('../data/productos.json'); */ //viejo
const db = require('../database/models')
const { Op } = require("sequelize");


module.exports = {
    home: (req, res) => {
        /* return res.render('home',{productos,}) */ //viejo
        let productos = db.Productos.findAll({
            include: ['categoria','marca','imagenes']//revisar los nombres
        })
        Promise.all([productos])
        .then((productos) => {
            /* return res.send(productos) */
            return res.render('home',{
                mensaje: "HOLA",
                productos
            });
        })
        .catch(error => res.send(error))
    },
    productos: (req, res) => { //viejo
        let categoriaSeleccionada = db.categoria.findAll()
        let categorias = ['Perro','Gato']
        
        let productoPorCategoria = productos.filter(producto => producto.categoria === categoriaSeleccionada)

    .then((productos) => {
       /*  return res.send(productos) */
        return res.render('productos',{
                categorias,
                categoriaSeleccionada,
                productos,
                productoPorCategoria
            })
        })
        .catch(error => res.send(error))

    },
    contacto: (req, res) => { //viejo
        return res.render('contacto')
    },
    nosotros: (req, res) => { //viejo
        return res.render('nosotros')
    },
    categoria : (req,res) => { //viejo
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
    },
    search:(req,res) => {
        let elemento = req.query.search

        /* let resultados = productos.filter(producto => {return producto.marca === elemento || (producto.titulo.includes(elemento))  }) */ //viejo
        db.Productos.findAll({
            where : {
                [Op.or] : [
                    {nombre : {[Op.substring] : elemento}},
                    {descripcion : {[Op.substring] : elemento}}
                ]
            }
        })   
        return res.render('busqueda',
        {
        busqueda: elemento,
        resultados
        
        });
    }
}
