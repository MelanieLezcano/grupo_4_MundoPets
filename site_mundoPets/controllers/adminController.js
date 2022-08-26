
let productos = require('../data/productos.json') 
/* PARA USAR AL MOMENTO DE CREAR EL JSON CON LOS PRODUCTOS */


module.exports = {
    lista: (req,res) => {
        return res.render('admin/listaProductos',{
            productos,
            redirection: "historial"
        })
    },
    crear: (req, res) => {
        return res.render('admin/crearProducto')
    },
    nuevo: (req, res) => {
        return res.send(req.body)
    },
    

    editar: (req, res) => {
         id= +req.params.id
        let producto = productos.find((elemento) => {
            return elemento .id == id
        } )
        /* return res.send(producto)  comprobar que esta llegando bien el elemento*/
        return res.render('admin/editarProducto',{
            producto,
            categorias
        })

    },
    actualizar: (req, res) => {
        return res.render('admin/crearProducto')
    },

    historial: (req, res) => {

        return res.render('admin/listaProductos', {
            productos: historial,
            redirection: "lista"
        })
    },
    eliminar: (req,res) =>{
        return res.render('admin/listaProductos')// revisar
    }
}