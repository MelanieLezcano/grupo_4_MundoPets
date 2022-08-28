const fs = require('fs')
const path = require('path')
const productos = require('../data/productos.json')
const historial = require('../data/historial.json')
const categorias = require('../data/historial.json')
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
    nuevo: (req, res) => {
        return res.send(req.body)
     /*    let{Marca,Titulo,Categoria,Precio,Descuento,Stock,Descripcion} = req.body

        let productoNuevo = {
            id: productos[productos.length - 1].id + 1,
            marca:Marca,
            titulo:Titulo,
            categorias:Categoria,
            precio:Precio,
            descuento:Descuento,
            stock:Stock,
            descripcion:Descripcion,
            imagenes : [
                "default-image.png",
                "default-image.png",
                "default-image.png",
                "default-image.png"
            ],
        } */
    },
    

    editar: (req, res) => {
        let categorias = ['Adultos','Cachorros']
         id= +req.params.id
        let producto = productos.find((elemento) => {
            return elemento.id == id
        } )
        /* return res.send(producto)  comprobar que esta llegando bien el elemento*/
        return res.render('admin/editarProducto',{
            producto,
            categorias
        })

    },
    actualizar: (req, res) => {
        id = +req.params.id
        return res.render('admin/crearProducto')
        let {Marca,Titulo,Categoria,Precio,Descuento,Stock,Descripcion} = req.body
        
        productos.forEach(producto,index => {
            if (producto.id === idParams) {
                producto.marca = Marca
                producto.titulo = Titulo
                producto.categorias = Categoria
                producto.precio = +Precio
                producto.descuento = +Descuento
                producto.stock = +Stock
                producto.descripcion = Descripcion
            }
        })
        
        guardar(productos)
        return res.redirect('/admin/list')

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