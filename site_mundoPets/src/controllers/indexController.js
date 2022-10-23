let db = require('../database/models')

/* let productos = require('../data/productos.json'); */ //viejo
const { Op } = require("sequelize");

module.exports = {
    home: (req, res) => {
        db.Productos.findAll({Include: ['productoCarts','productosMarca','productosSub','productosImagenes']})
        .then( producto => { 
            return res.status(200).json(producto)
            return res.render('home',{
            producto,
        } )
        
            
        })
        .catch(error => res.status(500).send(error))
    },
    productos: (req, res) => { //viejo
        let categoriaSeleccionada = req.params.categoria
        let categorias = ['Perro','Gato']
        
        productoPorCategoria = productos.filter(producto => producto.categoria === categoriaSeleccionada)

        res.render('productos',{
            categorias,
            categoriaSeleccionada,
            productos,
            productoPorCategoria
        })


    },
    contacto: (req, res) => { //viejo
        return res.render('contacto')
    },
    nosotros: (req, res) => { //viejo
        return res.render('nosotros')
    },
    categoria : (req,res) => { //viejo
        let categoriaSeleccionada = req.params.categoria
        let categorias = ['Perro','Gato']
        
        productoPorCategoria = productos.filter(producto => producto.categoria === categoriaSeleccionada)

        res.render('productos',{
            categorias,
            categoriaSeleccionada,
            productos,
            productoPorCategoria
        })
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
