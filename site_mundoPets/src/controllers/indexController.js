

let productos = require('../data/productos.json');

module.exports = {
    home: (req, res) => {
        return res.render('home',{
            productos,
            
        })
    },
    vistaProductos: (req, res) => {
        let categoriaSeleccionada = req.params.categoria
        let categorias = ['Perro','Gato']
        
        productoPorCategoria = productos.filter(producto => producto.categoria === categoriaSeleccionada)

        res.render('vistaProductos',{
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
}