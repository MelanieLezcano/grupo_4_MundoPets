const db = require('../database/models')

let productos = require('../data/productos.json');

module.exports = {
    home: (req, res) => {


        let productos = db.Productos.findAll()
        Promise.all(productos)
        .then ((productos) =>{
            return res.render('home',{
                productos,
                
            })
        })
        .catch(error => res.send(error))
        
    },
    productos: (req, res) => {
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
    contacto: (req, res) => {
        return res.render('contacto')
    },
    nosotros: (req, res) => {
        return res.render('nosotros')
    },
    categoria : (req,res) => {
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