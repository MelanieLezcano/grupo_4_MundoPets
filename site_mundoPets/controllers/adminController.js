
const fs = require('fs')
const path = require('path')
const productos = require('../data/productos.json')
const historial = require('../data/historial.json')
/* PARA USAR AL MOMENTO DE CREAR EL JSON CON LOS PRODUCTOS */
const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/productos.json')
    , JSON.stringify(dato, null, 4), 'utf-8')
const guardarHistorial = (dato) => fs.writeFileSync(path.join(__dirname, '../data/historial.json')
    , JSON.stringify(dato, null, 4), 'utf-8')


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
    historial: (req, res) => {

        return res.render('admin/listaProductos', {
            productos: historial,
            redirection: "lista"
        })
    }
}