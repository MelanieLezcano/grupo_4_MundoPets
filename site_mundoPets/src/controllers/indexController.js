/* let productos = require('../data/productos.json'); */ //viejo
const db = require('../database/models')
const { Op } = require("sequelize");


module.exports = {
    home: async (req, res) => {
        /* return res.render('home',{productos,}) */ //viejo
        let productos = await db.Productos.findAll({
            include: ['productoCarts','productosMarca','productosSub', 'productosImagenes']//revisar los nombres
        })
        
        try {
            return res.render('home',{
                mensaje: 'Aca estamos aprendiendo controladores',
                productos
            });

        } catch (error) {
            res.send(error)
        }
        /* 
        Promise.all([productos])
        .then(([productos]) => {
            return res.render('home',{
                mensaje: 'Aca estamos aprendiendo controladores',
                productos
            });
        })
        .catch(error => res.send(error)) */
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
