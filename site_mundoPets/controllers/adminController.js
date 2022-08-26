
let productos = require('../data/productos.json') 
/* PARA USAR AL MOMENTO DE CREAR EL JSON CON LOS PRODUCTOS */


module.exports = {
    lista: (req,res) => {
        return res.render('admin/listaProductos',{
            productos
        })
    },
    crear: (req, res) => {
        return res.render('admin/crearProducto')
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
    update: (req, res) => {
        const idParams = +req.params.id
        /* const { Marca} */
         productos.forEach(producto => {
            if (producto.id === idParams) {

            }
         })
    },
    destroy: (req, res) => {
        idParams = +req.params.id
        let 
    }
}