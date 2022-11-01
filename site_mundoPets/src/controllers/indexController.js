let db = require('../database/models');
const productos = require('../database/models/productos');

 /* let productos = require('../data/productos.json'); */

module.exports = {
    home: (req, res) => {
        db.productos.findAll({
            include: [{all:true}]
        })
        
        .then(productos => {
           /*  return res.send(productos) */
            return res.render('home',{
                mensaje: "HOLA",
                productos
            });
        })
        .catch(error => res.status(500).send(error))
    },
    productos: (req, res) => { //viejo
        let categoriaSeleccionada = db.Categorias.findAll()
        let categorias = ['Perro','Gato']
        
        let productoPorCategoria = productos.filter(producto => producto.categorias === categoriaSeleccionada)

    .then((productos) => {
     /*  return res.send(productos)  */
        return res.render('productos',{
                categorias,
                categoriaSeleccionada,
                productos,
                productoPorCategoria
            })
        })
        .catch(error => res.send(error))

    },
    contacto: (req, res) => {
        return res.render('contacto')
    },
    nosotros: (req, res) => {
        return res.render('nosotros')
    },
    categoria : (req,res) => {
        let categoriaSeleccionada = req.params.categorias

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

        let resultados = productos.filter(producto => {
            return producto.marca === elemento || (producto.titulo.includes(elemento)) /* || (producto.descripcion.toLowerCase().includes(elemento.toLowerCase())) */
        })
        
        return res.render('busqueda',
        {
        busqueda: elemento,
        resultados
        
        })
    }
}