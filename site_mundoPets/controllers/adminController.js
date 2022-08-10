
/* let productos = require('../data/productos.json') */
/* PARA USAR AL MOMENTO DE CREAR EL JSON CON LOS PRODUCTOS */


module.exports = {
    lista: (req, res) => {
        return res.render('admin/listaProductos')
    },
    crear: (req, res) => {
        ('admin/crearProducto')
    },
    editar: (req, res) => {
        /* id= +req.params.id
        let producto = productos.find(elemento) =>{
            return elemento .id == id
        } */
        /* return res.send(producto)  comprobar que esta llegando bien el elemento*/
        return res.render('admin/editarProducto')

    }
}