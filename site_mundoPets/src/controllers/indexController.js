let db = require('../database/models')

let productos = require('../data/productos.json');

module.exports = {
    home: (req, res) => {
        /* return res.render('home',{productos,}) */ //viejo
        db.Productos.findAll({
            include: [{all:true}]//revisar los nombres
        })
        
        .then(productos => {
            return res.send(productos)
            return res.render('home',{
                mensaje: "HOLA",
                productos
            });
        })
        .catch(error => res.status(500).send(error))
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
    contacto: (req, res) => {
        return res.render('contacto')
    },
    nosotros: (req, res) => {
        return res.render('nosotros')
    },
    categoria : (req,res) => {
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